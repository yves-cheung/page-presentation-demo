"use client";

import Header from "./components/Header";
import ArtEducationIntro from "./components/ArtEducationIntro";
import Timeline from "./components/Timeline";
import DramaSystem from "./components/DramaSystem";
import Outcome from "./components/Outcome";
import Interviews from "./components/Interviews";
import DramaShowcase from "./components/DramaShowcase";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-primary-bg font-sans">
      <CustomCursor />
      
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

      {/* <Interviews /> */}

      <DramaShowcase />
      
      <Footer/>

      <button 
        className="fixed bottom-8 right-8 w-18 aspect-square p-2 rounded-full hover:transform hover:scale-110  active:scale-120 hover:cursor-pointer duration-300 z-50 overflow-hidden"
        aria-label="Book action button"
      >
        <DotLottieReact
          src="/floating_button_book.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </button>
    </div>
  );
}
