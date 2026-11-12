import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { callAI, parseJsonSafely } from "@/lib/ai/service";
import { z } from "zod";

const matchSchema = z.object({
  job: z.object({
    id: z.string(),
    title: z.string(),
    required_skills: z.array(z.string()),
    description: z.string().optional().nullable(),
  }),
  candidates: z.array(z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    current_title: z.string().optional().nullable(),
    skills: z.array(z.string()),
    years_experience: z.number().optional().nullable(),
  })),
  organization_id: z.string(),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = matchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { job, candidates, organization_id } = parsed.data;

    // Verify user belongs to this organization
    const { data: membership } = await supabase
      .from("organization_members")
      .select("id")
      .eq("user_id", user.id)
      .eq("organization_id", organization_id)
      .single();

    if (!membership) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Build results - either via AI or via local matching
    const results = [];

    for (const candidate of candidates) {
      let matchResult;

      if (process.env.AI_API_KEY) {
        try {
          const prompt = `You are an expert talent acquisition specialist. Analyse this candidate against the job requirements.

JOB: ${job.title}
Required Skills: ${job.required_skills.join(", ") || "Not specified"}
${job.description ? `Description: ${job.description}` : ""}

CANDIDATE: ${candidate.first_name} ${candidate.last_name}
Current Role: ${candidate.current_title || "Not specified"}
Skills: ${candidate.skills.join(", ") || "Not listed"}
Years Experience: ${candidate.years_experience || "Not specified"}

Provide a JSON response with:
- overall_score: number 0-100 (skills alignment score, NOT a judgment of the person's worth)
- skills_match: { matched: string[], missing: string[] }
- strengths: string[] (max 3, evidence-based observations)
- gaps: string[] (max 3, areas requiring further assessment)
- ai_explanation: string (2-3 sentences explaining the match, referencing specific evidence)

IMPORTANT: Base scoring only on documented skills and experience. Do not infer or assume skills not listed. This output will be reviewed by a human recruiter.`;

          const response = await callAI([
            {
              role: "system",
              content: "You are a helpful talent intelligence assistant. Always respond with valid JSON only, no markdown code blocks.",
            },
            { role: "user", content: prompt },
          ]);

          matchResult = parseJsonSafely(response.content, null);
        } catch (err) {
          console.error("AI match error:", err);
          matchResult = null;
        }
      }

      // Fallback: local skill matching
      if (!matchResult) {
        const requiredSkillsLower = job.required_skills.map(s => s.toLowerCase());
        const candidateSkillsLower = candidate.skills.map(s => s.toLowerCase());
        const matched = job.required_skills.filter(s => candidateSkillsLower.includes(s.toLowerCase()));
        const missing = job.required_skills.filter(s => !candidateSkillsLower.includes(s.toLowerCase()));
        const score = job.required_skills.length > 0
          ? Math.round((matched.length / job.required_skills.length) * 100)
          : 50;

        matchResult = {
          overall_score: score,
          skills_match: { matched, missing },
          strengths: matched.length > 0 ? [`Has ${matched.length} of the required skills`] : [],
          gaps: missing.length > 0 ? [`Missing: ${missing.slice(0, 3).join(", ")}`] : [],
          ai_explanation: `Based on skills comparison, ${candidate.first_name} matches ${matched.length} of ${job.required_skills.length} required skills for ${job.title}. This is an automated skills comparison — a recruiter should review the full profile.`,
        };
      }

      // Store match result
      await supabase.from("candidate_match_results").upsert({
        organization_id,
        candidate_id: candidate.id,
        job_id: job.id,
        overall_score: matchResult.overall_score,
        skills_match: matchResult.skills_match,
        experience_match: {},
        ai_explanation: matchResult.ai_explanation,
        strengths: matchResult.strengths || [],
        gaps: matchResult.gaps || [],
      });

      results.push({
        candidate_id: candidate.id,
        candidate,
        overall_score: matchResult.overall_score,
        skills_match: matchResult.skills_match,
        strengths: matchResult.strengths || [],
        gaps: matchResult.gaps || [],
        ai_explanation: matchResult.ai_explanation,
      });
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Match route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
