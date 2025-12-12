"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import timelineData from "../sample_data/timeline.json";
import { useCloudAnimation } from "../hooks/useCloudAnimation";
import AOS from "aos";

type ProgramChild = {
  type: "program";
  img?: string;
  img_title?: string;
  img_title_position?: string;
  text?: string[];
};

type MilestoneChild = {
  type: "milestone";
  text: string[];
};

type TimelineChild = ProgramChild | MilestoneChild;

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { cloud1X, cloud2X, cloud3X, cloud4X } = useCloudAnimation(sectionRef);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full pb-16 px-8 md:px-16 lg:px-32 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Cloud decorations with scroll animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ x: cloud1X }} className="absolute top-8 left-0">
          <Image
            src="/timeline_bg/cloud_1.png"
            alt=""
            width={200}
            height={150}
            className="opacity-80 h-60 w-auto"
          />
        </motion.div>
        <motion.div style={{ x: cloud2X }} className="absolute top-120 right-0">
          <Image
            src="/timeline_bg/cloud_2.png"
            alt=""
            width={200}
            height={150}
            className="opacity-80 h-40 w-auto"
          />
        </motion.div>
        <motion.div style={{ x: cloud3X }} className="absolute bottom-220 left-[40%]">
          <Image
            src="/timeline_bg/cloud_3.png"
            alt=""
            width={200}
            height={150}
            className="opacity-80 h-32 w-auto"
          />
        </motion.div>
        <motion.div style={{ x: cloud4X }} className="absolute bottom-80 left-30">
          <Image
            src="/timeline_bg/cloud_4.png"
            alt=""
            width={200}
            height={150}
            className="opacity-80 h-100 w-auto"
          />
        </motion.div>
      </div>

      <h2 className="text-2xl md:text-3xl font-normal mb-12 text-custom-black text-center bg-white w-fit py-3 px-8 rounded-full z-10 tracking-widest">
        {timelineData.title}
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-11 w-1.5 bg-custom-black transform md:-translate-x-1/2"></div>

        {(() => {
          let lastSideForImages = true; // true = left, false = right
          
          return timelineData.nodes.map((node, index) => {
            const child = node.children[0] as TimelineChild;
            const hasImage = child.type === "program" && child.img;
            
            // Determine side based on whether item has an image
            let isLeft: boolean;
            if (hasImage) {
              isLeft = lastSideForImages;
              lastSideForImages = !lastSideForImages; // Toggle for next image
            } else {
              // Milestone: use the same side as the last item
              isLeft = !lastSideForImages; // Use opposite of what will be next (i.e., current side)
            }
            
            const isFirstNode = index === 0;
            const isMilestone = child.type === "milestone";
            
            // AOS animation directions - image and text should animate from opposite directions
            const imageAnimation = isLeft ? "fade-right" : "fade-left";
            const textAnimation = isLeft ? "fade-left" : "fade-right";
            const labelAnimation = isLeft ? "fade-right" : "fade-left";

          return (
            <div key={index} className="mb-16 relative">
              {/* Label and Dot Row */}
              {node.label && (
                <div className="relative flex items-center mb-8">
                  {/* Label */}
                  <div
                    className={`md:w-1/2 flex ${
                      isLeft
                        ? "md:justify-end md:pr-15 md:order-1"
                        : "md:justify-start md:pl-15 md:order-2"
                    } ${!isLeft && !isMilestone ? "md:ml-auto" : ""}`}
                  >
                    <div 
                      className="text-custom-black font-bold text-lg md:text-xl ml-16 md:ml-0"
                      data-aos={labelAnimation}
                      data-aos-offset="100"
                      data-aos-easing="ease-in-sine"
                    >
                      {node.label}
                    </div>
                  </div>

                  {/* Timeline dot at label level */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-[11px] md:-translate-x-1/2">
                    {isFirstNode ? (
                      // First dot: larger with white ring decoration
                      <div className="relative">
                        <div className="w-7 h-7 bg-custom-black rounded-full shadow-lg"></div>
                        <div className="w-7 h-7 absolute top-0 left-0">
                          <div className="flex justify-center items-center h-full">
                            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ) : isMilestone ? (
                      // Milestone dot: orange circle
                      <div className="w-4 h-4 bg-highlight rounded-full transform translate-x-[6px] md:translate-x-0"></div>
                    ) : (
                      // Regular program dot: black circle
                      <div className="w-4 h-4 bg-custom-black rounded-full transform translate-x-[6px] md:translate-x-0"></div>
                    )}
                  </div>

                  {/* Milestone content at label level - opposite side on desktop, hidden on mobile */}
                  {isMilestone && (
                    <div
                      className={`hidden md:flex md:w-1/2 ${
                        isLeft
                          ? "md:justify-start md:pl-15 md:order-2"
                          : "md:justify-end md:pr-15 md:order-1"
                      }`}
                    >
                      <div 
                        className="bg-custom-black text-white rounded-lg px-4 py-3 shadow-lg inline-block"
                        data-aos={textAnimation}
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        data-aos-delay="500"
                      >
                        {child.type === "milestone" &&
                          child.text.map((item: string, i: number) => (
                            <p
                              key={i}
                              className="text-xs md:text-sm font-semibold whitespace-pre-line"
                            >
                              {item}
                            </p>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Milestone content below label on mobile */}
              {isMilestone && (
                <div className="md:hidden ml-16">
                  <div 
                    className="bg-custom-black text-white rounded-lg px-4 py-3 shadow-lg inline-block"
                    data-aos={textAnimation}
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="200"
                  >
                    {child.type === "milestone" &&
                      child.text.map((item: string, i: number) => (
                        <p
                          key={i}
                          className="text-xs md:text-sm font-semibold whitespace-pre-line"
                        >
                          {item}
                        </p>
                      ))}
                  </div>
                </div>
              )}

              {/* Content Row - Below Label (only for programs) */}
              {child.type === "program" && (
                <div
                  className={`flex ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-20`}
                >
                  {/* Image Side */}
                  {child.img && (
                    <div 
                      className="md:w-1/2 md:max-w-90 ml-16 md:ml-0"
                      data-aos={imageAnimation}
                      data-aos-offset="100"
                      data-aos-easing="ease-in-sine"
                    >
                      <div className="relative rounded-lg shadow-lg overflow-hidden">
                        <Image
                          src={`/${child.img}`}
                          alt={child.img_title || "Program"}
                          width={500}
                          height={300}
                          className="w-full h-auto"
                        />
                        {child.img_title &&
                          child.img_title_position === "in-bottom" && (
                            <div className="absolute bottom-3 right-0  px-4 py-2">
                              {/* White SVG background */}
                              <div className="relative">
                                <svg
                                  className="absolute inset-0 w-full h-full"
                                  width="401"
                                  height="41"
                                  viewBox="0 0 401 41"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.7043 0H401L392.858 41H0L11.7043 0Z"
                                    fill="white"
                                  />
                                </svg>

                                <div className="relative px-3 py-1 text-custom-black text-xs md:text-sm font-semibold text-center whitespace-nowrap">
                                  {child.img_title}
                                </div>
                              </div>
                            </div>
                          )}
                        {child.img_title &&
                          child.img_title_position === "out-bottom" && (
                            <div className="bg-white text-custom-black px-3 py-2 text-sm md:text-base font-semibold text-center">
                              {child.img_title}
                            </div>
                          )}
                      </div>
                    </div>
                  )}

                  {/* Text Side */}
                  {child.text ? (
                    <div 
                      className="md:w-1/2 ml-16 md:ml-0 flex items-center"
                      data-aos={textAnimation}
                      data-aos-offset="100"
                      data-aos-easing="ease-in-sine"
                      data-aos-delay="200"
                    >
                      <ul className="space-y-2 text-custom-black text-sm md:text-base">
                        {child.text.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="text-custom-black mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ): <div className="md:w-1/2 ml-16 md:ml-0 flex items-center"></div>}
                </div>
              )}
            </div>
          );
          });
        })()}

        {/* 3 black square dots at the end */}
        <div className="absolute bottom-0 left-4 md:left-1/2 transform md:-translate-x-1/2 flex flex-col gap-2 mt-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="w-1.5 aspect-square bg-custom-black"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
