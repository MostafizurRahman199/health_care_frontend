"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import AIBadge from "./AIBadge";
import TrustAvatars from "./TrustAvatars";
import SymptomInputCard from "./SymptomInputCard";



// ==========================================
// Main Section Component
// ==========================================
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