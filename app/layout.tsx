import type { Metadata } from "next";
import { Manrope} from "next/font/google";
import "./globals.css";

// 1. Initialize the font
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Select weights you need
  variable: "--font-manrope",           // CSS variable name
  display: "swap",
});

export const metadata: Metadata = {
  title: "Health Care",
  description: "Health Care System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Apply font class & variable to <html> or <body>
    <html lang="en" className={`${manrope.variable} font-sans`} suppressHydrationWarning>
      <body className={manrope.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
