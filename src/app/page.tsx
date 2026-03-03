import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReasonsMeSection from "@/components/ReasonsMeSection";
import ReasonsYouSection from "@/components/ReasonsYouSection";
import FinalSection from "@/components/FinalSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <ReasonsMeSection />
      <ReasonsYouSection />
      <FinalSection />
    </main>
  );
}
