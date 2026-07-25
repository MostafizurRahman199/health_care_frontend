"use client";

import React from "react";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";

// ==========================================
// 1. Data & Types
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
// 2. Reusable Stat Card Subcomponent
// ==========================================
const StatCard = ({ value, label, showStar }: StatItem) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Value Metric with Optional Star Icon */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-4xl sm:text-5xl lg:text-[48px] font-extrabold text-white tracking-tight leading-none">
          {value}
        </span>
        {showStar && (
          <Star className="w-8 h-8 sm:w-10 sm:h-10 text-[#30d158] fill-[#30d158] ml-0.5 shrink-0" />
        )}
      </div>

      {/* Uppercase Subtitle Label */}
      <p className="text-xs sm:text-[14px] font-semibold text-emerald-100/80 tracking-[0.18em] uppercase">
        {label}
      </p>
    </div>
  );
};

// ==========================================
// 3. Main Stats Section Component
// ==========================================
export default function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#005C55] py-16 sm:py-20 text-white">
      
      {/* Top-Left 1/4 Oval Shape */}
      <div className="absolute top-0 left-0 w-[42vw] max-w-[400px] h-[40%] bg-white/[0.07] rounded-br-[100%] pointer-events-none z-0" />

      {/* Bottom-Right 1/4 Oval Shape */}
      <div className="absolute bottom-0 right-0 w-[42vw] max-w-[400px] h-[35%] bg-white/[0.07] rounded-tl-[100%] pointer-events-none z-0" />

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