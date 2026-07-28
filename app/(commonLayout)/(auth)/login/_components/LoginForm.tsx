"use client";

import React, { useState, useActionState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomInput } from "@/components/ui/custom-input";
import { loginUser } from "@/service/auth/loginUser";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await loginUser(formData);
        toast.success("Logged in successfully!");
        window.location.href = "/";
        return { success: true };
      } catch (error) {
        console.error(error);
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        toast.error(`Login failed: ${errMsg}`);
        return { success: false, error: errMsg };
      }
    },
    null
  );
  
  return (
    <div className="transition-all duration-300">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-[#181c1c] mb-2">
          Welcome Back
        </h2>
        <p className="text-[#3e4947]">
          Sign in to manage your appointments and records.
        </p>
      </header>

      <form action={formAction} className="space-y-4">
        <CustomInput
          id="loginEmail"
          name="email"
          type="email"
          label="Email Address"
          placeholder="e.g. name@example.com"
          // defaultValue="admin@example.com"
          leftIcon={<Mail className="w-5 h-5" />}
          disabled={isPending}
        />

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="loginPassword"
              className="text-sm font-semibold text-[#181c1c]"
            >
              Password
            </Label>
           
          </div>
          <CustomInput
            id="loginPassword"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            // defaultValue="Password1"
            disabled={isPending}
            leftIcon={<Lock className="w-5 h-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isPending}
                className="text-gray-400 hover:text-gray-700 focus:outline-none disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />
           <Link
              href="/forget-password"
              className="text-sm font-semibold text-[#005c55] hover:underline"
            >
              Reset / Forget Password
            </Link>
        </div>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox id="remember" className="border-[#bdc9c6]" disabled={isPending} />
          <Label
            htmlFor="remember"
            className="text-sm text-[#3e4947] font-normal cursor-pointer"
          >
            Remember this device for 30 days
          </Label>
        </div>

        <CustomButton type="submit" className="w-full" isLoading={isPending}>
          Login
        </CustomButton>
      </form>

      <div className="mt-8 pt-8 border-t border-[#bdc9c6] text-center">
        <p className="text-sm text-[#3e4947]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#005c55] font-bold hover:underline"
          >
            Sign up as Patient
          </Link>
        </p>
      </div>
    </div>
  );
}
