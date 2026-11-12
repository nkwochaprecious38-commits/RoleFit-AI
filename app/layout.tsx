import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "RoleFit AI — AI-Powered Talent Intelligence",
    template: "%s | RoleFit AI",
  },
  description:
    "Beyond resumes. Beyond recruitment. Into workforce intelligence. RoleFit AI helps businesses discover, evaluate, match and develop talent.",
  keywords: [
    "talent intelligence",
    "AI recruitment",
    "candidate matching",
    "workforce analytics",
    "HR platform",
    "ATS",
  ],
  openGraph: {
    title: "RoleFit AI — AI-Powered Talent Intelligence",
    description: "Beyond resumes. Beyond recruitment. Into workforce intelligence.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
