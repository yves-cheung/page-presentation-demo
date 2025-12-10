import Image from 'next/image';

export default function Outcome() {
  const stats = [
    { number: '180+', label: '場次', color: '#D37748' },
    { number: '50,000+', label: '學生人次', color: '#8B4513' },
    { number: '150+', label: '學校', color: '#A0522D' },
  ];

  return (
    <section className="w-full py-16 px-8 md:px-16 lg:px-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-custom-black text-center">
        教育成果
      </h2>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Circular chart */}
        <div className="relative flex items-center justify-center">
          <Image
            src="/outcome/stat_1.png"
            alt="Education Outcome Statistics"
            width={400}
            height={400}
            className="w-full max-w-md h-auto"
          />
        </div>
        
        {/* Right side - Statistics */}
        <div className="space-y-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: stat.color }}
              >
                {index + 1}
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-highlight">
                  {stat.number}
                </div>
                <div className="text-lg text-custom-black">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}