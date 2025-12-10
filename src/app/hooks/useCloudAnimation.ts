import { useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

export function useCloudAnimation(containerRef: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Cloud 1 (top-left) - moves left
  const cloud1X = useTransform(scrollYProgress, [0, 1], [0, -500]);

  // Cloud 2 (top-right) - moves right
  const cloud2X = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Cloud 3 (center) - moves left
  const cloud3X = useTransform(scrollYProgress, [0, 1], [0, 400]);

  // Cloud 4 (bottom-left) - moves left
  const cloud4X = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return {
    cloud1X,
    cloud2X,
    cloud3X,
    cloud4X,
  };
}
