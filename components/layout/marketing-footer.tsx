import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Products: [
    { href: "/products/match", label: "RoleFit Match" },
    { href: "/products/intelligence", label: "RoleFit Intelligence" },
    { href: "/products/growth", label: "RoleFit Growth" },
    { href: "/products/pipeline", label: "RoleFit Pipeline" },
    { href: "/products/job-studio", label: "RoleFit Job Studio" },
    { href: "/products/interview", label: "RoleFit Interview" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    { href: "/resources", label: "Resources" },
    { href: "/trust", label: "Trust & Responsible AI" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="RoleFit AI"
                width={36}
                height={36}
                className="rounded-lg object-contain"
              />
              <span className="font-heading font-bold text-xl">
                RoleFit <span className="text-mint">AI</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              The AI talent intelligence platform for businesses that cannot afford a bad hire.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-white/50 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; 2025 RoleFit AI. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            Built for responsible, transparent AI-assisted talent decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
