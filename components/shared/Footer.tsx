"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../ui/container";
import { InstagramIcon, TwitterIcon } from "./icons";



// ==========================================
// 3. Types & Data
// ==========================================
interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Patient Rights", href: "/patient-rights" },
  { label: "Contact Support", href: "/contact-support" },
  { label: "Careers", href: "/careers" },
];

// ==========================================
// 4. Main Footer Component
// ==========================================
export default function Footer() {
  return (
    <footer className="bg-[#E5E7E6] py-10 sm:py-14 border-t border-gray-300/40">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-2">
            <p className="text-xl sm:text-2xl font-bold text-[#181C1C] tracking-tight">
              HealthFlow
            </p>
            <p className="text-xs sm:text-sm text-[#475250] font-normal leading-relaxed max-w-[280px]">
              © 2026 HealthFlow Medical Group. All rights reserved.
            </p>
          </div>

          {/* Nav & Social Icons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-6 sm:gap-10 grow">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-xs sm:text-sm text-[#475250] hover:text-[#181C1C] transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F0F2F1] hover:bg-white text-[#181C1C] flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#181C1C]" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F0F2F1] hover:bg-white text-[#181C1C] flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#181C1C]" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}