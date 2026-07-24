"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CustomButton } from "../ui/custom-button";

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Consultation", href: "#" },
    { name: "Health Plans", href: "#" },
    { name: "Medicines", href: "#" },
    { name: "Diagnostics", href: "#" },
    { name: "NGOs", href: "#" },
  ];

  return (
    <nav className="w-full bg-[#f8faf9] border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-[#0e6153] font-bold text-2xl tracking-tight">
              HealthFlow
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#4b5563] hover:text-[#0e6153] text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/login"
              className="text-[#0e6153] font-semibold text-sm hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
            <CustomButton className="cursor-pointer !px-6 !h-10 !text-sm" customVariant="primary" >
                Sign Up
            </CustomButton>
          </div>

          {/* Mobile Smooth Drawer using Shadcn Sheet */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <button
                    type="button"
                    className="text-gray-600 hover:text-[#0e6153] focus:outline-none p-2"
                    aria-label="Open Menu"
                  />
                }
              >
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              <SheetContent side="right" className="bg-[#f8faf9] w-[300px] sm:w-[350px] p-6">
                <SheetHeader className="text-left border-b border-gray-200 pb-4 mb-4">
                  <SheetTitle className="text-[#0e6153] font-bold text-xl">
                    HealthFlow
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-4 pt-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-[#4b5563] hover:text-[#0e6153] text-lg font-medium transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <hr className="border-gray-200 my-2" />

                  <Link
                    href="/login"
                    className="text-[#0e6153] font-semibold text-lg py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>

                  <button
                    className="bg-[#0e6153] hover:bg-[#0b4d42] text-white font-medium w-full py-3 rounded-lg text-sm transition-colors shadow-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default PublicNavbar;