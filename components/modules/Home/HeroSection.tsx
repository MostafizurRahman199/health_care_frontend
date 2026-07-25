"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CustomButton } from "@/components/ui/custom-button";



// ==========================================
// 2. Reusable Badge Subcomponent
// ==========================================
const TrustBadge = ({ text }: { text: string }) => {
  return (
    <Badge className="bg-[#48f285]/20 text-[#0d4f40] hover:bg-[#48f285]/30 border-none px-3.5 py-4 text-xs font-semibold rounded-full flex items-center gap-1.5 w-fit shadow-none">
      <CheckCircle2 className="w-4 h-4  text-[#00d053] fill-[#00d053] stroke-white" />
      <span>{text}</span>
    </Badge>
  );
};

// ==========================================
// 3. Reusable Floating Card Subcomponent
// ==========================================
const FloatingConsultationCard = () => {
  return (
    <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-10 bg-white/95 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 z-10 transition-transform hover:scale-105 duration-300">
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#28e169] flex items-center justify-center text-white shrink-0 shadow-sm">
        <Video className="w-5 h-5 sm:w-6 sm:h-6 fill-white stroke-none" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
          Online Consultation
        </span>
        <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
          Available Now
        </span>
      </div>
    </div>
  );
};

// ==========================================
// 4. Main Hero Section Component
// ==========================================
export default function HeroSection() {


const handleFindDoctor = () => {
    console.log("Navigating to doctor search...");
  };

  const handleLearnMore = () => {
    console.log("Scrolling to info section...");
  };

  return (
    <section className="relative overflow-hidden bg-[#fbfdfc] py-12 lg:py-20">
      {/* Background Soft Glows matching Figma */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#48f285]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#0e6153]/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
            {/* Trust Badge */}
            <TrustBadge text="Trusted by 10,000+ Patients" />

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Your Health, Our Priority.{" "}
              <span className="text-[#0e6153]">Book Trusted Doctors</span> in Minutes.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal leading-relaxed">
              Experience a new standard of healthcare with seamless telemedicine and in-person appointments tailored to your schedule and needs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
             <CustomButton customVariant="primary" onClick={handleFindDoctor}>
              Find a Doctor
            </CustomButton>
              {/* Secondary Outline Style */}
            <CustomButton customVariant="secondary-outline" onClick={handleLearnMore}>
              Learn More
            </CustomButton>
            </div>
          </div>

          {/* Right Column: Doctor Image + Floating Overlay */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px]">
              
              {/* Main Image Frame */}
              <div className="relative aspect-[4/4.3] w-full rounded-[32px] overflow-hidden shadow-xl bg-gray-100 border border-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop"
                  alt="Doctor with Stethoscope"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center p-1 rounded-[32px]"
                />
              </div>

              {/* Floating Status Card */}
              <FloatingConsultationCard />

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}