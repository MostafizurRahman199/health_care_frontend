import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SliderButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export function SliderButtons({ onPrev, onNext, className }: SliderButtonsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[#181C1C] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95",
          className
        )}
      >
        <ChevronLeft className="w-5 h-5 stroke-[2]" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[#181C1C] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95",
          className
        )}
      >
        <ChevronRight className="w-5 h-5 stroke-[2]" />
      </button>
    </>
  );
}
