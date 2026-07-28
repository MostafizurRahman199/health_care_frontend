"use client";

import React from "react";
import { HeartPulse, Baby, Brain, Bone, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";



// ==========================================
// 2. Data & Types
// ==========================================
interface SpecialtyItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

const specialtiesData: SpecialtyItem[] = [
  { id: "cardiology", name: "Cardiology", icon: HeartPulse },
  { id: "pediatrics", name: "Pediatrics", icon: Baby },
  { id: "neurology", name: "Neurology", icon: Brain },
  { id: "orthopedics", name: "Orthopedics", icon: Bone },
  { id: "dermatology", name: "Dermatology", icon: Sparkles },
];

// ==========================================
// 3. Reusable Specialty Card Subcomponent
// ==========================================
const SpecialtyCard = ({ name, icon: Icon }: SpecialtyItem) => {
  return (
    <div className="bg-white border border-gray-200/90 rounded-[12px] p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#0e6153] hover:shadow-md cursor-pointer group">
      <div className="w-12 h-12 flex items-center justify-center mb-4 text-[#005C55] group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-10 h-10 stroke-[1.8]" />
      </div>
      <span className="text-[16px] font-semibold text-[#181C1C] tracking-tight">
        {name}
      </span>
    </div>
  );
};

// ==========================================
// 4. Main Medical Specialties Section
// ==========================================
export default function SpecialtiesSection() {
  return (
    <section className="bg-[#F7FAF8] py-16 lg:py-24">
      <Container>
        {/* Header with Left-Aligned Title & Right-Aligned Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            title="Our Medical Specialties"
            description="We connect you with world-class specialists across a wide range of medical fields."
            className="mb-0 sm:mb-0 max-w-2xl"
          />

          <div className="flex items-center gap-6 self-start md:self-auto pb-1">
            {/* View All Specialties Link */}
            <Link
              href="/specialties"
              className="group flex items-center gap-2 text-sm font-bold text-[#005C55] hover:text-[#004843] transition-colors"
            >
              <span>View All Specialties</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Specialties Grid (5 Columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {specialtiesData.map((item) => (
            <SpecialtyCard key={item.id} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}