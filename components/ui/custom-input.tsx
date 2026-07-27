import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, leftIcon, rightIcon, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <Label htmlFor={id} className="text-sm font-semibold text-[#181c1c]">
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <Input
            ref={ref}
            id={id}
            className={cn(
              "h-12 bg-[#f1f4f3] border-[#bdc9c6] text-[#181c1c] placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#005c55]/20 focus-visible:border-[#005c55] rounded-lg transition-all",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus-visible:ring-red-200",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
