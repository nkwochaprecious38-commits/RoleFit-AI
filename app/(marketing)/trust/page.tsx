import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Eye, Lock, Scale, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust & Responsible AI — RoleFit AI",
  description: "How RoleFit AI handles data, builds responsible AI, and maintains the trust of the people and organizations that depend on it.",
};

const principles = [
  {
    icon: Eye,
    title: "Transparency by Default",
    description: "Every AI recommendation on our platform includes an explanation. We tell you why a candidate scored the way they did, which signals drove the match, and where the uncertainty lies. No black boxes.",
    color: "from-purple to-magenta",
  },
  {
    icon: Scale,
    title: "Fairness & Anti-Bias",
    description: "We actively test our models for disparate impact across protected characteristics including gender, ethnicity, age, and disability status. Where we find bias, we fix it — and we document the process.",
    color: "from-blue-500 to-purple",
  },
  {
    icon: Lock,
    title: "Data Privacy & Security",
    description: "Candidate and employee data is encrypted at rest and in transit. We never sell your data, never train our models on your proprietary data without explicit consent, and give you full control over deletion.",
    color: "from-mint to-teal-600",
  },
  {
    icon: Shield,
    title: "Human Oversight",
    description: "AI on our platform informs human decisions — it does not make them. No candidate is rejected or progressed by AI alone. Hiring decisions remain with people, supported by better intelligence.",
    color: "from-amber-500 to-orange-500",
  },
];

const commitments = [
  "We do not use protected characteristics (race, gender, age, religion, disability) as inputs to any matching or scoring model.",
  "We conduct regular bias audits on all AI models and publish summaries of findings.",
  "Candidates can request an explanation of any AI-generated score that relates to their application.",
  "We comply with GDPR, UK GDPR, and applicable employment law across all jurisdictions we operate in.",
  "We maintain SOC 2 Type II certification for security, availability, and confidentiality.",
  "We never use your organization's data to train models that benefit other customers.",
  "AI-generated job descriptions are flagged as AI-assisted to maintain transparency in the hiring process.",
  "We publish a regular Responsible AI report covering our model performance, bias testing, and policy updates.",
];

export default function TrustPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-navy pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-purple blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
              Trust & Responsible AI
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              AI that you — and your candidates — can trust.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Hiring decisions affect real people's lives. We take that seriously in every model we build, every policy we set, and every piece of data we handle.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Principles</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Responsible AI is not a feature — it is a foundation
            </h2>
            <p className="text-muted-foreground">
              We built our approach to AI ethics into the platform from day one. These principles govern every model we train, every product decision we make, and every customer relationship we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy mb-3">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-24 bg-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Commitments</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Specific, verifiable commitments — not vague promises
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {commitments.map((c) => (
              <div key={c} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" />
                <p className="text-sm text-charcoal leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Limitations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">What AI Cannot Do</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              We are honest about what AI gets wrong
            </h2>
            <p className="text-muted-foreground">
              Responsible AI means being clear about limitations, not just capabilities. Here is what we tell every customer about where AI falls short in talent decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "AI cannot assess potential",
                desc: "Current AI is good at identifying demonstrated skills from evidence. It is poor at predicting whether someone will grow into a role. Humans must make that call.",
              },
              {
                title: "AI can inherit historical bias",
                desc: "If historical hiring data reflects biased decisions, AI trained on it can amplify those biases. We take steps to prevent this, but no system is perfect — which is why human oversight is mandatory.",
              },
              {
                title: "AI scores are probabilities, not facts",
                desc: "A match score of 87% does not mean a candidate is 87% likely to succeed. It means the available evidence suggests strong alignment with the role criteria. Context always matters.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">Data Security</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Enterprise-grade security for sensitive workforce data
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "SOC 2 Type II", desc: "Independently audited security, availability, and confidentiality controls." },
              { title: "AES-256 Encryption", desc: "All data encrypted at rest and in transit using industry-standard encryption." },
              { title: "GDPR Compliant", desc: "Full compliance with GDPR and UK GDPR. DPA available on request." },
              { title: "Data Residency", desc: "Choose where your data is stored. EU, UK, and US regions available." },
            ].map((s) => (
              <div key={s.title} className="bg-white/10 rounded-xl p-6 border border-white/10">
                <Lock className="w-8 h-8 text-mint mb-4" />
                <h3 className="font-heading text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Questions about our AI or data practices?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            We believe in full transparency. If you have specific questions about how our AI works, how we handle your data, or how we approach fairness — we want to hear from you.
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
