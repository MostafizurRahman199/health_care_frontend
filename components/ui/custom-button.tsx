"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Extend Shadcn's default ButtonProps so you keep all HTML & Shadcn functionality
export interface CustomButtonProps extends ButtonProps {
  customVariant?: "primary" | "secondary-outline";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      className,
      customVariant = "primary",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    // 2. Define your exact design styles based on variant
    const variantStyles = {
      primary:
        "bg-[#0e6153] hover:bg-[#0b4d42] text-white border-transparent",
      "secondary-outline":
        "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50 hover:text-gray-900",
    };

    return (
      <Button
        ref={ref}
        size="lg"
        disabled={disabled || isLoading}
        className={cn(
          "font-semibold text-base px-7 py-6 rounded-xl shadow-none transition-all duration-200 cursor-pointer",
          variantStyles[customVariant],
          className
        )}
        {...props}
      >
        {/* Render loading spinner if active */}
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>
        )}

        {children}

        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";