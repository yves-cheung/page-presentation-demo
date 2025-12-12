'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import DramaData from "../sample_data/drama.json";

// Import Swiper styles
import "swiper/css";

export default function DramaShowcase() {
  const posters = DramaData;

  return (
    <section className="w-full py-12 pb-16 px-8 md:px-16 lg:px-32 bg-custom-black">
      <div className="w-full flex flex-col items-center mb-12 relative">
        <h2 className="text-2xl md:text-3xl font-medium text-white text-center relative z-10">
          愛麗絲劇場實驗室 演出劇目
        </h2>

        <svg
          className="absolute top-2/3 left-1/2 transform -translate-x-[45%] -translate-y-1/4 w-[365px] md:w-[460px]"
          viewBox="0 0 540 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="480" height="30" fill="#D37748" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="drama-showcase-swiper"
        >
          {posters.map((poster, index) => (
            <SwiperSlide key={index}>
              <a href="/" className="cursor-pointer block">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
