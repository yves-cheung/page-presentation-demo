"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import outcomeStat from "../sample_data/outcome.json";

export default function Outcome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update image index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Divide scroll progress into 4 sections (one for each stat)
      const newIndex = Math.min(
        Math.floor(latest * outcomeStat.length),
        outcomeStat.length - 1
      );
      setCurrentImageIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Story Container */}
      <div className="relative min-h-[400vh]">
        {/* Fixed Background Container */}
        <div className="sticky top-0 w-[100vw] h-screen overflow-hidden">
          {/* Header Section - Outside scroll container */}
          <section className="w-full py-16 px-8 md:px-16 lg:px-32 flex flex-col justify-between relative">
            <div className="w-full flex flex-col items-end mb-12 relative">
              <h2 className="text-2xl md:text-3xl font-medium text-custom-black text-center z-10 relative">
                教育成果
              </h2>

              <svg
                className="absolute bottom-0 right-0 transform translate-x-[10%] translate-y-[25%] w-[95px] md:w-[120px]"
                viewBox="0 0 100 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="480" height="30" fill="#D37748" />
              </svg>
            </div>
          </section>
          {/* Background Images with Transition */}
          <div className="absolute inset-0 flex items-center justify-center">
            {outcomeStat.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentImageIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative max-w-6xl w-full flex items-center justify-center">
                  <Image
                    src={stat.img}
                    alt={`Education Outcome Statistics ${index + 1}`}
                    width={400}
                    height={400}
                    className="max-w-md h-auto z-10 relative"
                  />
                  <Image
                    src="/outcome/bg.png"
                    alt="background decoration"
                    width={400}
                    height={400}
                    className="absolute w-full z-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Section */}
          <section className="w-full py-8 px-8 md:px-16 lg:px-32 absolute bottom-10 right-0">
            <div className="w-full flex justify-end">
              <p className="text-xs">
                資料來源：賽馬會中國詩人別傳教育劇場計劃 2021-2022 研究報告
              </p>
            </div>
          </section>
        </div>

        {/* Scrolling Foreground - Text Cards */}
        <div className="absolute top-0 left-0 w-full pointer-events-none">
          {outcomeStat.map((stat, index) => (
            <section
              key={index}
              className="flex items-center justify-center min-h-screen"
              style={{ minHeight: "100vh" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 rounded-2xl px-6 py-6 border border-gray-700 max-w-[90vw] sm:max-w-[500px] mx-auto my-[50vh] pointer-events-auto"
              >
                <div className="mx-auto text">
                  <p className="text-sm md:text-base leading-6">{stat.text}</p>
                </div>
              </motion.div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
