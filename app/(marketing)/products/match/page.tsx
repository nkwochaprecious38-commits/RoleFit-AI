import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, CheckCircle2, Target, Zap, Search, BarChart3, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoleFit Match — AI Candidate Matching",
  description: "Skills-based AI candidate matching that goes beyond keywords. Identify genuine talent alignment with explainable recommendations your team can trust.",
};

const features = [
  { icon: Brain, title: "Skills extraction", desc: "Automatically extracts 200+ skills, competencies and experience signals from every resume — no manual tagging required." },
  { icon: Target, title: "Multi-dimensional matching", desc: "Scores candidates across skills fit, experience depth, role complexity alignment and growth trajectory — not just keyword overlap." },
  { icon: Search, title: "Explainable recommendations", desc: "Every match comes with a clear explanation: which skills aligned, which gaps exist, and why this candidate ranked where they did." },
  { icon: Zap, title: "10× faster shortlisting", desc: "Surface your top 10 candidates from a pool of 500 in minutes, not days. Your recruiters focus on conversations, not screening." },
  { icon: BarChart3, title: "Ranked candidate view", desc: "See your full candidate pool ranked by genuine alignment. Filter by specific skills, experience level or role complexity with one click." },
  { icon: Shield, title: "Bias-aware scoring", desc: "No protected characteristics used in ranking. Matching is based solely on skills and role-relevant experience — audited for fairness." },
];

export default function MatchPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-navy pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-magenta blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
              RoleFit Match
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Find the right person<br />
              <span className="text-gradient bg-gradient-to-r from-mint to-teal-300">faster than you thought possible.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              Most ATS tools match keywords. RoleFit Match understands skills. It reads every resume the way an experienced recruiter would — extracting real competencies, experience depth and role fit — then ranks candidates by genuine alignment, not word count.
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Faster Screening", value: "10×" },
              { label: "Match Accuracy", value: "94%" },
              { label: "Time-to-Shortlist", value: "−78%" },
              { label: "Skills Signals Analyzed", value: "200+" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <div className="font-heading text-3xl font-bold text-mint mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Difference</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Keywords find applicants. Skills find talent.
            </h2>
            <p className="text-muted-foreground">
              Traditional ATS tools reject 75% of qualified candidates before a human ever sees them. RoleFit Match changes that.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="border-border">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-lavender flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-purple" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-navy mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">From job description to shortlist in three steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Upload or connect", d: "Add your job description and candidate resumes via upload, API or ATS integration. RoleFit Match handles any format." },
              { n: "02", t: "AI analyses everything", d: "Our NLP engine extracts skills, experience signals and competencies from every document. No configuration needed." },
              { n: "03", t: "Review ranked results", d: "Your candidates are ranked by genuine fit with full explanations. Your team makes the calls — the AI does the screening." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                  <div className="font-heading text-5xl font-bold text-navy/10 mb-4">{s.n}</div>
                  <h3 className="font-heading text-lg font-semibold text-navy mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">Start matching on skills, not keywords.</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join talent teams using RoleFit Match to find better candidates, faster.
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
