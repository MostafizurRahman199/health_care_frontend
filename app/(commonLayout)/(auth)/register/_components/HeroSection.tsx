import Image from "next/image";
import { ShieldCheck, Stethoscope } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#005c55] relative flex-col justify-between p-10 lg:p-12 overflow-hidden text-white">
      {/* Background Medical Banner */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop"
          alt="Healthcare Professional"
          fill
          priority
          className="object-cover opacity-25 scale-105 hover:scale-100 transition-transform duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#005c55] via-[#005c55]/70 to-transparent" />
      </div>

      {/* Top Brand Logo inside Hero */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Stethoscope className="w-6 h-6 text-[#9cf2e8]" />
        </div>
        <span className="text-2xl font-bold tracking-tight">
          HealthFlow
        </span>
      </div>

      {/* Hero Messaging */}
      <div className="relative z-10 my-auto max-w-lg space-y-6">
        <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight">
          Patient-First Digital Healthcare.
        </h1>
        <p className="text-base lg:text-lg text-white/80 leading-relaxed font-normal">
          Experience a new standard of medical care. Access your records,
          book appointments, and connect with world-class specialists all in
          one secure place.
        </p>

        {/* Badge Feature */}
        <div className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 mt-8">
          <div className="w-11 h-11 rounded-full bg-[#9cf2e8] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#005c55]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Secure & HIPAA Compliant
            </h3>
            <p className="text-xs text-white/70">
              Your medical data is encrypted and protected by standard protocols.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Footer */}
      <div className="relative z-10 text-xs text-white/50">
        © {new Date().getFullYear()} HealthFlow Medical Group. All rights reserved.
      </div>
    </section>
  );
}
