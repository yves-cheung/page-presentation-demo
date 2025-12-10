import Image from 'next/image';
import timelineData from '../sample_data/timeline.json';

type ProgramChild = {
  type: 'program';
  img?: string;
  img_title?: string;
  img_title_position?: string;
  text?: string[];
};

type MilestoneChild = {
  type: 'milestone';
  text: string[];
};

type TimelineChild = ProgramChild | MilestoneChild;

export default function Timeline() {
  return (
    <section className="w-full py-16 px-8 md:px-16 lg:px-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-custom-black text-center">
        {timelineData.title}
      </h2>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-highlight transform md:-translate-x-1/2"></div>
        
        {timelineData.nodes.map((node, index) => {
          const isLeft = index % 2 === 0;
          const child = node.children[0] as TimelineChild;
          
          return (
            <div key={index} className={`mb-16 relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-start items-start`}>
              {/* Year label */}
              <div className={`md:w-1/2 flex ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} mb-4 md:mb-0`}>
                <div className="bg-highlight text-white px-6 py-2 rounded-full font-bold text-sm md:text-base whitespace-nowrap ml-16 md:ml-0">
                  {node.label}
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-highlight rounded-full transform md:-translate-x-1/2 -translate-y-1"></div>
              
              {/* Content */}
              <div className={`md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12'} ml-16 md:ml-0`}>
                {child.type === 'program' && (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {child.img && (
                      <div className="relative">
                        <Image
                          src={`/${child.img}`}
                          alt={child.img_title || 'Program'}
                          width={500}
                          height={300}
                          className="w-full h-auto"
                        />
                        {child.img_title && child.img_title_position === 'in-bottom' && (
                          <div className="absolute bottom-0 left-0 right-0 bg-custom-black bg-opacity-80 text-white p-3 text-sm md:text-base font-semibold">
                            {child.img_title}
                          </div>
                        )}
                      </div>
                    )}
                    {child.img_title && child.img_title_position === 'out-bottom' && (
                      <div className="bg-highlight text-white p-3 text-sm md:text-base font-semibold">
                        {child.img_title}
                      </div>
                    )}
                    {child.text && (
                      <div className="p-4">
                        <ul className="space-y-2 text-custom-black text-sm md:text-base">
                          {child.text.map((item: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="text-highlight mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {child.type === 'milestone' && (
                  <div className="bg-highlight text-white rounded-lg p-4 shadow-lg">
                    {child.text.map((item: string, i: number) => (
                      <p key={i} className="text-sm md:text-base font-semibold whitespace-pre-line">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}