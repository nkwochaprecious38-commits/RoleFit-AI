import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, TrendingUp, Users, Target, Map, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoleFit Intelligence — Workforce Analytics",
  description: "Map your organization's skills landscape. Identify capability gaps before they become business risks. Workforce analytics powered by AI.",
};

const features = [
  { icon: Map, title: "Skills topology map", desc: "Visualize your entire workforce as a living skills map. See where capabilities are concentrated, where gaps exist, and how they're trending." },
  { icon: AlertCircle, title: "Gap identification", desc: "Automatically identify the skills your business needs versus what it currently has — before those gaps create operational risk." },
  { icon: TrendingUp, title: "Capability forecasting", desc: "Project your skills landscape 6, 12 and 24 months out based on hiring plans, attrition risk and development programmes." },
  { icon: BarChart3, title: "Org benchmarking", desc: "Compare your workforce's capability profile against industry benchmarks to understand where you stand relative to competitors." },
  { icon: Users, title: "Team-level insights", desc: "Drill down from org-wide to department, team or individual level. Understand capability distribution at every layer." },
  { icon: Target, title: "Strategic workforce planning", desc: "Align your talent strategy with business goals. Know what skills you need to hire, develop or acquire before plans are finalized." },
];

export default function IntelligencePage() {
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
              RoleFit Intelligence
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              See your entire workforce<br />
              <span className="text-gradient bg-gradient-to-r from-mint to-teal-300">as a living skills map.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              Most organizations don&apos;t know what skills they actually have until they need them. RoleFit Intelligence gives HR leaders and executives a real-time view of organizational capability — so talent decisions are grounded in evidence, not assumptions.
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
              { label: "Skills tracked per employee", value: "80+" },
              { label: "Data points analyzed", value: "200+" },
              { label: "Forecast horizon", value: "24mo" },
              { label: "Faster workforce planning", value: "5×" },
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
              Workforce intelligence that drives strategy
            </h2>
            <p className="text-muted-foreground">
              The $8.5T global talent shortage by 2030 will be felt first by businesses that don&apos;t know their own skills landscape.
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
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">Know your workforce. Lead with confidence.</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Start building a real-time view of your organization&apos;s capability landscape today.
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
