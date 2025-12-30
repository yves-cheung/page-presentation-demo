"use client";

import { ImageLooper } from "./ImageLooper";

export default function LoopingCardsPage() {
  // image files located under public/drama_poster
  const posters = Array.from(
    { length: 8 },
    (_, i) => `/drama_poster/poster_${i + 1}.webp`
  );

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 cursor-auto">
      <ImageLooper images={posters} intervalMs={100} />
    </div>
  );
}
