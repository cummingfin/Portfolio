"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type MugState = "default" | "hover" | "spilling" | "spilled";

export default function AboutSection() {
  const [mugState, setMugState] = useState<MugState>("default");
  const [currentMugIndex, setCurrentMugIndex] = useState(0);
  const [showAboutCopy, setShowAboutCopy] = useState(false);

  // Handle the sequential animation when spilling
  useEffect(() => {
    if (mugState === "spilling") {
      // Start with Mug3 (index 2), then animate through Mug4, Mug5, Mug6
      setCurrentMugIndex(2); // Mug3
      
      const timers: NodeJS.Timeout[] = [];
      
      // Mug4 appears after 150ms
      timers.push(setTimeout(() => setCurrentMugIndex(3), 150));
      
      // Mug5 appears after 300ms
      timers.push(setTimeout(() => setCurrentMugIndex(4), 300));
      
      // Mug6 appears after 450ms, then mark as spilled
      timers.push(setTimeout(() => {
        setCurrentMugIndex(5);
        setMugState("spilled");
      }, 450));
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [mugState]);

  // Show about text after animation completes
  useEffect(() => {
    if (mugState === "spilled") {
      const timer = setTimeout(() => setShowAboutCopy(true), 200);
      return () => clearTimeout(timer);
    }
    setShowAboutCopy(false);
  }, [mugState]);

  const handleHover = () => {
    if (mugState === "default") {
      setMugState("hover");
    }
  };

  const handleLeave = () => {
    if (mugState === "hover") {
      setMugState("default");
    }
  };

  const handleClick = () => {
    if (mugState !== "spilled" && mugState !== "spilling") {
      setMugState("spilling");
    }
  };

  // All 6 mug states
  const mugStates = [
    { key: "mug1", src: "/svgs/Mug1.svg", alt: "Tea mug" },
    { key: "mug2", src: "/svgs/Mug2.svg", alt: "Tea mug hovered" },
    { key: "mug3", src: "/svgs/Mug3.svg", alt: "Tea mug starting to spill" },
    { key: "mug4", src: "/svgs/Mug4.svg", alt: "Tea mug spilling" },
    { key: "mug5", src: "/svgs/Mug5.svg", alt: "Tea mug spilling more" },
    { key: "mug6", src: "/svgs/Mug6.svg", alt: "Tea mug fully spilled" },
  ] as const;

  // Determine which mug to show based on state
  const getCurrentMugIndex = () => {
    if (mugState === "default") return 0; // Mug1
    if (mugState === "hover") return 1; // Mug2
    return currentMugIndex; // Mug3-6 during spilling/spilled
  };

  return (
        <section 
          id="about" 
          className="relative -mt-4 md:-mt-8 px-6 md:px-12 pb-16 md:pb-24 scroll-mt-24"
        >
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className={`rounded-2xl p-6 md:p-12 lg:p-16 ${showAboutCopy ? 'pb-12 md:pb-20 lg:pb-24' : 'pb-6 md:pb-8 lg:pb-10'} flex flex-col items-center gap-10 md:gap-16 relative`} style={{ backgroundColor: '#D9C8C0' }}>
          <motion.button
            type="button"
            className="relative block w-full md:w-full scale-110 md:scale-100"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            whileTap={{ scale: mugState === "spilled" || mugState === "spilling" ? 1 : 0.98 }}
            aria-label="Spill the tea"
            disabled={mugState === "spilling" || mugState === "spilled"}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "1280/431" }}
            >
              {mugStates.map((state, index) => {
                const isActive = getCurrentMugIndex() === index;
                return (
                  <motion.div
                    key={state.key}
                    className="absolute inset-0"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ 
                      duration: mugState === "spilling" ? 0.15 : 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src={state.src}
                      alt={state.alt}
                      width={1280}
                      height={431}
                      className="w-full h-full object-contain"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.button>

          <AnimatePresence>
            {showAboutCopy && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl text-center -mt-8 md:-mt-[100px]"
              >
              <h2 className="mb-4 font-bricolage font-bold text-[40px] md:text-[48px]">A bit about me</h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-manrope font-normal mb-8 md:mb-10">
                  I design products that feel clear, friendly and genuinely helpful. I&apos;m a big believer that small
                  moments - a smooth interaction, a tiny surprise, a well timed animation - can make a product feel
                  alive. I like solving messy problems, simplifying them until they make sense, and adding a touch of
                  personality along the way.
                </p>
                
                {/* Education List */}
                <div className="mb-6 md:mb-8">
                  <p className="text-sm md:text-base lg:text-lg font-manrope font-bold mb-2">
                    MA - VR and AR User Experience Design - Distinction
                  </p>
                  <p className="text-sm md:text-base lg:text-lg font-manrope font-bold">
                    BSc - Product Design - 2:1 Honours
                  </p>
                </div>

                {/* Awards List */}
                <div>
                  <p className="text-sm md:text-base lg:text-lg font-manrope font-bold mb-2">
                    Best Heritage Award - Nanjing Digital Heritage 2025
                  </p>
                  <p className="text-sm md:text-base lg:text-lg font-manrope font-bold mb-2">
                    Best AR Award - Goldsmiths University 2024
                  </p>
                  <p className="text-sm md:text-base lg:text-lg font-manrope font-bold">
                    Fred Mailerdette Product Design Breakthrough Award 2018
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
