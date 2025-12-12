"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import ArtEducationIntro from "./components/ArtEducationIntro";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CustomCursor from "./components/CustomCursor";

// Lazy load below-the-fold components
const Timeline = dynamic(() => import("./components/Timeline"), {
  loading: () => <div className="min-h-screen w-full" />,
  ssr: false, // Disable SSR to prevent AOS hydration errors
});
const DramaSystem = dynamic(() => import("./components/DramaSystem"), {
  loading: () => <div className="min-h-[600px] w-full" />,
});
const Outcome = dynamic(() => import("./components/Outcome"), {
  loading: () => <div className="min-h-screen w-full" />,
});
const SwipeCards = dynamic(() => import("./components/SwipeCards"), {
  loading: () => <div className="min-h-[500px] w-full" />,
});
const DramaShowcase = dynamic(() => import("./components/DramaShowcase"), {
  loading: () => <div className="min-h-[400px] w-full" />,
});
const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <div className="min-h-[200px] w-full" />,
});
const VideoPlayer = dynamic(() => import("./components/VideoPlayer"), {
  ssr: false,
});

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-primary-bg font-sans overflow-x-clip">
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
      <SwipeCards />

      <DramaShowcase />
      
      <Footer/>

      <button 
        className="fixed bottom-8 right-8 w-18 aspect-square p-2 rounded-full hover:transform hover:scale-110  active:scale-120 hover:cursor-pointer duration-300 z-50 overflow-hidden"
        aria-label="Book action button"
        onClick={() => setIsVideoOpen(true)}
      >
        <DotLottieReact
          src="/floating_button_book.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </button>

      <VideoPlayer isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}
