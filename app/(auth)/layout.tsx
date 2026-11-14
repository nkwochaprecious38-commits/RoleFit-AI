export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex w-1/2 bg-navy flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-purple blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-magenta blur-3xl" />
        </div>
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="RoleFit AI"
              width={40}
              height={40}
              className="rounded-xl object-contain"
              priority
            />
            <span className="font-heading font-bold text-2xl text-white">
              RoleFit <span className="text-mint">AI</span>
            </span>
          </Link>
        </div>
        <div className="relative">
          <blockquote className="text-white/80 text-xl leading-relaxed italic mb-6">
            &ldquo;Beyond resumes. Beyond recruitment. Into workforce intelligence.&rdquo;
          </blockquote>
          <div className="space-y-3">
            {[
              "AI-powered candidate matching",
              "Explainable talent insights",
              "Responsible, human-led decisions",
            ].map((point) => (
              <div key={point} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                <span className="text-white/60 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-white/30">
          &copy; 2025 RoleFit AI. All rights reserved.
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="RoleFit AI"
              width={36}
              height={36}
              className="rounded-lg object-contain"
            />
            <span className="font-heading font-bold text-xl text-navy">
              RoleFit <span className="text-gradient">AI</span>
            </span>
          </Link>
        </div>
        <div className="max-w-md w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
