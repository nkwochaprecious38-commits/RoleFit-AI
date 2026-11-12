import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/service";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { mode, title, department, location, type, skills, requirements, existingJD } = body;

    let prompt: string;

    if (mode === "improve") {
      prompt = `You are an expert HR copywriter and talent acquisition specialist. Improve the following job description to:
- Be clearer and more compelling to qualified candidates
- Remove potentially exclusionary or biased language
- Better capture the role's impact and growth opportunities
- Improve structure and readability
- Ensure skills and requirements are specific and justified

EXISTING JOB DESCRIPTION:
${existingJD}

Provide an improved version that maintains the organization's voice while being more inclusive and effective. Format it professionally with clear sections.`;
    } else {
      prompt = `You are an expert HR copywriter and talent acquisition specialist. Write a comprehensive, compelling job description for:

Job Title: ${title}
${department ? `Department: ${department}` : ""}
${location ? `Location: ${location}` : ""}
Employment Type: ${type?.replace("_", " ")}
${skills ? `Key Skills: ${skills}` : ""}
${requirements ? `Requirements/Context: ${requirements}` : ""}

Create a professional job description with these sections:
1. About the Role (2-3 sentences on the opportunity and impact)
2. What You'll Do (5-7 specific responsibilities)
3. What You'll Bring (required qualifications and experience)
4. Nice to Have (preferred but not essential)
5. What We Offer (keep this general — benefits to add by the organization)

Guidelines:
- Write in an engaging, inclusive tone
- Focus on what the person will accomplish, not just tasks
- Avoid unnecessary jargon or exclusionary requirements
- Keep required experience years to genuine minimums
- Make each point specific and meaningful`;
    }

    if (!process.env.AI_API_KEY) {
      // Return a template if no AI is configured
      const content = `# ${title || "Job Title"}

## About the Role
We are looking for a talented ${title || "professional"} to join our growing team. This is an exciting opportunity to make a meaningful impact in a fast-paced environment.

## What You'll Do
- Lead key initiatives in your area of expertise
- Collaborate with cross-functional teams to deliver outcomes
- Drive continuous improvement in processes and practices
- Mentor junior team members and contribute to team growth
- Report on progress and outcomes to stakeholders

## What You'll Bring
${skills ? `- Proficiency in: ${skills}` : "- Relevant technical skills for the role"}
${requirements || "- Strong communication and collaboration skills\n- Track record of delivering results"}

## Nice to Have
- Experience in a fast-growing technology company
- Passion for innovation and continuous learning

## What We Offer
- Competitive compensation package
- Flexible working arrangements
- Professional development opportunities
- Collaborative and inclusive team culture

---
*Note: Configure AI_API_KEY in your environment for AI-generated descriptions.*`;

      return NextResponse.json({ content });
    }

    const response = await callAI([
      { role: "system", content: "You are an expert HR copywriter. Write professional, inclusive job descriptions. Respond with only the job description text, no preamble." },
      { role: "user", content: prompt },
    ]);

    return NextResponse.json({ content: response.content });
  } catch (err) {
    console.error("Job studio route error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
