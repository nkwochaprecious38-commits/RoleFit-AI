import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Zap, Target, Shield, BarChart3, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoleFit Job Studio — AI Job Description Creator",
  description: "Write job descriptions that attract the right candidates. AI-powered JD creation with skills-based language, bias checking, and optimization for quality applications.",
};

const features = [
  { icon: Zap, title: "AI-Generated Job Descriptions", description: "Input a role title and a few key requirements. Job Studio generates a complete, structured job description in seconds — ready to edit and publish." },
  { icon: Target, title: "Skills-Based Language", description: "Automatically converts vague requirements like '5 years experience' into clear competency statements that attract skills-based candidates and pass modern screening tools." },
  { icon: Shield, title: "Bias Detection & Removal", description: "Identifies and flags gendered language, exclusionary phrasing, and unnecessary credential requirements that reduce candidate diversity and quality." },
  { icon: FileText, title: "Template Library", description: "Start from a library of proven templates for every role type — engineering, sales, operations, finance, and more. Fully editable and brand-customizable." },
  { icon: BarChart3, title: "JD Performance Analytics", description: "Track application quality by job description version. Understand which JDs attract the strongest matches and continuously improve your approach." },
  { icon: CheckCircle2, title: "One-Click Publishing", description: "Publish directly to your RoleFit Pipeline, or export in formats compatible with LinkedIn, Indeed, and your existing ATS or careers page." },
];

const beforeAfter = [
  {
    label: "Before",
    text: "5+ years experience in a similar role. Must be a team player and have excellent communication skills. Degree required.",
    type: "before",
  },
  {
    label: "After",
    text: "Demonstrates ability to manage cross-functional projects with 3+ stakeholders. Communicates technical concepts clearly to non-technical audiences. Degree not required — equivalent skills and experience considered.",
    type: "after",
  },
];

export default function JobStudioPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-navy pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/3 w-96 h-96 rounded-full bg-amber-500 blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-purple blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
              RoleFit Job Studio
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Job descriptions that attract the right people.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              The quality of your hire starts with the quality of your job description. RoleFit Job Studio uses AI to write JDs that are skills-focused, bias-free, and optimized to attract the candidates you actually want.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="mint" size="lg" asChild>
                <Link href="/register">Get Started <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">The JD Problem</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Most job descriptions are costing you great candidates
            </h2>
            <p className="text-muted-foreground">
              Research shows that 73% of candidates have been put off applying for a role due to poor job description quality. Vague requirements, biased language, and unnecessary credentials all reduce the quality and diversity of your applicant pool — before the first application arrives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {beforeAfter.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-6 border ${item.type === "before" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}
              >
                <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${item.type === "before" ? "text-red-500" : "text-green-600"}`}>
                  {item.label} RoleFit Job Studio
                </div>
                <p className={`text-sm leading-relaxed ${item.type === "before" ? "text-red-800" : "text-green-800"}`}>
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Platform Capabilities</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Write it once. Hire better, every time.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-navy mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Better job descriptions. Better candidates.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Start writing job descriptions that work as hard as your recruiters do. RoleFit Job Studio is included in every RoleFit AI plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-purple hover:bg-white/90 font-semibold" asChild>
              <Link href="/register">Get Started <ArrowRight className="w-5 h-5 ml-1" /></Link>
            </Button>
            <Button size="xl" variant="outline-white" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
