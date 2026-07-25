import AISuggestionSection from "@/components/modules/Home/AISuggestionSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import SpecialtiesSection from "@/components/modules/Home/SpecialtiesSection";
import ValuePropsSection from "@/components/modules/Home/ValuePropsSection";


export default function Home() {
  return (
   <div>
      <HeroSection/>
      <ValuePropsSection/>
      <SpecialtiesSection/>
      <AISuggestionSection/>
   </div>
  );
}
