"use client";

import React from "react";
import { Video, ClipboardList, FolderKanban, Banknote } from "lucide-react";
import { Container } from "@/components/ui/container";



// ==========================================
// 2. Types & Data
// ==========================================
interface ValuePropItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const valuePropsData: ValuePropItem[] = [
  {
    id: "video-consultations",
    icon: Video,
    title: "24/7 Video Consultations",
    description:
      "Connect with expert doctors instantly from the comfort of your home via high-definition, secure video calls.",
  },
  {
    id: "digital-prescriptions",
    icon: ClipboardList,
    title: "Digital Prescriptions",
    description:
      "Receive and manage your prescriptions digitally. Send them directly to your preferred pharmacy with a single tap.",
  },
  {
    id: "medical-reports",
    icon: FolderKanban,
    title: "Medical Reports & Records",
    description:
      "Access your full medical history and lab reports anytime. Securely stored and encrypted for your privacy.",
  },
  {
    id: "seamless-payments",
    icon: Banknote,
    title: "Seamless Payments",
    description:
      "Experience a hassle-free checkout with secure, integrated payment options for all your consultations and services.",
  },
];

// ==========================================
// 3. Reusable Value Card Subcomponent
// ==========================================
const ValueCard = ({ icon: Icon, title, description }: ValuePropItem) => {
  return (
    <div className="bg-white rounded-[12px] p-[32px] border border-gray-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-start transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1">
      {/* Icon Wrapper Badge */}
      <div className="w-[52px] h-[52px] rounded-[10px] bg-[#E8F3F1] flex items-center justify-center mb-6 shrink-0">
        <Icon className="w-6 h-6 text-[#005C55]" />
      </div>

      {/* Card Title: 20px, Semibold, #181C1C */}
      <h3 className="text-[20px] font-semibold text-[#181C1C] leading-[1.3] mb-3">
        {title}
      </h3>

      {/* Card Description: 16px, Regular, #3E4947 */}
      <p className="text-[16px] font-normal text-[#3E4947] leading-[1.6]">
        {description}
      </p>
    </div>
  );
};

// ==========================================
// 4. Main Value Props Section Component
// ==========================================
export default function ValuePropsSection() {
  return (
    <section className="bg-[#f8faf9] py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePropsData.map((item) => (
            <ValueCard key={item.id} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}