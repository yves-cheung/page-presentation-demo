import artEducationData from '../sample_data/art_eductaion.json';

export default function ArtEducationIntro() {
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
        <div className="relative pl-12 pr-8 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-highlight">
            {artEducationData.title}
          </h2>
          <p className="text-xs md:text-base lg:text-lg leading-relaxed text-white">
            {artEducationData.content}
          </p>
        </div>
      </div>
    </section>
  );
}
