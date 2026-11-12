"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const products = [
  { href: "/products/match", label: "RoleFit Match", description: "AI candidate matching" },
  { href: "/products/intelligence", label: "RoleFit Intelligence", description: "Workforce analytics" },
  { href: "/products/growth", label: "RoleFit Growth", description: "Employee development" },
  { href: "/products/pipeline", label: "RoleFit Pipeline", description: "Recruitment management" },
  { href: "/products/job-studio", label: "RoleFit Job Studio", description: "Job description AI" },
  { href: "/products/interview", label: "RoleFit Interview", description: "Interview intelligence" },
];

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/trust", label: "Trust" },
];

export function MarketingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-magenta flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-navy">
              RoleFit <span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Products Dropdown */}
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-purple",
                pathname.startsWith("/products") ? "text-purple" : scrolled ? "text-charcoal" : "text-charcoal"
              )}>
                Products <ChevronDown className={cn("w-4 h-4 transition-transform", productsOpen && "rotate-180")} />
              </button>
              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-xl shadow-xl border border-border p-2">
                  {products.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="flex flex-col px-4 py-3 rounded-lg hover:bg-lavender transition-colors"
                    >
                      <span className="text-sm font-semibold text-navy">{p.label}</span>
                      <span className="text-xs text-muted-foreground">{p.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-purple",
                  pathname === link.href ? "text-purple" : scrolled ? "text-charcoal" : "text-charcoal"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="mint" asChild size="sm">
              <Link href="/demo">Request Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-lavender"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Products</p>
              {products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block py-2 text-sm text-charcoal hover:text-purple"
                  onClick={() => setIsOpen(false)}
                >
                  {p.label}
                </Link>
              ))}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-charcoal hover:text-purple"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="mint" asChild>
                <Link href="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
