import { useEffect, useRef, useState } from "react";

interface ImageLooperProps {
  images: string[];
  intervalMs?: number;
}

export function ImageLooper({
  images,
  intervalMs = 10,
}: ImageLooperProps) {
  const [index, setIndex] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const paused = manualPaused || hoverPaused;

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Looping effect
  useEffect(() => {
    // clear any existing timer
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!paused) {
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, intervalMs);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [paused, images.length, intervalMs]);

  // handlers
  function handleMouseEnter() {
    setHoverPaused(true);
  }

  function handleMouseLeave() {
    setHoverPaused(false);
  }

  function handleClick() {
    // when clicking the card we zoom and pause on the current image
    if (!zoomed) {
      setZoomed(true);
      setManualPaused(true);
    }
    // if already zoomed, ignore clicks on the card (use back button to resume)
  }

  function handleResume() {
    // resume looping and remove zoom
    setZoomed(false);
    setManualPaused(false);
  }

  return (
    <div
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center gap-3"
    >
      <div
        role="button"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={
          "w-72 h-96 md:w-96 md:h-[560px] bg-gray-900/5 rounded-xl overflow-hidden shadow-lg cursor-pointer relative flex items-center justify-center transform transition-transform duration-200 " +
          (zoomed ? "scale-105 z-20" : "")
        }
        aria-pressed={manualPaused}
        title={
          zoomed
            ? "Zoomed (click back button to resume)"
            : manualPaused
            ? "Paused (click to resume)"
            : hoverPaused
            ? "Paused on hover"
            : "Looping images - click to pause"
        }
      >
        <img
          src={images[index]}
          alt={`Poster ${index + 1}`}
          className="w-full h-full object-cover transition-opacity duration-150"
          draggable={false}
        />

        {/* small counter / status */}
        {/* <div className="absolute left-2 bottom-2 bg-black/50 text-white text-xs rounded-md px-2 py-1">
        {index + 1}/{images.length} {paused ? "· paused" : ""}
      </div> */}

        {/* Back / resume button shown when zoomed */}
        {zoomed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleResume();
            }}
            aria-label="Resume looping"
            className="absolute right-3 top-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md flex items-center justify-center w-9 h-9"
          >
            ↺
          </button>
        )}
      </div>

      {/* View more button shown when looping is paused */}
      {paused && (
        <a
          href={"https://art-mate.net/"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-amber-500 text-white text-md font-semibold rounded-full shadow hover:bg-amber-400"
        >
          View more
        </a>
      )}
    </div>
  );
}
