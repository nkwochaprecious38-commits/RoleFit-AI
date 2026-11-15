import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — RoleFit AI",
  description: "Simple, transparent pricing for teams of every size. Start free, upgrade when you're ready.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with AI-powered hiring at no cost.",
    cta: "Get Started Free",
    href: "/register",
    external: false,
    highlight: false,
    features: [
      "Up to 3 active job roles",
      "Up to 50 candidate profiles",
      "RoleFit Match (basic scoring)",
      "RoleFit Job Studio (3 job descriptions/month)",
      "Email support",
    ],
    missing: [
      "Workforce intelligence & analytics",
      "RoleFit Pipeline management",
      "RoleFit Interview",
      "RoleFit Growth & internal mobility",
      "Team collaboration",
    ],
  },
  {
    name: "Pro",
    price: "$47",
    period: "per month",
    description: "Everything you need to hire smarter and faster.",
    cta: "Get Pro",
    href: "https://selar.com/47plan?currency=USD",
    external: true,
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited active job roles",
      "Up to 500 candidate profiles",
      "RoleFit Match (full AI scoring + explanations)",
      "RoleFit Intelligence (workforce analytics)",
      "RoleFit Pipeline (recruitment management)",
      "RoleFit Job Studio (unlimited)",
      "RoleFit Interview (structured interviews)",
      "Up to 5 team members",
      "Priority email support",
    ],
    missing: [
      "RoleFit Growth & internal mobility",
      "SSO & advanced security",
      "Dedicated account manager",
    ],
  },
  {
    name: "Business",
    price: "$57",
    period: "per month",
    description: "The full platform for growing teams and enterprises.",
    cta: "Get Business",
    href: "https://selar.com/57plan?currency=USD",
    external: true,
    highlight: false,
    features: [
      "Everything in Pro",
      "Unlimited candidate profiles",
      "RoleFit Growth (employee development & internal mobility)",
      "Unlimited team members",
      "SSO & advanced access controls",
      "Audit logs & compliance reporting",
      "Dedicated account manager",
      "Phone & priority support",
      "Custom onboarding",
    ],
    missing: [],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-magenta blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
            Pricing
          </Badge>
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Start free. Upgrade when you&apos;re ready. No hidden fees, no long-term contracts.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${
                  plan.highlight
                    ? "border-purple shadow-xl shadow-purple/10 bg-white ring-2 ring-purple"
                    : "border-border bg-white shadow-sm"
                }`}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple to-magenta text-white text-xs font-semibold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="font-heading text-lg font-bold text-navy mb-1">{plan.name}</h2>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="font-heading text-4xl font-bold text-navy">{plan.price}</span>
                    <span className="text-muted-foreground text-sm mb-1">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {plan.external ? (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all mb-8 ${
                      plan.highlight
                        ? "bg-gradient-to-r from-purple to-magenta text-white hover:opacity-90"
                        : "bg-navy text-white hover:bg-navy/90"
                    }`}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href={plan.href}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm border border-border text-navy hover:bg-lavender transition-all mb-8"
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <div className="space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((f) => (
                    <div key={f} className="flex items-start gap-3 opacity-35">
                      <div className="w-4 h-4 rounded-full border border-current shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-lavender/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Common questions</Badge>
            <h2 className="font-heading text-3xl font-bold text-navy">Frequently asked questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "Can I upgrade or downgrade at any time?", a: "Yes. You can change your plan at any time. Upgrades take effect immediately. Downgrades take effect at the start of the next billing period." },
              { q: "Is there a free trial for paid plans?", a: "The Free plan gives you full access to core features with no time limit. When you're ready for more, upgrade to Pro or Business at any time." },
              { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, processed securely through our payment provider." },
              { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. Your organization's data is completely isolated — no other customer can see it. See our Trust page for full details." },
              { q: "Can I cancel at any time?", a: "Yes, there are no long-term contracts. You can cancel your subscription at any time from your account settings. You'll retain access until the end of the billing period." },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-heading text-base font-semibold text-navy mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple to-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Start hiring smarter today.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join businesses using RoleFit AI to make faster, fairer and more confident talent decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-purple hover:bg-white/90 font-semibold" asChild>
              <Link href="/register">Get Started Free <ArrowRight className="w-5 h-5 ml-1" /></Link>
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
