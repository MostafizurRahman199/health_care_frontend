"use client";

import React from "react";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";



// ==========================================
// 2. Data & Types (9 Unique Cards)
// ==========================================
interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    quote:
      '"The AI symptom checker was surprisingly accurate. It suggested I see a cardiologist when I was unsure, and the specialist I booked through HealthFlow was exceptional."',
    name: "Sarah Mitchell",
    role: "Patient since 2023",
    initials: "SM",
    avatarBg: "bg-[#7ed7c1]", // Soft turquoise
  },
  {
    id: 2,
    quote:
      '"Booking an appointment used to take hours of phone calls. With HealthFlow, I found a top-rated pediatrician and had my kids\' check-up scheduled in under two minutes."',
    name: "David Rivera",
    role: "Father of two",
    initials: "DR",
    avatarBg: "bg-[#30d158]", // Bright green
  },
  {
    id: 3,
    quote:
      '"The telemedicine feature is a lifesaver. I could consult with my specialist from my office during lunch. The video quality and interface were professional and secure."',
    name: "Elena Lang",
    role: "Corporate Executive",
    initials: "EL",
    avatarBg: "bg-[#ff9f0a]", // Warm coral
  },
  {
    id: 4,
    quote:
      '"Having my digital prescriptions instantly sent to my pharmacy saves me so much time every month. Truly seamless healthcare management!"',
    name: "Marcus Vance",
    role: "Patient since 2022",
    initials: "MV",
    avatarBg: "bg-[#7ed7c1]",
  },
  {
    id: 5,
    quote:
      '"I needed urgent specialist advice for a sports injury. HealthFlow connected me with an orthopedist within 30 minutes online. Highly recommended!"',
    name: "Jessica Taylor",
    role: "Fitness Coach",
    initials: "JT",
    avatarBg: "bg-[#30d158]",
  },
  {
    id: 6,
    quote:
      '"All my medical history, lab reports, and doctor notes are neatly organized in one place. I never have to worry about losing paperwork again."',
    name: "Robert Chen",
    role: "Patient since 2024",
    initials: "RC",
    avatarBg: "bg-[#ff9f0a]",
  },
  {
    id: 7,
    quote:
      '"The platform made finding a local dermatologist effortless. Transparent pricing and no hidden clinic fees when paying through the app."',
    name: "Amanda Hays",
    role: "Design Lead",
    initials: "AH",
    avatarBg: "bg-[#7ed7c1]",
  },
  {
    id: 8,
    quote:
      '"As someone with a busy travel schedule, receiving round-the-clock video consultations from anywhere in the world is invaluable."',
    name: "Liam O'Connor",
    role: "Software Consultant",
    initials: "LO",
    avatarBg: "bg-[#30d158]",
  },
  {
    id: 9,
    quote:
      '"Extremely intuitive interface! Even my elderly parents found it easy to navigate and book their routine health checkups with ease."',
    name: "Sophia Martinez",
    role: "Patient since 2021",
    initials: "SM",
    avatarBg: "bg-[#ff9f0a]",
  },
];

// ==========================================
// 3. Reusable Testimonial Card Subcomponent
// ==========================================
const TestimonialCard = ({
  quote,
  name,
  role,
  initials,
  avatarBg,
}: TestimonialItem) => {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
      {/* Top Content: Star Rating + Quote */}
      <div>
        {/* 5 Green Stars */}
        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className="w-5 h-5 text-[#30d158] fill-[#30d158]"
            />
          ))}
        </div>

        {/* Quote Paragraph */}
        <p className="text-[#181C1C] text-base sm:text-lg font-normal leading-relaxed mb-8">
          {quote}
        </p>
      </div>

      {/* Bottom Profile Footer */}
      <div className="flex items-center gap-4 pt-2">
        {/* Circle Avatar Badge */}
        <div
          className={`w-12 h-12 rounded-full ${avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0`}
        >
          {initials}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-[#181C1C] font-semibold text-base leading-tight">
            {name}
          </span>
          <span className="text-[#3E4947] text-sm font-normal mt-0.5">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. Main Testimonials Section Component
// ==========================================
export default function TestimonialsSection() {
  // Autoplay Plugin Instance (3 seconds per slide, smooth auto-play)
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section className="bg-[#f8faf9] py-16 sm:py-24 overflow-hidden">
      <Container>
        {/* Section Header */}
        <SectionHeader
          title="What Our Patients Say"
          description="Real stories from people who found the care they needed through HealthFlow."
          className="max-w-xl"
        />

        {/* Auto-sliding Shadcn Carousel with 9 Cards */}
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 sm:-ml-6">
            {testimonialsData.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 sm:pl-6 md:basis-1/2 lg:basis-1/3 flex"
              >
                <TestimonialCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  );
}