import Header from "./components/Header";
import ArtEducationIntro from "./components/ArtEducationIntro";
import Timeline from "./components/Timeline";
import DramaSystem from "./components/DramaSystem";
import Outcome from "./components/Outcome";
import Interviews from "./components/Interviews";
import DramaShowcase from "./components/DramaShowcase";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-primary-bg font-sans">
      <Header />
      
      <Image
        src="/hero_section.png"
        alt="Hero Section"
        width={1440}
        height={600}
        className="h-auto w-full"
        priority
      />

      <ArtEducationIntro />

      <Timeline />

      <DramaSystem />

      <Outcome />

      <Interviews />

      <DramaShowcase />

      {/* Floating action button - placeholder for Lottie animation */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-highlight rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center text-white font-bold z-50">
        <span className="text-2xl">📖</span>
      </button>
    </div>
  );
}
