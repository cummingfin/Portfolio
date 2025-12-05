"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const [angle, setAngle] = useState(0); // Current angle in radians
  const [angularVelocity, setAngularVelocity] = useState(0); // Angular velocity in rad/s
  
  const cordLength = 192; // h-48 = 192px (mobile)
  const cordLengthMd = 288; // h-72 = 288px (desktop)
  
  // Physics constants
  const dampingFactor = 0.92; // Damping for natural decay
  const maxAngle = Math.PI / 6; // ~30 degrees max swing
  const impulseStrength = 0.3; // How much velocity to add on hit (increased for more movement)
  const gravityStrength = 15; // Restoring force to bring back to center (increased for faster return)
  
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightbulbRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(0);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);

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
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !lightbulbRef.current) return;
    
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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      if (!containerRef.current || !lightbulbRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const anchorX = containerRect.left + containerRect.width / 2;
      const anchorY = containerRect.top;
      
      const cursorAngle = Math.atan2(touch.clientX - anchorX, touch.clientY - anchorY);
      const clampedAngle = Math.max(-maxAngle, Math.min(maxAngle, cursorAngle));
      
      const currentAngle = angleRef.current;
      const angleDiff = clampedAngle - currentAngle;
      const impulse = angleDiff * impulseStrength * 10; // Increased for more visible effect
      
      velocityRef.current += impulse;
    }
  };

  // Physics simulation loop - simple pendulum with damping
  useEffect(() => {
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
  }, []);

  // Convert angle to degrees for rotation
  const cordRotation = (angle * 180) / Math.PI;
  // Lightbulb rotation based on velocity (rotates from top where it meets cord)
  const lightbulbRotation = angularVelocity * 15; // Rotation multiplier

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-32 pb-4 relative">
      {/* Lightbulb with cord - centered, cord always at top, stretching down */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
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
            <div className="w-0.5 bg-text h-48 md:h-72 2xl:h-[438px]" />
            {/* Lightbulb - positioned at end of cord */}
            <motion.div
              ref={lightbulbRef}
              className="relative -mt-[1px] cursor-pointer touch-none origin-top"
              style={{
                rotate: `${lightbulbRotation}deg`,
              }}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
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
                className="block w-[40px] h-auto md:w-[54px]"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero text - centered, positioned lower, moves up after lightbulb */}
          <motion.div 
            className="flex flex-col items-center justify-center flex-1 text-center mt-24 md:mt-32 w-full"
        style={{
          y: textY,
          opacity: textOpacity
        }}
      >
        <h1 className="mb-2 font-bricolage font-bold text-[64px] leading-tight text-center">
          Hi I&apos;m Fin
        </h1>
            <h2 className="mb-8 max-w-2xl font-bricolage font-medium text-[40px] text-center mx-auto">
          I love design and want to work with people who feel the&nbsp;same
        </h2>
      </motion.div>
    </section>
  );
}
