import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Target, Zap, BookOpen, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoleFit Growth — Employee Development & Internal Mobility",
  description: "Develop your best people before they leave. Skills-based career pathways, internal mobility matching and development planning powered by AI.",
};

const features = [
  { icon: ArrowUpRight, title: "Internal mobility matching", desc: "Automatically surface internal candidates for open roles based on transferable skills — before you post externally. Reduce rehiring costs by up to 40%." },
  { icon: BookOpen, title: "Skills-based career pathways", desc: "Show every employee a clear, skills-mapped path from their current role to where they want to go — with the specific development steps required." },
  { icon: Target, title: "Development planning", desc: "Build structured development plans tied to real skills gaps. Each plan is grounded in data, not gut feel — and tracked to completion." },
  { icon: TrendingUp, title: "Growth analytics", desc: "Track skills development across your workforce over time. See which teams are upskilling, which are stagnating, and where to invest next." },
  { icon: Users, title: "Talent retention signals", desc: "Identify employees whose skills have outgrown their role — before they start looking elsewhere. Act early with targeted development or mobility offers." },
  { icon: Zap, title: "Manager intelligence", desc: "Give managers visibility into their team&apos;s skills profile, development progress and internal mobility readiness — in one clear dashboard." },
];

export default function GrowthPage() {
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
              RoleFit Growth
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Develop your best people<br />
              <span className="text-gradient bg-gradient-to-r from-mint to-teal-300">before they leave.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              Replacing an employee costs 50–200% of their annual salary. The most effective retention strategy is showing people they have a real future inside your organization. RoleFit Growth makes that tangible — with skills-mapped career pathways, internal mobility matching and evidence-based development planning.
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
              { label: "Internal fill rate increase", value: "2×" },
              { label: "Replacement cost saved", value: "$70K+" },
              { label: "Employee engagement uplift", value: "+34%" },
              { label: "Faster development planning", value: "8×" },
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
            <Badge variant="secondary" className="mb-4">Capabilities</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              The talent you need is already in your organization
            </h2>
            <p className="text-muted-foreground">
              70% of internal mobility opportunities go untapped. RoleFit Growth fixes that — systematically.
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

      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">Build a workforce that grows with your business.</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Start mapping development pathways and internal mobility opportunities today.
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
