"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
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
  { href: "/pricing", label: "Pricing" },
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
            <Image
              src="/logo.jpg"
              alt="RoleFit AI"
              width={36}
              height={36}
              className="rounded-lg object-contain"
              priority
            />
            <span className={cn(
              "font-heading font-bold text-xl transition-colors",
              scrolled ? "text-navy" : "text-white"
            )}>
              RoleFit <span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Products Dropdown */}
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-purple",
                pathname.startsWith("/products") ? "text-purple" : scrolled ? "text-charcoal" : "text-white"
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
                  pathname === link.href ? "text-purple" : scrolled ? "text-charcoal" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant={scrolled ? "ghost" : "outline-white"} asChild size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="mint" asChild size="sm">
              <Link href="/register">Sign up</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn("lg:hidden p-2 rounded-lg transition-colors", scrolled ? "text-charcoal hover:bg-lavender" : "text-white hover:bg-white/10")}
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
                <Link href="/login">Sign in</Link>
              </Button>
              <Button variant="mint" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
