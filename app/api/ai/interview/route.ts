import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { callAI, parseJsonSafely } from "@/lib/ai/service";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobTitle, skills, level } = await request.json();

    if (!jobTitle) {
      return NextResponse.json({ error: "Job title required" }, { status: 400 });
    }

    const fallbackQuestions = [
      { category: "Experience", question: `Tell me about your experience that is most relevant to this ${jobTitle} role.`, rationale: "Understand their most applicable background and self-awareness of relevance." },
      { category: "Behavioural", question: "Describe a situation where you had to work through a significant challenge. What was your approach?", rationale: "Assess problem-solving, resilience and collaborative approach using the STAR method." },
      { category: "Technical", question: `What do you consider the most critical technical skills for a ${jobTitle}${skills ? ` with expertise in ${skills}` : ""}?`, rationale: "Evaluate depth of technical understanding and ability to prioritize." },
      { category: "Situational", question: `You join as ${jobTitle} and discover a significant issue that your manager isn't aware of. What do you do?`, rationale: "Test judgement, communication style and proactiveness." },
      { category: "Culture", question: "How do you prefer to receive feedback, and can you give an example of feedback that helped you grow?", rationale: "Assess self-awareness, growth mindset and receptiveness to feedback." },
      { category: "Behavioural", question: "Tell me about a time you influenced others without direct authority.", rationale: "Evaluate leadership potential, persuasion and interpersonal skills." },
      { category: "Technical", question: `What approach would you take in the first 90 days as ${jobTitle}?`, rationale: "Assess strategic thinking, planning and prioritization for the role." },
    ];

    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ questions: fallbackQuestions });
    }

    const prompt = `Generate 8-10 structured interview questions for a ${level} ${jobTitle} role.
${skills ? `Key skills to assess: ${skills}` : ""}

For each question provide:
- category: "Technical" | "Behavioural" | "Situational" | "Experience" | "Culture"
- question: the interview question
- rationale: what to look for in the answer (1-2 sentences)

Requirements:
- Mix question types: technical competency, behavioural (STAR-based), situational and culture
- Questions should be open-ended and avoid yes/no answers
- Do not ask about protected characteristics
- Adapt complexity to ${level} level

Respond with JSON array only: [{"category": "...", "question": "...", "rationale": "..."}]`;

    const response = await callAI([
      { role: "system", content: "You are an expert talent acquisition specialist. Respond with valid JSON only." },
      { role: "user", content: prompt },
    ]);

    const questions = parseJsonSafely<typeof fallbackQuestions>(response.content, fallbackQuestions);

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("Interview route error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
