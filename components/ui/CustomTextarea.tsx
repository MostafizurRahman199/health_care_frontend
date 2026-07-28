import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ label, error, className, id, ...props }, ref) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label htmlFor={id} className="text-sm font-semibold text-[#181c1c]">
          {label}
        </Label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          "w-full px-4 py-3 bg-[#f1f4f3] border border-[#bdc9c6] text-[#181c1c] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005c55]/20 focus-visible:border-[#005c55] rounded-lg transition-all resize-none font-sans text-sm",
          error && "border-red-500 focus-visible:ring-red-200",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
});
CustomTextarea.displayName = "CustomTextarea";