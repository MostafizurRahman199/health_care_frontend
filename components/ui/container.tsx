import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`max-w-[1280px] mx-auto px-[50.6px] max-md:px-4 ${className}`}
    >
      {children}
    </div>
  );
};