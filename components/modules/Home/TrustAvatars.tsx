const TrustAvatars = () => {
  return (
    <div className="flex items-center gap-3 pt-4 sm:pt-6">
      <div className="flex -space-x-2 overflow-hidden">
        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#7ed7c1]" />
        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#30d158]" />
        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#ff9f0a]" />
      </div>
      <span className="text-xs sm:text-sm font-normal text-[#3E4947]">
        Trusted by thousands for instant health guidance
      </span>
    </div>
  );
};

export default TrustAvatars;
