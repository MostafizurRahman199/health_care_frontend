import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeader({ title, description, className, align = "center" }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center max-w-2xl mx-auto" : "text-left max-w-2xl",
        "mb-12 sm:mb-16",
        className
      )}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#181C1C] tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-sm sm:text-base lg:text-[18px] text-[#3E4947] font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
}
