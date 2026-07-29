"use client";

import Image from "next/image";

const AIBadge = ({ text }: { text: string }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#005C55]/10 text-[#005C55] font-medium text-xs sm:text-sm w-fit mb-6">
      <div className="relative w-4 h-4 shrink-0">
        <Image
          src="/image/spark.png"
          alt="Spark Icon"
          fill
          sizes="16px"
          className="object-contain"
        />
      </div>
      <span>{text}</span>
    </div>
  );
};

export default AIBadge;
