import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Eye, Brain, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — RoleFit AI",
  description: "We built RoleFit AI because talent is the most important decision a business makes — and the tools to make that decision intelligently have been missing.",
};

const values = [
  { icon: Eye, title: "Transparency", description: "Every AI recommendation comes with an explanation. We believe people deserve to understand why AI makes the suggestions it does — especially when those suggestions affect someone&apos;s career." },
  { icon: Heart, title: "Human-First AI", description: "AI should assist human decision-makers, never replace them. We build tools that make people better at their jobs, not tools that remove human judgment from the equation." },
  { icon: Brain, title: "Intelligence", description: "We refuse to build software that creates the illusion of intelligence without the substance. Every feature we ship makes a genuine, measurable difference to the quality of talent decisions." },
  { icon: Users, title: "Responsibility", description: "Hiring decisions have real consequences for real people. We take that seriously — in the AI we build, the data we handle, and the outcomes our platform enables." },
];

const team = [
  { initials: "NP", name: "Nkwocha Precious", role: "Founder & CEO", bio: "Built RoleFit AI to solve a problem experienced first-hand: organizations making expensive talent decisions with insufficient intelligence. Focused on making the platform indispensable for every HR team that uses it." },
  { initials: "EL", name: "Engineering Lead", role: "CTO", bio: "Leads the technical architecture and AI engineering that powers the platform. Obsessed with building systems that are fast, reliable, and genuinely intelligent — not just impressive-looking." },
  { initials: "PS", name: "Product Lead", role: "Head of Product", bio: "Translates complex talent intelligence problems into clean, intuitive product experiences. Ensures that the most powerful features in the platform are also the most usable." },
  { initials: "MK", name: "Customer Success", role: "Head of Customer Success", bio: "Makes sure every customer gets real value from day one. Leads onboarding, training, and ongoing support — and brings customer feedback directly into the product roadmap." },
];

export default function AboutPage() {
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
              About RoleFit AI
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              We believe talent is the most important decision a business makes.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              And we built RoleFit AI because the tools available to make that decision intelligently have been inadequate, inaccessible, or both.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-6">
                Founded to fix broken recruitment
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  RoleFit AI was founded after witnessing the same failure play out repeatedly across organizations of every size: smart, well-intentioned hiring teams making poor talent decisions — not because they weren&apos;t trying, but because the tools they had weren&apos;t giving them the right information.
                </p>
                <p>
                  Resume screening based on keyword matching was eliminating qualified candidates before a human ever saw them. Interviews were inconsistent. Skills gaps weren&apos;t visible until they were already costing the business. Internal talent was being ignored while external hires were brought in for roles that existing employees could have grown into.
                </p>
                <p>
                  We built RoleFit AI to change that — starting with the foundational belief that AI should inform and support human decision-makers, not replace them. Every feature we build is designed to give people the intelligence they need to make better decisions, faster, with more confidence.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Platform modules", value: "6" },
                { label: "Data points analyzed per candidate", value: "200+" },
                { label: "Match accuracy", value: "94%" },
                { label: "Faster than manual screening", value: "10×" },
              ].map((s) => (
                <div key={s.label} className="bg-lavender/30 rounded-xl p-6 text-center">
                  <div className="font-heading text-4xl font-bold text-purple mb-2">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              The principles we build by
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple to-magenta flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy mb-3">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Team</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Built by people who understand talent
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple to-magenta flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-navy">{member.name}</h3>
                      <p className="text-sm text-purple font-semibold mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Join us in building the future of work
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Whether you&apos;re a business looking to hire smarter, or someone who wants to help us build the platform — we&apos;d love to hear from you.
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
