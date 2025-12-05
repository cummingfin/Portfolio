"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function HeroOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if overlay has been dismissed before
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("overlayDismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    }
  }, []);

  // Prevent scrolling when overlay is visible
  useEffect(() => {
    if (isVisible && !isFading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible, isFading]);

  const handlePull = () => {
    if (isPulling || isFading || !mounted) return;
    
    setIsPulling(true);
    setTimeout(() => {
      // Switch to lit lightbulb
      setIsLit(true);
      // Wait 1 second with lit bulb, then fade out
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          // Save to localStorage that overlay has been dismissed
          if (typeof window !== "undefined") {
            localStorage.setItem("overlayDismissed", "true");
            // Dispatch custom event to notify Nav component
            window.dispatchEvent(new Event("overlayDismissed"));
          }
        }, 1000);
      }, 1000);
    }, 300);
  };

  if (!mounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-[#2C2C2C] z-40 flex flex-col items-center justify-center"
        >
          {/* Lightbulb with cord - centered, matching Hero position exactly */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Cord line - goes all the way to top, matching Hero height, overlay color */}
            <div className="w-0.5 bg-[#2C2C2C] h-48 md:h-72 2xl:h-[438px]" />
            {/* Lightbulb - switches from unlit to lit */}
            <div className="relative -mt-[1px]">
              <AnimatePresence mode="wait">
                {isLit ? (
                  <motion.div
                    key="lit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/svgs/OverlayLightbulb2.svg"
                      alt="Lightbulb lit"
                      width={54}
                      height={86}
                      className="block w-[40px] md:w-[54px] h-auto"
                      unoptimized
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unlit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/svgs/OverlayLightbulb1.svg"
                      alt="Lightbulb unlit"
                      width={54}
                      height={86}
                      className="block w-[40px] md:w-[54px] h-auto"
                      unoptimized
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Pull cord - positioned on right */}
          <motion.div
            className="absolute right-[10%] md:right-[15%] top-0 flex flex-col items-center cursor-pointer touch-none"
            onClick={handlePull}
            onTouchStart={handlePull}
            animate={{
              y: isPulling ? 20 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Cord line - goes all the way to top, connects to cord end */}
            <div className="w-0.5 bg-white h-[55vh] md:h-[60vh]" />
            {/* Cord end SVG - directly connected to cord */}
            <div className="relative -mt-[1px]">
              <Image
                src="/svgs/CordEnd.svg"
                alt="Cord end"
                width={23}
                height={23}
                className="block"
              />
            </div>
            <h1 className="text-white text-2xl md:text-3xl mt-2 font-bricolage font-bold">Pull</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

