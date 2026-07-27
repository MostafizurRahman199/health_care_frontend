"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Camera,
  Edit2,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomInput } from "@/components/ui/custom-input";
import { Container } from "@/components/ui/container";

export default function Login() {
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Signup Password Strength State
  const [password, setPassword] = useState("");
  const calculateStrength = (val: string) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  const getStrengthText = () => {
    if (!password) return "Password must be at least 8 characters";
    switch (strength) {
      case 1:
        return "Weak password";
      case 2:
        return "Fair password";
      case 3:
        return "Good password";
      case 4:
        return "Strong password";
      default:
        return "Password must be at least 8 characters";
    }
  };

  const getBarColor = (index: number) => {
    if (index < strength) {
      if (strength <= 1) return "bg-[#ba1a1a]"; // Red
      if (strength === 2) return "bg-amber-500"; // Amber
      return "bg-[#006e2f]"; // Green
    }
    return "bg-[#bdc9c6]"; // Default outline color
  };

  return (
    <main className="w-full min-h-screen bg-[#f7faf8] flex items-center justify-center">
      {/* Container wraps the entire viewable page area */}
      <Container className="w-full py-6 md:py-12">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-[#bdc9c6]/40 overflow-hidden min-h-[800px]">
          
          {/* Left Column: Branding & Illustration */}
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

          {/* Right Column: Auth Forms */}
          <section className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-center justify-between p-6 md:p-10 bg-white">
            {/* Mobile Brand Logo */}
            <div className="md:hidden my-2 text-center">
              <h1 className="text-2xl font-bold text-[#005c55]">HealthFlow</h1>
            </div>

            <div className="w-full max-w-md my-auto">
              {/* LOGIN VIEW */}
              {authView === "login" && (
                <div className="transition-all duration-300">
                  <header className="mb-8">
                    <h2 className="text-3xl font-bold text-[#181c1c] mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-[#3e4947]">
                      Sign in to manage your appointments and records.
                    </p>
                  </header>

                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <CustomInput
                      id="loginEmail"
                      type="email"
                      label="Email Address"
                      placeholder="e.g. name@example.com"
                      leftIcon={<Mail className="w-5 h-5" />}
                    />

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor="loginPassword"
                          className="text-sm font-semibold text-[#181c1c]"
                        >
                          Password
                        </Label>
                        <Link
                          href="#"
                          className="text-sm font-semibold text-[#005c55] hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <CustomInput
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        leftIcon={<Lock className="w-5 h-5" />}
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                      <Checkbox id="remember" className="border-[#bdc9c6]" />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-[#3e4947] font-normal cursor-pointer"
                      >
                        Remember this device for 30 days
                      </Label>
                    </div>

                    <CustomButton type="submit" className="w-full">
                      Login
                    </CustomButton>
                  </form>

                  <div className="mt-8 pt-8 border-t border-[#bdc9c6] text-center">
                    <p className="text-sm text-[#3e4947]">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthView("signup")}
                        className="text-[#005c55] font-bold hover:underline"
                      >
                        Sign up as Patient
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* SIGNUP VIEW */}
              {authView === "signup" && (
                <div className="transition-all duration-300">
                  <header className="mb-6">
                    <button
                      type="button"
                      onClick={() => setAuthView("login")}
                      className="flex items-center gap-1.5 text-[#005c55] mb-3 text-sm font-semibold hover:-translate-x-1 transition-transform"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Login
                    </button>
                    <h2 className="text-2xl font-bold text-[#181c1c] mb-1">
                      Create Patient Account
                    </h2>
                    <p className="text-sm text-[#3e4947]">
                      Join HealthFlow for better medical care management.
                    </p>
                  </header>

                  <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
                    {/* Profile Photo Upload */}
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative group cursor-pointer">
                        <div className="w-20 h-20 rounded-full bg-[#e5e9e7] border-2 border-dashed border-[#bdc9c6] flex items-center justify-center overflow-hidden transition-all group-hover:border-[#005c55]">
                          <Camera className="w-7 h-7 text-gray-400 group-hover:text-[#005c55] transition-colors" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#005c55] text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                          <Edit2 className="w-3.5 h-3.5" />
                        </div>
                        <input type="file" className="hidden" accept="image/*" />
                      </div>
                      <span className="mt-1 text-[11px] font-semibold text-gray-500">
                        Optional Profile Photo
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <CustomInput
                        label="Full Name"
                        placeholder="John Doe"
                        leftIcon={<User className="w-5 h-5" />}
                      />
                      <CustomInput
                        label="Contact Number"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        leftIcon={<Phone className="w-5 h-5" />}
                      />
                    </div>

                    <CustomInput
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      leftIcon={<Mail className="w-5 h-5" />}
                    />

                    <div className="space-y-1.5">
                      <CustomInput
                        label="Create Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        leftIcon={<Lock className="w-5 h-5" />}
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        }
                      />

                      {/* Password Strength Indicator */}
                      <div className="mt-2 space-y-1.5">
                        <div className="flex gap-1.5 h-1.5 w-full">
                          {[0, 1, 2, 3].map((index) => (
                            <div
                              key={index}
                              className={cn(
                                "h-full flex-1 rounded-full transition-colors duration-300",
                                getBarColor(index)
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-[#3e4947]">
                          {getStrengthText()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 py-1">
                      <Checkbox id="terms" className="mt-0.5 border-[#bdc9c6]" />
                      <Label
                        htmlFor="terms"
                        className="text-xs text-[#3e4947] font-normal leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          href="#"
                          className="text-[#005c55] font-semibold hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          className="text-[#005c55] font-semibold hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </Label>
                    </div>

                    <CustomButton type="submit" className="w-full">
                      Complete Registration
                    </CustomButton>
                  </form>
                </div>
              )}
            </div>

            {/* Footer Policy */}
            <footer className="pt-6 text-center w-full">
              <p className="text-xs text-gray-500 font-medium">
                © {new Date().getFullYear()} HealthFlow Platform. All medical data is
                encrypted.
              </p>
            </footer>
          </section>

        </div>
      </Container>
    </main>
  );
}