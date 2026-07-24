"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHoverSupport, setHasHoverSupport] = useState(false);

  useEffect(() => {
    const checkHover = () => {
      const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      setHasHoverSupport(hasHover);
      setIsVisible(hasHover);
    };
    
    checkHover();
    
    // Listen for changes (e.g., if device capabilities change)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkHover);
      return () => mediaQuery.removeEventListener('change', checkHover);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(checkHover);
      return () => mediaQuery.removeListener(checkHover);
    }
  }, []);

  useEffect(() => {
    if (!hasHoverSupport) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleInteractiveHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest(
        'a, button, [role="button"], [onclick], .cursor-pointer'
      );

      setIsHovering(Boolean(interactiveElement));
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e);
      handleInteractiveHover(e);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasHoverSupport]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        left: 0,
        top: 0,
      }}
    >
      <div style={{ transform: "translate(-50%, -50%)" }}>
        <motion.div
          initial={false}
          animate={{
            width: isHovering ? 36 : 19,
            height: isHovering ? 36 : 19,
            scale: isClicking ? 0.78 : 1,
            backgroundColor: "#D8D4CC",
          }}
          transition={{
            type: "spring",
            stiffness: 430,
            damping: 31,
            mass: 0.65,
          }}
          className="relative flex items-center justify-center rounded-full border-[1.5px] border-[#272523]"
        />
      </div>
    </div>
  );
}
