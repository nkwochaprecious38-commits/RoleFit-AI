import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, BarChart3, TrendingUp, Shield, CheckCircle2, Brain } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions — RoleFit AI",
  description: "RoleFit AI for talent acquisition teams, HR leaders, growing businesses, and enterprise organizations. See how the platform solves your specific challenges.",
};

const solutions = [
  {
    audience: "For Talent Acquisition Teams",
    icon: Users,
    color: "from-purple to-magenta",
    pains: [
      "Drowning in applications with no way to prioritize effectively",
      "Hiring managers who can't articulate what they actually want",
      "Inconsistent evaluation that leads to poor and contested decisions",
      "Time-to-hire that keeps extending as the business grows",
    ],
    solutions: [
      "AI match scores surface your top 10% of candidates instantly",
      "Structured competency frameworks translate hiring manager needs into clear criteria",
      "Shared scoring rubrics make evaluation consistent across every interviewer",
      "Pipeline analytics show exactly where and why delays are happening",
    ],
  },
  {
    audience: "For HR Leaders",
    icon: BarChart3,
    color: "from-blue-500 to-purple",
    pains: [
      "No clear picture of the skills your organization actually has",
      "Succession plans built on assumptions, not data",
      "Learning & development spend with no measurable connection to business outcomes",
      "Difficulty demonstrating the strategic value of HR to the board",
    ],
    solutions: [
      "Real-time skills heatmaps across every team and business unit",
      "Data-driven succession pipelines built on actual capability evidence",
      "Development recommendations tied directly to skills gaps that matter to the business",
      "Board-ready analytics and reporting that quantify workforce ROI",
    ],
  },
  {
    audience: "For Growing Businesses",
    icon: TrendingUp,
    color: "from-mint to-teal-600",
    pains: [
      "Hiring the wrong people at a stage when every mis-hire is costly",
      "No HR infrastructure to support structured, consistent recruitment",
      "Competing for talent against larger organizations with bigger budgets",
      "Losing good people because there's no visible path forward for them",
    ],
    solutions: [
      "Skills-based matching that identifies genuine talent regardless of pedigree or background",
      "Ready-to-use workflows that give small teams enterprise-grade hiring structure",
      "Compelling employer brand built on transparent, fair, and intelligent recruitment",
      "Internal mobility and growth tools that make your existing team want to stay",
    ],
  },
  {
    audience: "For Enterprise Organizations",
    icon: Shield,
    color: "from-navy to-charcoal",
    pains: [
      "Siloed workforce data across dozens of HR, ATS, and HRIS systems",
      "Inconsistent hiring practices across geographies and business units",
      "Compliance and audit exposure from undocumented hiring decisions",
      "Inability to identify and redeploy internal talent at scale",
    ],
    solutions: [
      "API-first platform that integrates with your existing HR technology stack",
      "Centralized competency frameworks and consistent evaluation standards globally",
      "Complete audit trails and defensible documentation for every hiring decision",
      "Enterprise-scale internal talent marketplace powered by skills intelligence",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-navy pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-magenta blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
              Solutions
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Built for every team that makes talent decisions.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              Whether you&apos;re a talent acquisition team scaling a high-growth startup or an enterprise HR leader managing a global workforce, RoleFit AI is built to solve the challenges specific to how you work.
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

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.audience} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-navy mb-4">{s.audience}</h2>
                  <p className="text-muted-foreground mb-6">The challenges holding your team back:</p>
                  <div className="space-y-3">
                    {s.pains.map((pain) => (
                      <div key={pain} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-red-500 text-xs font-bold">✕</span>
                        </div>
                        <p className="text-sm text-charcoal">{pain}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-lavender/30 rounded-2xl p-8">
                  <p className="text-sm font-semibold text-purple mb-4 uppercase tracking-wide">How RoleFit AI helps</p>
                  <div className="space-y-4">
                    {s.solutions.map((sol) => (
                      <div key={sol} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />
                        <p className="text-sm text-charcoal">{sol}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Your challenges. Our platform.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Whatever your role, your team size, or your industry — RoleFit AI is built to help you make better talent decisions with less effort and more confidence.
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
