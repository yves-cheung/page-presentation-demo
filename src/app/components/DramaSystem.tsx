import Image from 'next/image';

export default function DramaSystem() {
  return (
    <section className="w-full py-10 pb-12 px-8 md:px-16 lg:px-32 bg-custom-black">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-left">
        戲劇教育系統
      </h2>
      
      <div className="max-w-6xl mx-auto">
        <Image
          src="/drama_education_system.png"
          alt="ATL Drama Education System"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </section>
  );
}