import { useEffect } from "react";
import artEducationData from "../sample_data/art_eductaion.json";
import AOS from "aos";

export default function ArtEducationIntro() {

      useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
        });
      }, []);
  return (
    <section className="w-full relative -mt-32 mb-16 px-4 md:px-8 lg:px-16 z-10">
      <div className="max-w-[1000px] mx-auto relative">
        {/* SVG Background with curved edges */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1375 430"
          preserveAspectRatio="none"
        >
          <path
            d="M71.1073 128.648C88.8957 53.2608 156.187 0 233.644 0H1375L1312.27 298.176C1296.1 375.002 1228.33 430 1149.82 430H0L71.1073 128.648Z"
            fill="#242424"
          />
        </svg>

        {/* Content */}
        <div
          className="relative pl-16 pr-16 md:px-26 lg:px-32 py-6 md:py-8 lg:py-10"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in"
          data-aos-offset="0"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-medium mb-6 text-white">
            甚麼是
            <span className="relative inline-block">
              藝術
              <svg
                className="absolute left-2 md:left-4 top-full lg:mt-1 w-10 h-2 md:w-14 md:h-2.5 lg:w-18 lg:h-3"
                viewBox="0 0 124 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H119.005L124 11H5.58294L0 0Z" fill="#D37748" />
              </svg>
            </span>
            教育？
          </h2>

          <p className="sm:ml-10 lg:ml-20 md:ml-14 text-xs md:text-base lg:text-lg leading-relaxed text-white text-justify">
            {artEducationData.content}
          </p>
        </div>
      </div>
    </section>
  );
}
