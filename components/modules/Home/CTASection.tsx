"use client";

import React from "react";
import { CustomButton } from "@/components/ui/custom-button"; // Adjust path if needed
import { Container } from "@/components/ui/container";



// ==========================================
// 2. Reusable CTA Content Card Subcomponent
// ==========================================
const CTACard = () => {
  const handleSignUp = () => {
    console.log("Sign up clicked");
  };

  const handleContactSupport = () => {
    console.log("Contact support clicked");
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-[#edf4f2] via-[#eef5f3] to-[#e4f2ef] rounded-[28px] sm:rounded-[36px] p-8 sm:p-16 lg:p-20 text-center shadow-sm border border-white/60">
      {/* Soft Top-Right Gradient Highlight */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#005C55]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Title */}
      <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#181C1C] leading-[1.25] tracking-tight max-w-3xl mx-auto mb-4">
        Ready to prioritize your health? Join HealthFlow today.
      </h2>

      {/* Description Text */}
      <p className="text-sm sm:text-base lg:text-lg text-[#3E4947] font-normal max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
        Join thousands of patients who trust HealthFlow for their medical needs. Your first appointment is just a few clicks away.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
        <CustomButton
          customVariant="primary"
          onClick={handleSignUp}
          className="w-full sm:w-auto bg-[#005C55] hover:bg-[#004843] rounded-xl px-8 py-6 text-base font-semibold shadow-sm"
        >
          Sign Up Now
        </CustomButton>

        <CustomButton
          customVariant="secondary-outline"
          onClick={handleContactSupport}
          className="w-full sm:w-auto border-[#005C55] text-[#005C55] hover:bg-[#005C55]/5 rounded-xl px-8 py-6 text-base font-semibold bg-transparent"
        >
          Contact Support
        </CustomButton>
      </div>
    </div>
  );
};

// ==========================================
// 3. Main CTA Section Component
// ==========================================
export default function CTASection() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <Container>
        <CTACard />
      </Container>
    </section>
  );
}