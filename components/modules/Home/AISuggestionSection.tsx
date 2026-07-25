"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bot, Mic, Lightbulb } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/ui/container";



// ==========================================
// 2. Reusable AI Badge with Custom Spark Icon Image
// ==========================================
const AIBadge = ({ text }: { text: string }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#005C55]/10 text-[#005C55] font-medium text-xs sm:text-sm w-fit mb-6">
      <div className="relative w-4 h-4 shrink-0">
        <Image
          src="/image/spark.png" // Served from public/image/spark_icon.jpg
          alt="Spark Icon"
          fill
          sizes="16px"
          className="object-contain"
        />
      </div>
      <span>{text}</span>
    </div>
  );
};

// ==========================================
// 3. Reusable Overlapping Avatars Subcomponent
// ==========================================
const TrustAvatars = () => {
  return (
    <div className="flex items-center gap-3 pt-4 sm:pt-6">
      <div className="flex -space-x-2 overflow-hidden">
        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#7ed7c1]" />
        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#30d158]" />
        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#ff9f0a]" />
      </div>
      <span className="text-xs sm:text-sm font-normal text-[#3E4947]">
        Trusted by thousands for instant health guidance
      </span>
    </div>
  );
};

// ==========================================
// 4. Reusable Symptom Input Form Subcomponent
// ==========================================


const SymptomInputCard = () => {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div className="relative bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/60">
      {/* Lightbulb Floating Icon */}
      <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-14 h-14 rounded-full bg-[#D8EFEA] flex items-center justify-center text-[#005C55] shadow-sm">
        <Lightbulb className="w-6 h-6 stroke-[2]" />
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-semibold text-[#181C1C] mb-5">
        Describe your symptoms
      </h3>

      {/* Input Box Area */}
      <div className="relative mb-6">
        <Textarea
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="E.g., I've been having mild chest pain and shortness of breath for two days..."
          className="w-full rounded-2xl border border-gray-200 p-4 text-sm sm:text-base text-[#181C1C] placeholder:text-gray-400 resize-none pr-28"
        />
        {/* Speech Indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-gray-400 font-normal pointer-events-none">
          <Mic className="w-3.5 h-3.5" />
          <span>Speech ready</span>
        </div>
      </div>

      {/* Action Button using CustomButton */}
      <CustomButton
        type="button"
        customVariant="primary"
        leftIcon={<Bot className="w-5 h-5 stroke-[2]" />}
        className="w-full bg-[#005C55] hover:bg-[#004843] rounded-2xl py-3.5 sm:py-4 text-sm sm:text-base font-medium"
      >
        Analyze & Match Specialists
      </CustomButton>

      {/* Footer Text */}
      <p className="text-center text-xs text-gray-500 font-normal mt-4">
        Your data is processed securely and privately.
      </p>
    </div>
  );
};




export default function AISuggestionSection() {
  return (
    <section className="relative overflow-hidden bg-[#E8F3F1] py-16 sm:py-24">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AIBadge text="AI-Powered Matching" />

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#181C1C] leading-[1.2] tracking-tight mb-6">
              Not sure which specialist to see?{" "}
              <span className="text-[#005C55]">Our AI can help.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#3E4947] font-normal leading-relaxed mb-4 max-w-lg">
              Our intelligent health assistant analyzes your symptoms to match you with the most qualified specialists in our network, ensuring you get the right care from the start.
            </p>

            <TrustAvatars />
          </div>

          {/* Right Column: Anchored Wrapper for Card + Spark Watermark */}
          <div className="lg:col-span-6 relative">
            
            {/* Spark Watermark Anchored to Card Corner Across Mobile, Tablet & Desktop */}
            <div className="absolute -top-10 -right-6 sm:-top-12 sm:-right-2 w-16 h-16 sm:w-24 sm:h-24 opacity-10 pointer-events-none select-none z-0">
              <Image
                src="/image/spark.png"
                alt="Background Spark Watermark"
                fill
                sizes="(max-width: 640px) 64px, 96px"
                className="object-contain"
              />
            </div>

            {/* AI Symptom Box */}
            <div className="relative z-10">
              <SymptomInputCard />
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}