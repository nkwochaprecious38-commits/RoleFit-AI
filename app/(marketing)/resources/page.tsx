import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Video, BookOpen, BarChart3 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — RoleFit AI",
  description: "Guides, reports, webinars and research to help HR leaders and talent acquisition teams hire smarter and build better workforces.",
};

const guides = [
  {
    icon: FileText,
    title: "The Skills-Based Hiring Guide 2025",
    description: "A comprehensive guide to transitioning your hiring process from credential-based to skills-based evaluation. Includes frameworks, templates, and real-world examples from organizations that have made the shift.",
    tag: "Guide · 42 pages",
    color: "from-purple to-magenta",
  },
  {
    icon: BarChart3,
    title: "Workforce Intelligence Report 2025",
    description: "An analysis of skills trends across 500+ organizations. Discover which skills are most in demand, where the largest gaps exist, and how leading companies are responding to the global talent shortage.",
    tag: "Research Report · 28 pages",
    color: "from-blue-500 to-purple",
  },
  {
    icon: BookOpen,
    title: "AI in Recruitment: What HR Teams Need to Know",
    description: "A practical, jargon-free guide to how AI is being used in talent acquisition today — what works, what doesn&apos;t, and how to evaluate AI recruitment tools critically before you buy.",
    tag: "Guide · 18 pages",
    color: "from-mint to-teal-600",
  },
  {
    icon: FileText,
    title: "Internal Mobility Playbook",
    description: "Step-by-step guidance for building an internal talent marketplace. Covers skills profiling, communication strategy, manager buy-in, and how to measure the ROI of internal mobility programmes.",
    tag: "Playbook · 24 pages",
    color: "from-amber-500 to-orange-500",
  },
];

const webinars = [
  {
    title: "Beyond Keywords: Building a Skills-Based Talent Strategy",
    date: "Recording available",
    duration: "45 min",
    description: "How to move from job-title matching to genuine skills-based hiring — with practical steps for teams at every stage of the journey.",
  },
  {
    title: "The HR Leader&apos;s Guide to AI in Talent Acquisition",
    date: "Recording available",
    duration: "60 min",
    description: "A clear-headed look at what AI can and cannot do in recruitment, and how to build a responsible AI strategy your executive team will support.",
  },
  {
    title: "Turning Workforce Data Into Strategic Decisions",
    date: "Recording available",
    duration: "50 min",
    description: "How to use workforce analytics to identify skills gaps, build succession plans, and demonstrate HR&apos;s strategic value to the business.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-navy pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-purple blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-magenta blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
              Resources
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Intelligence for the people who build great workforces.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Practical guides, research, and webinars for HR leaders and talent professionals navigating the shift to AI-powered, skills-based talent management.
            </p>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Guides & Reports</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Practical resources you can use today
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guides.map((g) => {
              const Icon = g.icon;
              return (
                <Card key={g.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center mb-5`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs mb-3">{g.tag}</Badge>
                    <h3 className="font-heading text-lg font-semibold text-navy mb-3">{g.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{g.description}</p>
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-1 text-sm font-medium text-purple hover:gap-2 transition-all"
                    >
                      Download free <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Webinars */}
      <section className="py-24 bg-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Webinars</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Learn from HR practitioners and thought leaders
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {webinars.map((w) => (
              <Card key={w.title}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-5">
                    <Video className="w-6 h-6 text-mint" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{w.date}</Badge>
                    <span className="text-xs text-muted-foreground">{w.duration}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy mb-3">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{w.description}</p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1 text-sm font-medium text-purple hover:gap-2 transition-all"
                  >
                    Watch recording <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Stay informed</Badge>
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            Workforce intelligence, delivered to your inbox
          </h2>
          <p className="text-muted-foreground mb-8">
            Monthly insights on AI in HR, skills-based hiring, and workforce strategy. No fluff — just research and ideas that matter to talent professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@company.com"
              className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
            />
            <Button variant="primary" asChild>
              <Link href="/register">Subscribe</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to put this into practice?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Knowledge is only useful when it&apos;s backed by the right tools. Get started with RoleFit AI today.
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
