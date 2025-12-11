import Image from "next/image";

export default function DramaShowcase() {
  const posters = [
    { src: "/drama_poster/poster_1.jpg", alt: "Drama Poster 1" },
    { src: "/drama_poster/poster_2.jpg", alt: "Drama Poster 2" },
    { src: "/drama_poster/poster_3.jpg", alt: "Drama Poster 3" },
    { src: "/drama_poster/poster_4.jpg", alt: "Drama Poster 4" },
    { src: "/drama_poster/poster_5.jpg", alt: "Drama Poster 5" },
    { src: "/drama_poster/poster_6.jpg", alt: "Drama Poster 6" },
    { src: "/drama_poster/poster_7.jpg", alt: "Drama Poster 7" },
    { src: "/drama_poster/poster_8.jpg", alt: "Drama Poster 8" },
  ];

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

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {posters.map((poster, index) => (
          <a href="/" className="cursor-pointer" key={index}>
            <div
              key={index}
              className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                className="object-cover"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
