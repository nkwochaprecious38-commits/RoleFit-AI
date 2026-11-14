import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Brain, Target, Shield, BarChart3, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoleFit Interview — Structured Interview Intelligence",
  description: "AI-generated structured interview questions, collaborative scoring, and feedback analysis. Make every interview count.",
};

const features = [
  { icon: Brain, title: "AI Question Generation", description: "Generate structured, role-specific interview questions from the job description and candidate profile. Questions are competency-mapped and evidence-seeking." },
  { icon: Target, title: "Structured Scoring", description: "Score candidates against defined criteria using consistent rubrics. Eliminate the subjective 'gut feel' that leads to poor and biased hiring decisions." },
  { icon: MessageSquare, title: "Collaborative Feedback", description: "All interviewers submit their assessments independently before seeing others' scores. Reduces anchoring bias and produces more reliable collective judgements." },
  { icon: BarChart3, title: "Interview Analytics", description: "Identify which interview questions best predict job performance. Track inter-rater reliability and continuously improve your interview process over time." },
  { icon: Shield, title: "Bias Mitigation", description: "Structured interviews are 2× more predictive than unstructured ones. Our scoring system keeps evaluators focused on job-relevant competencies, not irrelevant factors." },
  { icon: CheckCircle2, title: "Decision Summaries", description: "At the end of each interview process, generate a structured summary of all feedback, scores, and evidence — giving the hiring decision full context in minutes." },
];

export default function InterviewPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-navy pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-purple blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
              RoleFit Interview
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Structured interviews that reveal real capability.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              Unstructured interviews are one of the worst predictors of job performance. RoleFit Interview brings structure, consistency, and AI-powered insight to every conversation — so you stop hiring on charm and start hiring on evidence.
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
              { label: "More Predictive Than Unstructured", value: "2×" },
              { label: "Reduction in Interview Bias", value: "60%" },
              { label: "Faster Hiring Decisions", value: "50%" },
              { label: "Interviewer Satisfaction", value: "91%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <div className="font-heading text-3xl font-bold text-mint mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-3">Structured vs. unstructured interview research: Schmidt & Hunter (1998), Journal of Applied Psychology.</p>
        </div>
      </section>

      <section className="py-20 bg-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">The Interview Problem</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Interviews are the most bias-prone part of hiring
            </h2>
            <p className="text-muted-foreground">
              Research shows that 85% of hiring decisions are influenced by unconscious bias when no structured process exists. Interviewers ask different questions, weight answers differently, and reach conclusions within the first 90 seconds — before the conversation has even started.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Inconsistent questions", desc: "Without a structured guide, interviewers ask whatever comes to mind. Different candidates are asked different things, making comparison impossible and fair evaluation unlikely." },
              { title: "Subjective scoring", desc: "Interviewers have no common standard for what 'good' looks like. One person's 4/5 is another's 2/5. Averaging these scores produces meaningless results." },
              { title: "Decisions made in silos", desc: "Individual interviewers form strong opinions before sharing feedback. Anchoring and groupthink distort the collective view, overweighting early or confident voices." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Platform Capabilities</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Make every interview count
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple flex items-center justify-center mb-5">
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
            Stop hiring on gut feel. Start hiring on evidence.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            RoleFit Interview transforms the conversation from an informal chat into a structured, evidence-based evaluation that your whole hiring team can rely on.
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
