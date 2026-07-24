"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const [angle, setAngle] = useState(0); // Current angle in radians
  const [angularVelocity, setAngularVelocity] = useState(0); // Angular velocity in rad/s
  const shouldReduceMotion = useReducedMotion();
  
  // Physics constants
  const dampingFactor = 0.92; // Damping for natural decay
  const maxAngle = Math.PI / 6; // ~30 degrees max swing
  const impulseStrength = 0.3; // How much velocity to add on hit (increased for more movement)
  const gravityStrength = 15; // Restoring force to bring back to center (increased for faster return)
  
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightbulbRef = useRef<HTMLButtonElement>(null);
  const lastTimeRef = useRef<number>(0);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const tapDirectionRef = useRef(1);

  // Track scroll progress - starts at 0 when hero is fully visible, progresses as user scrolls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  // Lightbulb and cord move up first (0.5-0.65 scroll progress) - only starts when scrolling down
  const lightbulbY = useTransform(scrollYProgress, [0.5, 0.65], [0, -150]);
  const lightbulbOpacity = useTransform(scrollYProgress, [0.5, 0.65], [1, 0]);

  // Title and subtitle move up after (0.6-0.75 scroll progress)
  const textY = useTransform(scrollYProgress, [0.6, 0.75], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);

  // Handle mouse move over lightbulb - apply impulse in direction of cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !containerRef.current || !lightbulbRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const anchorX = containerRect.left + containerRect.width / 2;
    const anchorY = containerRect.top;
    
    // Calculate angle from anchor to cursor
    const cursorAngle = Math.atan2(e.clientX - anchorX, e.clientY - anchorY);
    const clampedAngle = Math.max(-maxAngle, Math.min(maxAngle, cursorAngle));
    
    // Apply impulse in the direction of the cursor
    const currentAngle = angleRef.current;
    const angleDiff = clampedAngle - currentAngle;
    const impulse = angleDiff * impulseStrength * 10; // Increased for more visible effect
    
    velocityRef.current += impulse;
  };

  // A tap gives the bulb a predictable alternating nudge on touch devices.
  const handleBulbTap = () => {
    if (shouldReduceMotion) return;

    velocityRef.current += 2.2 * tapDirectionRef.current;
    tapDirectionRef.current *= -1;
  };

  // Physics simulation loop - simple pendulum with damping
  useEffect(() => {
    if (shouldReduceMotion) {
      angleRef.current = 0;
      velocityRef.current = 0;
      setAngle(0);
      setAngularVelocity(0);
      return;
    }

    let animationFrame: number;
    lastTimeRef.current = performance.now();

    const update = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.02);
      lastTimeRef.current = currentTime;

      const currentAngle = angleRef.current;
      const currentVelocity = velocityRef.current;

      // Apply restoring force (gravity) to bring back to center
      const restoringForce = -currentAngle * gravityStrength;
      
      // Apply damping and restoring force
      const newVelocity = (currentVelocity * dampingFactor) + (restoringForce * deltaTime);
      
      // Update angle
      let newAngle = currentAngle + newVelocity * deltaTime;
      
      // Limit angle to prevent excessive swing
      newAngle = Math.max(-maxAngle, Math.min(maxAngle, newAngle));
      
      // Update refs
      angleRef.current = newAngle;
      velocityRef.current = newVelocity;
      
      // Update state for rendering
      setAngle(newAngle);
      setAngularVelocity(newVelocity);

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [shouldReduceMotion]);

  // Convert angle to degrees for rotation
  const cordRotation = (angle * 180) / Math.PI;
  // Lightbulb rotation based on velocity (rotates from top where it meets cord)
  const lightbulbRotation = angularVelocity * 15; // Rotation multiplier

  return (
    <section ref={heroRef} className="relative flex min-h-[100svh] flex-col pt-28 md:pt-32">
      {/* Lightbulb with cord - centered, cord always at top, stretching down */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <motion.div 
          ref={containerRef}
          className="flex flex-col items-center"
          style={{
            y: lightbulbY,
            opacity: lightbulbOpacity
          }}
        >
          {/* Container that rotates with the cord */}
          <motion.div
            className="origin-top flex flex-col items-center"
            style={{
              rotate: `${cordRotation}deg`,
            }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 20,
            }}
          >
            {/* Cord line */}
            <div className="h-[clamp(12rem,32svh,27.375rem)] w-0.5 bg-text" />
            {/* Lightbulb - positioned at end of cord */}
            <motion.button
              type="button"
              ref={lightbulbRef}
              aria-label="Swing the lightbulb"
              className="relative -mt-[1px] flex min-h-14 min-w-14 origin-top touch-manipulation items-start justify-center border-0 bg-transparent p-0"
              style={{
                rotate: `${lightbulbRotation}deg`,
              }}
              onMouseMove={handleMouseMove}
              onClick={handleBulbTap}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              transition={{
                type: "spring",
                stiffness: 1000,
                damping: 20,
              }}
            >
              <Image
                src="/svgs/Lightbulb.svg"
                alt="Lightbulb"
                width={54}
                height={86}
                className="block w-[40px] md:w-[54px] h-auto"
                unoptimized
                priority
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Keep the lightbulb and message on one central axis. */}
      <motion.div
        className="home-wide-container flex flex-1 flex-col items-center justify-end pb-8 pt-56 text-center md:pb-10 md:pt-72"
        style={{
          y: textY,
          opacity: textOpacity
        }}
      >
        <div className="flex max-w-6xl flex-col items-center">
          <p className="mb-5 font-manrope text-sm font-semibold text-text/55 md:text-base">
            Fin Cumming · Digital designer · London
          </p>
          <h1 className="max-w-[14ch] font-manrope text-[clamp(44px,6.4vw,104px)] font-medium leading-[0.94] tracking-[-0.06em] text-text">
            I design digital products with clarity, character, and intent.
          </h1>
        </div>
        <div className="mt-12 grid w-full max-w-6xl grid-cols-2 border-t border-text/20 pt-4 text-left font-manrope text-xs text-text/55 md:mt-16 md:text-sm">
          <span>Web · interaction · motion</span>
          <span className="text-right">Scroll to explore selected work</span>
        </div>
      </motion.div>
    </section>
  );
}
