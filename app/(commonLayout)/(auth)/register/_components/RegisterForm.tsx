"use client";

import { useState, useActionState, useRef, useEffect } from "react";
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
import { registerPatient } from "@/service/auth/registerPatient";
import { toast } from "sonner";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(registerPatient, {
    success: false,
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        const timer = setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoName(e.target.files[0].name);
    }
  };

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
        </header>

        {/* Form Elements */}
        <form action={formAction} className="space-y-4">
          {/* Profile Photo Upload */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-[#181c1c]">
              Profile Photo
            </Label>
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full bg-[#e5e9e7] flex items-center justify-center overflow-hidden border-2 border-dashed border-[#bdc9c6] group cursor-pointer hover:border-[#005c55] transition-colors shrink-0"
                onClick={handlePhotoClick}
              >
                <Camera className="w-6 h-6 text-gray-400 group-hover:text-[#005c55] transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#3e4947] mb-1">
                  {photoName ? photoName : "Upload a clear face photo for patient identification."}
                </p>
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="text-xs font-semibold text-[#005c55] hover:underline"
                >
                  Choose Image
                </button>
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
          </div>

          {/* Full Name */}
          <CustomInput
            id="full_name"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            leftIcon={<User className="w-5 h-5" />}
            required
            minLength={2}
            defaultValue={state.inputs?.name || ""}
            error={state.errors?.name?.[0]}
            disabled={isPending}
          />

          {/* Email and Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              leftIcon={<Mail className="w-5 h-5" />}
              required
              defaultValue={state.inputs?.email || ""}
              error={state.errors?.email?.[0]}
              disabled={isPending}
            />
            <CustomInput
              id="tel"
              name="contactNumber"
              type="tel"
              label="Contact Number"
              placeholder="+1 (555) 000-0000"
              leftIcon={<Phone className="w-5 h-5" />}
              required
              minLength={10}
              defaultValue={state.inputs?.contactNumber || ""}
              error={state.errors?.contactNumber?.[0]}
              disabled={isPending}
            />
          </div>

          {/* Password Field */}
          <CustomInput
            id="password"
            name="password"
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
                disabled={isPending}
                className="text-gray-400 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
            required
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
            error={state.errors?.password?.[0]}
            disabled={isPending}
          />

          {/* Address Field */}
          <CustomTextarea
            id="address"
            name="address"
            label="Residential Address"
            placeholder="Enter full street address, city, and zip code"
            rows={2}
            defaultValue={state.inputs?.address || ""}
            error={state.errors?.address?.[0]}
            disabled={isPending}
          />

          {/* Terms and Conditions */}
          <div className="flex items-start gap-2 py-1">
            <Checkbox id="terms" name="terms" required className="mt-0.5 border-[#bdc9c6] shrink-0" disabled={isPending} />
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
          {state.errors?.terms && (
            <p className="text-xs text-red-500 mt-1">{state.errors.terms[0]}</p>
          )}

          {/* Submit Action using CustomButton */}
          <CustomButton type="submit" isLoading={isPending} className="w-full">
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
      </div>
    </>
  );
}
