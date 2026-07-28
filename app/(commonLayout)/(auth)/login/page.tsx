import React from "react";
import { Container } from "@/components/ui/container";
import { HeroSection } from "./_components/HeroSection";
import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full min-h-screen bg-[#f7faf8] flex items-center justify-center">
      {/* Container wraps the entire viewable page area */}
      <Container className="w-full py-6 md:py-12">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-[#bdc9c6]/40 overflow-hidden min-h-[800px]">
          
          {/* Left Column: Branding & Illustration */}
          <HeroSection />

          {/* Right Column: Auth Forms */}
          <section className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-center justify-between p-6 md:p-10 bg-white">
            {/* Mobile Brand Logo */}
            <div className="md:hidden my-2 text-center">
              <h1 className="text-2xl font-bold text-[#005c55]">HealthFlow</h1>
            </div>

            <div className="w-full max-w-md my-auto">
              <LoginForm />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}