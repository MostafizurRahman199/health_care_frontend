"use client";

import React, { useState } from "react";
import { Bot, Mic, Lightbulb } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Textarea } from "@/components/ui/textarea";

const SymptomInputCard = () => {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div className="relative bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/60">
      <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-14 h-14 rounded-full bg-[#D8EFEA] flex items-center justify-center text-[#005C55] shadow-sm">
        <Lightbulb className="w-6 h-6 stroke-[2]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-[#181C1C] mb-5">
        Describe your symptoms
      </h3>

      <div className="relative mb-6">
        <Textarea
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="E.g., I've been having mild chest pain and shortness of breath for two days..."
          className="w-full rounded-2xl border border-gray-200 p-4 text-sm sm:text-base text-[#181C1C] placeholder:text-gray-400 resize-none pr-28"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-[#475250] font-normal pointer-events-none">
          <Mic className="w-3.5 h-3.5" />
          <span>Speech ready</span>
        </div>
      </div>

      <CustomButton
        type="button"
        customVariant="primary"
        leftIcon={<Bot className="w-5 h-5 stroke-[2]" />}
        className="w-full bg-[#005C55] hover:bg-[#004843] rounded-2xl py-3.5 sm:py-4 text-sm sm:text-base font-medium"
      >
        Analyze & Match Specialists
      </CustomButton>

      <p className="text-center text-xs text-[#475250] font-normal mt-4">
        Your data is processed securely and privately.
      </p>
    </div>
  );
};

export default SymptomInputCard;
