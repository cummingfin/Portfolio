"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectColor, setProjectColor] = useState<string>("#8FA3B2");
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Project cursor colors
  const projectColors = ["#6C8BEA", "#E8C75D", "#E4927C"];

  useEffect(() => {
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

    const handleProjectHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectCard = target.closest('[data-project-name]');
      const interactiveElement = target.closest('a, button, [role="button"], [onclick], .cursor-pointer');
      
      if (projectCard) {
        const name = projectCard.getAttribute('data-project-name');
        const colorIndex = projectCard.getAttribute('data-project-color-index');
        setProjectName(name);
        // Cycle through the 3 colors based on project index
        if (colorIndex !== null) {
          const index = parseInt(colorIndex, 10);
          setProjectColor(projectColors[index % projectColors.length]);
        }
        setIsHovering(true);
      } else if (interactiveElement) {
        setProjectName(null);
        setIsHovering(true);
      } else {
        setProjectName(null);
        setIsHovering(false);
      }
    };

    // Initialize cursor position
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e);
      handleProjectHover(e);
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
  }, []);

  // Don't show on mobile/touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
    }
  }, []);

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
      {projectName ? (
        // Project hover - pill with project name (only animated state)
        <AnimatePresence mode="wait">
          <motion.div
            key="project-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <div 
              className="border-2 border-black rounded-full px-4 py-2 shadow-lg"
              style={{ backgroundColor: projectColor }}
            >
              <span className="text-black font-bricolage text-sm font-medium whitespace-nowrap">
                {projectName}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        // Non-animated states (instant transitions)
        <div style={{ transform: "translate(-50%, -50%)" }}>
          {isClicking ? (
            // Click state - blob shape
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7626 14.8676C10.3598 15.6775 8.42622 15.5531 6.46336 14.6773C4.51592 13.8084 2.77066 12.2931 1.86148 10.7183C0.0814907 7.63521 1.14895 3.67492 4.26262 1.87724C7.37629 0.0795569 11.3397 1.13526 13.1198 4.21834C14.029 5.79308 14.4686 8.06217 14.2474 10.1832C14.0245 12.3209 13.1655 14.0577 11.7626 14.8676Z" fill="#8FA3B2" stroke="black" strokeWidth="2"/>
            </svg>
          ) : isHovering ? (
            // General hover - pill shape
            <svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 1C19.8135 1 24.0046 1.84585 27.332 3.7998C30.6288 5.7359 33 8.69838 33 13C33 19.1933 30.4905 23.4121 27.2051 26.1016C23.8862 28.8183 19.7401 30 16.5 30C13.4232 30 9.53569 27.9274 6.35449 24.8682C3.169 21.8047 1 18.0496 1 15C1 11.9692 3.14947 8.46994 6.32422 5.66016C9.48721 2.86081 13.385 1 16.5 1Z" fill="#8FA3B2" stroke="black" strokeWidth="2"/>
            </svg>
          ) : (
            // Normal state - circle
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="13.5" cy="13.5" r="12.5" fill="#8FA3B2" stroke="black" strokeWidth="2"/>
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

