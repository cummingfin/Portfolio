"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const aboutCopy =
  "I build digital products that have to work in the real world. Before completing a Master’s in AR and VR, I founded an eco-friendly home maintenance company and grew it to more than a thousand clients. I recently completed the end-to-end design for the UK’s largest independent investment bank, working across UX, interface design, front-end development, and motion.";

function ScrollWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.82;
  const opacity = useTransform(progress, [start, Math.min(start + 0.14, 1)], [0.2, 1]);

  return (
    <motion.span style={{ opacity }}>
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const words = aboutCopy.split(" ");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 min-h-[175vh] scroll-mt-24 bg-background"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center py-24 md:py-28">
        <div className="home-wide-container w-full">
          <p
            className="max-w-[34ch] font-manrope text-[27px] font-normal leading-[1.2] tracking-[-0.04em] text-text md:max-w-[30ch] md:text-[42px] lg:text-[56px]"
            aria-label={aboutCopy}
          >
            {words.map((word, index) => (
              <ScrollWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={words.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
