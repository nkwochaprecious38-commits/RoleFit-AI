import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { z } from "zod";

const demoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  job_title: z.string().optional(),
  company_size: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = demoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const { error } = await supabase.from("demo_requests").insert(parsed.data);

    if (error) {
      console.error("Demo request insert error:", error);
      return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Demo route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
