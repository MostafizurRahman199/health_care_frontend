"use client";

import React from "react";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";



// ==========================================
// 2. Data & Types
// ==========================================
interface StatItem {
  value: string;
  label: string;
  showStar?: boolean;
}

const statsData: StatItem[] = [
  {
    value: "500+",
    label: "VERIFIED DOCTORS",
  },
  {
    value: "10k+",
    label: "HAPPY PATIENTS",
  },
  {
    value: "4.9/5",
    label: "AVERAGE RATING",
    showStar: true,
  },
];

// ==========================================
// 3. Reusable Stat Card Subcomponent
// ==========================================
const StatCard = ({ value, label, showStar }: StatItem) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Value Metric with Optional Star Icon */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-none">
          {value}
        </span>
        {showStar && (
          <Star className="w-8 h-8 sm:w-10 sm:h-10 text-[#30d158] fill-[#30d158] ml-0.5 shrink-0" />
        )}
      </div>

      {/* Uppercase Subtitle Label */}
      <p className="text-xs sm:text-sm font-semibold text-emerald-100/80 tracking-[0.18em] uppercase">
        {label}
      </p>
    </div>
  );
};

// ==========================================
// 4. Main Stats Section Component
// ==========================================
export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#005C55] py-16 sm:py-20 text-white">
      {/* Background Soft Curved Wave Accents matching Figma */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Left Organic Curve Layer */}
      <div className="absolute top-0 left-0 w-80 h-36 bg-emerald-800/20 rounded-br-full pointer-events-none" />
      
      {/* Bottom Right Organic Curve Layer */}
      <div className="absolute bottom-0 right-0 w-96 h-40 bg-emerald-800/20 rounded-tl-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}