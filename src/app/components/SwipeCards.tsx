'use client';

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

// Import review data
import reviewData from "../sample_data/review.json";

interface Review {
  school: string;
  student: string;
  review: string;
}

// Light warm earth tone colors matching page theme
const cardColors = [
  "#FAF4ED", "#F8F1E9", "#FFF7EE", "#F9F5EE", "#F7F0E7",
  "#FBF6F0", "#F5EDE3", "#F9F2EA", "#FDF8F2", "#F6EFE6"
];

export default function SwipeCards() {
  const reviews: Review[] = reviewData;

  return (
    <section className="h-[50vh] min-h-[500px] w-full flex items-center justify-center relative overflow-x-hidden">
      <div className="absolute top-0 w-full h-full">
        <Image
          src="/bg_2.png"
          alt="background image"
          fill
          className="object-cover opacity-80"
        />
      </div>

      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[85vw] max-w-[640px] h-[60vw] max-h-[420px] md:w-[85vw] md:max-w-[640px] md:h-[60vw] md:max-h-[420px] max-md:w-[75vw] max-md:max-w-[340px] max-md:h-[90vw] max-md:max-h-[480px]"
      >
        {reviews.map((review, index) => (
          <SwiperSlide
            key={index}
            style={{ backgroundColor: cardColors[index % cardColors.length] }}
            className="flex items-start justify-start rounded-[18px] p-8 text-custom-black shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          >
            <div className="flex flex-col w-full h-full gap-4">
              <div className="flex-shrink-0">
                <h3 className="text-base font-bold m-0 mb-1.5 text-custom-black">
                  {review.school}
                </h3>
                <p className="text-sm font-medium m-0 opacity-80">
                  {review.student}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 swipe-card-scroll">
                <p className="text-[15px] leading-relaxed m-0 whitespace-pre-line">
                  {review.review}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
