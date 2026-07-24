"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function HeroOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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

    const pullDuration = shouldReduceMotion ? 0 : 240;
    const litDuration = shouldReduceMotion ? 100 : 650;
    const fadeDuration = shouldReduceMotion ? 150 : 700;

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
        }, fadeDuration);
      }, litDuration);
    }, pullDuration);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePull();
    }
  };

  if (!mounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.7 }}
          className="fixed inset-0 bg-[#2C2C2C] z-40 flex flex-col items-center justify-center"
        >
          {/* Lightbulb with cord - centered, matching Hero position exactly */}
          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
            {/* Keep the fixture visible so it lines up with the hero underneath. */}
            <div className="h-[clamp(12rem,32svh,27.375rem)] w-0.5 bg-[#D8D4CC]/35" />
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

          {/* Pull cord - close enough to the bulb to read as one fixture. */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Turn on the light and enter the portfolio"
            className="absolute left-[calc(50%+52px)] top-0 flex -translate-x-1/2 touch-none flex-col items-center outline-none md:left-[calc(50%+82px)]"
            onClick={handlePull}
            onKeyDown={handleKeyDown}
            drag={isPulling || shouldReduceMotion ? false : "y"}
            dragConstraints={{ top: 0, bottom: 42 }}
            dragElastic={0.08}
            dragMomentum={false}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (info.offset.y >= 28) handlePull();
            }}
            animate={{
              y: isPulling ? 24 : 0,
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
          >
            <div className="h-[56svh] w-px bg-[#D8D4CC]/70 md:h-[60vh]" />
            <div className="-mt-px flex h-14 w-14 items-start justify-center">
              <Image
                src="/svgs/CordEnd.svg"
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="block h-7 w-7 drop-shadow-[0_5px_10px_rgba(0,0,0,0.22)]"
              />
            </div>
            <p className="-mt-3 font-manrope text-sm font-medium text-[#EEE8DE]/70">
              Pull to enter
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
