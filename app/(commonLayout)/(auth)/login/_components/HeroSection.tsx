import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hidden md:flex md:w-1/2 lg:w-7/12 bg-gradient-to-br from-[#f7faf8] to-[#ebefed] relative flex-col items-center justify-center p-8 lg:p-12 border-r border-[#bdc9c6]/40">
      <div className="relative z-10 max-w-lg text-center">
        {/* Hero Banner Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-md border border-[#bdc9c6]/30 group relative aspect-video">
          <Image
            src="/image/login/doctor.jpg"
            alt="Medical Consultation Office"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f766e]/40" />
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#005c55] mb-3 leading-tight tracking-tight">
          Book trusted doctors in minutes
        </h1>
        <p className="text-base text-[#3e4947] max-w-md mx-auto leading-relaxed">
          HealthFlow connects you with premium medical professionals in a
          seamless, clinical-calm environment designed for your wellbeing.
        </p>

        {/* Badges */}
        <div className="mt-8 flex gap-6 justify-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#005c55]" />
            <span className="text-sm font-semibold text-[#181c1c]">
              Verified Doctors
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#005c55]" />
            <span className="text-sm font-semibold text-[#181c1c]">
              Secure Records
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
