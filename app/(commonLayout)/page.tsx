import AISuggestionSection from "@/components/modules/Home/AISuggestionSection";
import CTASection from "@/components/modules/Home/CTASection";
import HeroSection from "@/components/modules/Home/HeroSection";
import HowItWorksSection from "@/components/modules/Home/HowItWorksSection";
import SpecialtiesSection from "@/components/modules/Home/SpecialtiesSection";
import StatsSection from "@/components/modules/Home/StatsSection";
import TestimonialsSection from "@/components/modules/Home/TestimonialsSection";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import ValuePropsSection from "@/components/modules/Home/ValuePropsSection";


export default function Home() {
  return (
   <div>
      <HeroSection/>
      <ValuePropsSection/>
      <SpecialtiesSection/>
      <TopRatedDoctors/>
      <AISuggestionSection/>
      <HowItWorksSection/>
      <StatsSection/>
      <TestimonialsSection/>
      <CTASection/>
   </div>
  );
}
