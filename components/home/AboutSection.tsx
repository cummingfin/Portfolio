"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.58, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.08, 0.58, 1], [88, 0, 0, -120]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 mt-0 scroll-mt-24 bg-background pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28"
    >
      <div className="site-container">
        <motion.div
          style={{ opacity, y }}
          className="w-full will-change-transform"
        >
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
            <p className="w-full font-bricolage font-normal text-[21px] leading-[1.28] tracking-[-0.02em] text-text md:text-[26px] lg:text-[38px] xl:text-[44px]">
              I build digital products that have to work in the real world. Before my Master&apos;s in AR and VR, I founded <span className="text-text">DonkeyJobs</span> and spent four years learning what users actually do, not what you hope they&apos;ll do.
            </p>
            <p className="w-full font-bricolage font-normal text-[21px] leading-[1.28] tracking-[-0.02em] text-text md:text-[26px] lg:text-[38px] xl:text-[44px]">
              Since then I&apos;ve designed AR marketplaces, learning tools and web platforms and am currently leading the website redesign for <span className="text-text">Panmure Liberum</span>, the UK&apos;s largest independent investment bank. I&apos;m interested in products that are useful, sharp, and built with enough care that people trust them.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
