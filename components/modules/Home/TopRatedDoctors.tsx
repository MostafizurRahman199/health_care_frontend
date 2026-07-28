
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Briefcase, Banknote, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CustomButton } from "@/components/ui/custom-button"; // Adjust path if needed
import { Container } from "@/components/ui/container";       // Adjust path if needed
import { SectionHeader } from "@/components/ui/section-header";
import { SliderButtons } from "@/components/ui/slider-buttons";

// ==========================================
// 1. Data & Types (9 Doctors)
// ==========================================
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  experience: string;
  fee: string;
  image: string;
  badgeTop?: string;
  badgeBottom?: {
    type: "available" | "nextSlot";
    text: string;
  };
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. James Wilson",
    specialty: "Senior Cardiologist",
    rating: "4.9",
    experience: "15+ Yrs",
    fee: "$120.00",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    badgeTop: "Patient Favorite",
    badgeBottom: { type: "available", text: "Available Now" },
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Pediatrician",
    rating: "4.9",
    experience: "12+ Yrs",
    fee: "$100.00",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdiV-H_q2yoTzDKZAsyAQ9AanDtHC0KN1rMuwnyTHEwRhQdK5S2E1n_gvq&s=10",
    badgeBottom: { type: "nextSlot", text: "Next: Today, 2:00 PM" },
  },
  {
    id: 3,
    name: "Dr. Michael Ross",
    specialty: "Neurologist",
    rating: "4.8",
    experience: "18+ Yrs",
    fee: "$150.00",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    badgeBottom: { type: "available", text: "Available Now" },
  },
  {
    id: 4,
    name: "Dr. Emily Watson",
    specialty: "Dermatologist",
    rating: "4.9",
    experience: "10+ Yrs",
    fee: "$110.00",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    badgeBottom: { type: "available", text: "Available Now" },
  },
  {
    id: 5,
    name: "Dr. Robert Martinez",
    specialty: "Orthopedic Surgeon",
    rating: "4.7",
    experience: "14+ Yrs",
    fee: "$140.00",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    badgeTop: "Patient Favorite",
    badgeBottom: { type: "available", text: "Available Now" },
  },
  {
    id: 6,
    name: "Dr. Lisa Anderson",
    specialty: "Endocrinologist",
    rating: "4.9",
    experience: "11+ Yrs",
    fee: "$130.00",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
    badgeBottom: { type: "nextSlot", text: "Next: Tomorrow, 10:00 AM" },
  },
  {
    id: 7,
    name: "Dr. David Kim",
    specialty: "Gastroenterologist",
    rating: "4.8",
    experience: "16+ Yrs",
    fee: "$135.00",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    badgeBottom: { type: "available", text: "Available Now" },
  },
  {
    id: 8,
    name: "Dr. Alexander Wright",
    specialty: "Psychiatrist",
    rating: "4.9",
    experience: "13+ Yrs",
    fee: "$160.00",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    badgeBottom: { type: "nextSlot", text: "Next: Today, 4:30 PM" },
  },
];

// ==========================================
// 2. Reusable Doctor Card Component
// ==========================================

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <div className="w-full max-w-[384px] h-full bg-white rounded-[24px] sm:rounded-[32px] border border-gray-200/90 p-5 sm:p-6 flex flex-col justify-between shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div>
        {/* Doctor Image Container */}
        <div className="relative w-full h-[320px] sm:h-[441.5px] rounded-[18px] sm:rounded-[24px] overflow-hidden mb-4 sm:mb-5 bg-gray-100">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            sizes="(max-width: 768px) 100vw, 334px"
            className="object-cover object-top"
          />

          {/* Top Left Badge (Patient Favorite) */}
          {doctor.badgeTop && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0A5D53]/90 text-white backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span>{doctor.badgeTop}</span>
            </div>
          )}

          {/* Bottom Left Badges */}
          {doctor.badgeBottom?.type === "available" && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 text-[#0A5D53] backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10B981]" />
              <span>{doctor.badgeBottom.text}</span>
            </div>
          )}

          {doctor.badgeBottom?.type === "nextSlot" && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 text-gray-700 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold shadow-sm">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
              <span>{doctor.badgeBottom.text}</span>
            </div>
          )}
        </div>

        {/* Doctor Title & Rating */}
        <div className="flex items-center justify-between gap-1.5 mb-1">
          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight truncate">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-1 bg-[#DDFCE5] text-[#15803D] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shrink-0">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#15803D] text-[#15803D]" />
            <span>{doctor.rating}</span>
          </div>
        </div>

        {/* Specialty */}
        <p className="text-sm sm:text-base text-gray-500 font-normal mb-2 sm:mb-3">
          {doctor.specialty}
        </p>

        {/* Info Tags */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-gray-600 mb-3 sm:mb-5">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <span>{doctor.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <span>{doctor.fee}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 sm:gap-2.5">
        {/* Book Appointment Primary Button */}
        <CustomButton
          customVariant="primary"
          className="w-full h-11 sm:h-12 bg-[#005C55] hover:bg-[#004843] rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold text-white transition-colors duration-200"
        >
          Book Appointment
        </CustomButton>

        {/* View Profile Secondary Button */}
        <CustomButton
          customVariant="secondary-outline"
          className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold text-gray-700 hover:text-gray-900 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          View Profile
        </CustomButton>
      </div>
    </div>
  );
};

// ==========================================
// 3. Main Top Rated Doctors Section
// ==========================================
export default function TopRatedDoctors() {
  const [api, setApi] = React.useState<CarouselApi>();

  const handlePrev = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        {/* Header with Left-Aligned Title & Right-Aligned Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            title="Top Rated Doctors"
            description="Connect with our most highly-recommended specialists based on thousands of patient reviews."
            className="mb-0 sm:mb-0 max-w-2xl"
          />

          <div className="flex items-center gap-6 self-start md:self-auto pb-1">
            {/* View All Doctors Link */}
            <Link
              href="/doctors"
              className="group flex items-center gap-2 text-sm font-bold text-[#005C55] hover:text-[#004843] transition-colors"
            >
              <span>View All Doctors</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Carousel Slider with 3 Columns on Desktop */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {doctorsData.map((doctor) => (
                <CarouselItem
                  key={doctor.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <DoctorCard doctor={doctor} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Slider Navigation Buttons Centered Vertically on Left/Right */}
            <SliderButtons onPrev={handlePrev} onNext={handleNext} />
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

