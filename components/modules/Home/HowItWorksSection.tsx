"use client";

import { Container } from "@/components/ui/container";
import React from "react";
import { SectionHeader } from "@/components/ui/section-header";

// ==========================================
// 1. Reusable Container Component
// ==========================================
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}



// ==========================================
// 2. Data & Types
// ==========================================
interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
}

const stepsData: StepItem[] = [
  {
    stepNumber: 1,
    title: "Find your specialist",
    description:
      "Browse through our directory of verified doctors by specialty or location.",
  },
  {
    stepNumber: 2,
    title: "Choose a slot",
    description:
      "Select a date and time that fits your schedule for in-person or video visits.",
  },
  {
    stepNumber: 3,
    title: "Meet your doctor",
    description:
      "Connect via secure video or visit the clinic for your professional consultation.",
  },
];

// ==========================================
// 3. Reusable Step Item Subcomponent
// ==========================================
const StepCard = ({ stepNumber, title, description }: StepItem) => {
  return (
    <div className="flex flex-col items-center text-center relative z-10 px-2 sm:px-4">
      {/* Number Badge with Soft Glow Shadow */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#005C55] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-[0_4px_14px_rgba(0,92,85,0.25)] mb-6 sm:mb-8 transition-transform duration-300 hover:scale-105">
        {stepNumber}
      </div>

      {/* Step Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-[#181C1C] mb-3 leading-snug">
        {title}
      </h3>

      {/* Step Description */}
      <p className="text-sm sm:text-base text-[#3E4947] font-normal leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
  );
};

// ==========================================
// 4. Main How It Works Section Component
// ==========================================
export default function HowItWorksSection() {
  return (
    <section className="bg-[#f4f7f6] py-16 sm:py-24">
      <Container>
        {/* Section Header */}
        <SectionHeader
          title="How It Works"
          description="Three simple steps to better health"
          className="max-w-xl mb-16 sm:mb-20"
        />

        {/* Steps Container with Connecting Line */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-7 sm:top-8 left-[16%] right-[16%] h-[1.5px] bg-gray-300/80 z-0" />

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {stepsData.map((step) => (
              <StepCard key={step.stepNumber} {...step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}