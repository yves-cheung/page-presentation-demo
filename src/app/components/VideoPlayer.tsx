"use client";

import { useEffect } from "react";
import videoData from "../sample_data/video.json";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ isOpen, onClose }: VideoPlayerProps) {
  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Handle ESC key to close overlay
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent body scroll when overlay is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const videoUrl = videoData[0].url;
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center transition-opacity duration-300 overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player overlay"
    >
      <div
        className="relative w-full max-w-4xl aspect-video px-2 sm:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-lg shadow-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-light transition-colors"
          aria-label="Close video player"
        >
          ×
        </button>
      </div>
    </div>
  );
}
