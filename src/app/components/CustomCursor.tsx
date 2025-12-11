"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if user is at the bottom (with 20px threshold)
      const atBottom = scrollTop + windowHeight >= documentHeight - 20;
      setIsAtBottom(atBottom);
    };

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 300); // Animation duration
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {!isAtBottom ? (
        <>
          {/* Triangle Cursor */}
          <svg
            width="200"
            height="180"
            viewBox="0 0 200 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Inverted Triangle outline - wide base at top, point at bottom */}
            <path
              d="M 10 20 L 190 20 L 100 170 Z"
              stroke="#ffffff"
              strokeWidth="6"
              fill="transparent"
            />

            {/* "Scroll" text */}
            <text
              x="100"
              y="80"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="20"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{ fontStyle: "italic" }}
            >
              Scroll
            </text>
          </svg>

          {/* Arrow overflow container */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <div
              className="arrow-container"
              style={{
                position: "absolute",
                top: "95px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "40px",
                overflow: "hidden",
              }}
            >
              <div
                className="arrow-animate"
                style={{
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: "400",
                  textAlign: "center",
                  lineHeight: "1",
                }}
              >
                ↓
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Circle Cursor - Small Filled Yellow */
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `translate(-50%, -50%) scale(${isClicked ? 1.3 : 1})`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <circle
            cx="15"
            cy="15"
            r="12"
            fill="#FFD700"
          />
        </svg>
      )}
    </div>
  );
}
