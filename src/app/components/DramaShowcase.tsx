import Image from 'next/image';

export default function DramaShowcase() {
  const posters = [
    { src: '/drama_poster/poster_1.jpg', alt: 'Drama Poster 1' },
    { src: '/drama_poster/poster_2.jpg', alt: 'Drama Poster 2' },
    { src: '/drama_poster/poster_3.jpg', alt: 'Drama Poster 3' },
    { src: '/drama_poster/poster_4.jpg', alt: 'Drama Poster 4' },
  ];

  return (
    <section className="w-full py-16 px-8 md:px-16 lg:px-32 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-custom-black text-center">
        戲劇作品展示
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {posters.map((poster, index) => (
          <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <Image
              src={poster.src}
              alt={poster.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}