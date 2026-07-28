"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Camera,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomTextarea } from "@/components/ui/CustomTextarea";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#181c1c] mb-1">
              Join HealthFlow
            </h2>
            <p className="text-sm text-[#3e4947]">
              Create your secure patient account to start.
            </p>
          </div>
          <Link
            href="#"
            className="text-xs font-semibold text-[#005c55] hover:underline"
          >
            Support
          </Link>
        </header>

        {/* Form Elements */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Profile Photo Upload */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-[#181c1c]">
              Profile Photo
            </Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#e5e9e7] flex items-center justify-center overflow-hidden border-2 border-dashed border-[#bdc9c6] group cursor-pointer hover:border-[#005c55] transition-colors shrink-0">
                <Camera className="w-6 h-6 text-gray-400 group-hover:text-[#005c55] transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#3e4947] mb-1">
                  Upload a clear face photo for patient identification.
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#005c55] hover:underline"
                >
                  Choose Image
                </button>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <CustomInput
            id="full_name"
            label="Full Name"
            placeholder="John Doe"
            leftIcon={<User className="w-5 h-5" />}
          />

          {/* Email and Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomInput
              id="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              leftIcon={<Mail className="w-5 h-5" />}
            />
            <CustomInput
              id="tel"
              type="tel"
              label="Contact Number"
              placeholder="+1 (555) 000-0000"
              leftIcon={<Phone className="w-5 h-5" />}
            />
          </div>

          {/* Password Field */}
          <CustomInput
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
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

          {/* Address Field */}
          <CustomTextarea
            id="address"
            label="Residential Address"
            placeholder="Enter full street address, city, and zip code"
            rows={2}
          />

          {/* Terms and Conditions */}
          <div className="flex items-start gap-2 py-1">
            <Checkbox id="terms" className="mt-0.5 border-[#bdc9c6] shrink-0" />
            <label
              htmlFor="terms"
              className="block text-xs text-[#3e4947] font-normal leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <Link href="#" className="text-[#005c55] font-semibold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#005c55] font-semibold hover:underline">
                Privacy Policy
              </Link>
              . I understand how my health data is processed.
            </label>
          </div>

          {/* Submit Action using CustomButton */}
          <CustomButton type="submit" className="w-full">
            Sign Up
          </CustomButton>
        </form>
      </div>

      {/* Bottom Login Link & Footer */}
      <div className="mt-8 pt-6 border-t border-[#bdc9c6]/40 text-center space-y-4">
        <p className="text-sm text-[#3e4947]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#005c55] font-bold hover:underline ml-1"
          >
            Login
          </Link>
        </p>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#3e4947]/80">
          <Link href="#" className="hover:text-[#005c55]">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="#" className="hover:text-[#005c55]">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="#" className="hover:text-[#005c55]">
            Patient Rights
          </Link>
        </div>
      </div>
    </>
  );
}
