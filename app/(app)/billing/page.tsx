"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Check, Zap, Building2, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For small teams getting started with AI hiring",
    features: ["Up to 5 team members", "50 AI match assessments/mo", "Job Studio – 20 JDs/mo", "Interview question generator", "Basic analytics"],
    cta: "Start Free Trial",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For growing teams scaling their recruitment",
    features: ["Up to 25 team members", "Unlimited AI match assessments", "Unlimited Job Studio", "Full pipeline management", "Workforce intelligence", "Career growth module", "Priority support"],
    cta: "Start Free Trial",
    variant: "primary" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organisations with complex needs",
    features: ["Unlimited team members", "SSO / SAML integration", "Custom AI model configuration", "Dedicated success manager", "SLA guarantee", "On-premise deployment option", "Custom integrations via API"],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

export default function BillingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-purple" /> Billing & Plans
        </h1>
        <p className="text-sm text-muted-foreground">Manage your subscription and usage</p>
      </div>

      {/* Current Plan Banner */}
      <Card className="border-purple bg-lavender/30">
        <CardContent className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="bg-purple/10 rounded-lg p-2.5">
              <Zap className="w-5 h-5 text-purple" />
            </div>
            <div>
              <p className="font-semibold text-navy">Free Trial</p>
              <p className="text-sm text-muted-foreground">14-day free trial — no credit card required</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">9 days remaining</Badge>
            <Button variant="primary" size="sm">Upgrade Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div>
        <h2 className="font-heading font-semibold text-navy mb-4">Choose your plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(plan => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-purple shadow-lg shadow-purple/10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-purple text-white text-xs px-3">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-navy">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-heading text-3xl font-bold text-navy">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <CardDescription className="text-xs">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-charcoal">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.variant} className="w-full mt-2" size="sm">
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Usage</CardTitle>
          <CardDescription>Your usage this billing period</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "AI Match Assessments", used: 12, limit: 50, unit: "assessments" },
            { label: "Job Descriptions Generated", used: 4, limit: 20, unit: "JDs" },
            { label: "Team Members", used: 2, limit: 5, unit: "members" },
          ].map(item => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium text-navy">{item.label}</span>
                <span className="text-muted-foreground">{item.used} / {item.limit} {item.unit}</span>
              </div>
              <div className="h-2 bg-lavender rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple rounded-full transition-all"
                  style={{ width: `${Math.min((item.used / item.limit) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enterprise CTA */}
      <Card className="bg-navy border-navy text-white">
        <CardContent className="p-6 flex items-center gap-6 flex-wrap">
          <Building2 className="w-8 h-8 text-mint shrink-0" />
          <div className="flex-1">
            <h3 className="font-heading font-semibold mb-1">Need an Enterprise plan?</h3>
            <p className="text-sm text-white/70">Custom pricing, SSO, dedicated support, and SLA guarantees for large organizations.</p>
          </div>
          <Button variant="mint" size="sm" asChild>
            <a href="/contact">Contact Sales</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
