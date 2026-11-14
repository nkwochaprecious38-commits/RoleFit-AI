import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Users,
  Target,
  TrendingUp,
  FileText,
  MessageSquare,
  Zap,
  Shield,
  CheckCircle2,
  BarChart3,
  Search,
  ChevronDown,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoleFit AI — AI-Powered Talent Intelligence Platform",
  description:
    "Beyond resumes. Beyond recruitment. Into workforce intelligence. RoleFit AI helps businesses discover, evaluate, match and develop talent through intelligent, skills-based insights.",
};

const modules = [
  {
    icon: Brain,
    title: "RoleFit Match",
    description: "AI-powered candidate matching that goes beyond keywords to identify genuine talent alignment.",
    href: "/products/match",
    color: "from-purple to-magenta",
  },
  {
    icon: BarChart3,
    title: "RoleFit Intelligence",
    description: "Workforce analytics and skills mapping to understand your organization's capability landscape.",
    href: "/products/intelligence",
    color: "from-blue-500 to-purple",
  },
  {
    icon: TrendingUp,
    title: "RoleFit Growth",
    description: "Employee development planning and internal mobility powered by skills intelligence.",
    href: "/products/growth",
    color: "from-mint to-teal-600",
  },
  {
    icon: Users,
    title: "RoleFit Pipeline",
    description: "End-to-end recruitment management with AI-assisted candidate tracking and evaluation.",
    href: "/products/pipeline",
    color: "from-magenta to-red-400",
  },
  {
    icon: FileText,
    title: "RoleFit Job Studio",
    description: "AI-powered job description creation and optimization for better candidate attraction.",
    href: "/products/job-studio",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    title: "RoleFit Interview",
    description: "Structured interview intelligence with AI-generated questions and feedback analysis.",
    href: "/products/interview",
    color: "from-indigo-500 to-purple",
  },
];

const challenges = [
  "Resume screening takes too long and misses great candidates",
  "Inconsistent evaluation criteria leads to poor hiring decisions",
  "Workforce skills gaps aren't visible until it's too late",
  "Internal talent mobility is underutilized and overlooked",
  "Job descriptions fail to attract the right candidates",
  "Interview feedback is subjective and hard to compare",
];

const howItWorks = [
  {
    step: "01",
    title: "Connect your data",
    description: "Integrate your job descriptions, candidate resumes and workforce data into a unified talent intelligence layer.",
  },
  {
    step: "02",
    title: "AI analyses and matches",
    description: "Our AI engine extracts skills, experience and competencies, then identifies genuine alignment between candidates and roles.",
  },
  {
    step: "03",
    title: "Recruiters make decisions",
    description: "AI surfaces insights and explanations — your team makes every hiring decision with full context and confidence.",
  },
  {
    step: "04",
    title: "Workforce intelligence grows",
    description: "Every interaction builds richer workforce data, improving future matches and enabling proactive talent planning.",
  },
];

const faqs = [
  {
    q: "How does RoleFit AI match candidates to roles?",
    a: "RoleFit AI extracts and analyzes skills, experience, competencies and qualifications from resumes and job descriptions. It identifies alignment across multiple dimensions and provides explainable insights — not just a score — so recruiters can make informed decisions.",
  },
  {
    q: "Does RoleFit AI make hiring decisions automatically?",
    a: "No. RoleFit AI is designed to assist and inform human decision-makers, never to replace them. The platform surfaces evidence, explanations and insights. Every hiring decision remains with your recruitment team.",
  },
  {
    q: "How is candidate data protected?",
    a: "All data is processed within your organization's secure environment. We implement strict access controls, row-level security and data isolation between organizations. We do not use candidate data to train external AI models.",
  },
  {
    q: "Can RoleFit AI integrate with our existing ATS?",
    a: "RoleFit AI is designed as a standalone platform. API integration capabilities for connecting with existing HR systems are available on Growth and Enterprise plans. Contact us for specific integration requirements.",
  },
  {
    q: "What about bias in AI-assisted recruitment?",
    a: "We take responsible AI seriously. The platform does not use protected characteristics to rank candidates and provides explainable recommendations so recruiters can review and override any AI output. We encourage human oversight at every stage.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-navy pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-magenta blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
              AI-POWERED TALENT INTELLIGENCE
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              The AI talent intelligence platform<br />
              <span className="text-gradient bg-gradient-to-r from-mint to-teal-300">for businesses that cannot afford a bad hire.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              Finding the right people shouldn&apos;t be a guessing game. RoleFit AI helps businesses
              discover, evaluate, match and develop talent through intelligent, skills-based insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="mint" size="lg" asChild>
                <Link href="/register">
                  Get Started <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
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
              { label: "Time-to-Hire Reduction", value: "33%" },
              { label: "Data Points Analyzed", value: "200+" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <div className="font-heading text-3xl font-bold text-mint mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-3">These figures represent platform capabilities, not independently verified benchmarks.</p>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">The Challenge</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Talent decisions are harder than they should be
            </h2>
            <p className="text-muted-foreground">
              Modern organizations face complex talent challenges that traditional recruitment tools weren&apos;t designed to solve.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm border border-border">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-500 text-xs font-bold">✕</span>
                </div>
                <p className="text-sm text-charcoal">{challenge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Platform</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Six modules. One intelligent platform.
            </h2>
            <p className="text-muted-foreground">
              Every component of RoleFit AI is designed to work together, creating a unified talent intelligence layer for your organization.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card key={module.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-5`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-navy mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{module.description}</p>
                    <Link
                      href={module.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-purple hover:gap-2 transition-all"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">How It Works</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Intelligence-led recruitment, simplified
            </h2>
            <p className="text-white/60">
              From data to decision in four steps. RoleFit AI handles the complexity so your team can focus on what matters.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="font-heading text-4xl font-bold text-white/20 mb-4">{step.step}</div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Responsible AI</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-6">
                AI that assists. Humans that decide.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We built RoleFit AI with a clear principle: artificial intelligence should inform and support
                human decision-makers, never replace them. Every recommendation comes with an explanation.
                Every insight can be reviewed and overridden.
              </p>
              <div className="space-y-4">
                {[
                  "Explainable matching — understand why candidates are recommended",
                  "Human oversight at every decision point",
                  "No protected characteristics used in ranking",
                  "Organization-scoped data isolation by design",
                  "Transparent AI outputs with supporting evidence",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />
                    <p className="text-sm text-charcoal">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button variant="outline" asChild>
                  <Link href="/trust">Our Responsible AI Principles <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Data Security", desc: "Enterprise-grade isolation and access controls" },
                { icon: Search, title: "Explainability", desc: "Clear reasoning behind every recommendation" },
                { icon: Zap, title: "Efficiency", desc: "Reduce time-to-shortlist by up to 10×" },
                { icon: Target, title: "Accuracy", desc: "Multi-dimensional candidate-role alignment" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-lavender flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-purple" />
                    </div>
                    <h4 className="font-semibold text-sm text-navy mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-lavender/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-border group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-navy text-sm">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to transform your talent intelligence?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join organizations using RoleFit AI to discover better candidates, develop existing talent and make more informed workforce decisions.
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
