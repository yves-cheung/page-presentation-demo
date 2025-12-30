"use client";
import { Divider } from "./Divider";
import TreeMap from "./TreeMap";
import GeoMap from "./GeoMap";
import { ParentSize } from "@visx/responsive";
import WordCloud from "../wordcloud/WordCloud";
import { ImageLooper } from "../looping-cards/ImageLooper";

export default function DataDisplayPage() {
  const posters = Array.from(
    { length: 8 },
    (_, i) => `/drama_poster/poster_${i + 1}.webp`
  );

  return (
    <div className="w-full min-h-screen bg-zinc-100 p-2 sm:p-4 md:p-8 lg:p-16 flex flex-col gap-4 overflow-y-auto space-y-16 justify-center items-center">
      <div className="w-full flex-col justify-center max-w-6xl">
        <GeoMap />
      </div>

      <Divider />

      <div className="w-full flex justify-center">
        <TreeMap />
      </div>

      <Divider />

      <div className="w-full h-screen max-w-7xl max-h-[500px] sm:max-h-[800px] cursor-auto">
        <ParentSize>
          {({ width, height }) => <WordCloud width={width} height={height} />}
        </ParentSize>
      </div>
      <Divider />
      <div className="w-full  h-screen flex justify-center items-center cursor-auto">
        <ImageLooper images={posters} intervalMs={100} />
      </div>
    </div>
  );
}
