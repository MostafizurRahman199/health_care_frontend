import React from "react";
import { Container } from "@/components/ui/container";
import { HeroSection } from "./_components/HeroSection";
import { RegisterForm } from "./_components/RegisterForm";


export default function RegisterPage() {
  return (
    <main className="w-full min-h-screen bg-[#f7faf8] flex items-center justify-center py-6 md:py-10">
      <Container className="w-full">
        {/* Card Container Layout */}
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-[#bdc9c6]/40 overflow-hidden min-h-[850px]">
          
          {/* Left Column: Branding & Healthcare Image */}
          <HeroSection />

          {/* Right Column: Registration Form */}
          <section className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-between p-6 md:p-10 lg:p-12 bg-white">
            <RegisterForm />
          </section>

        </div>
      </Container>
    </main>
  );
}