"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
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
              I build digital products that have to work in the real world. Before my Master&apos;s in AR and VR, I founded {" "}
              an eco-friendly {" "}
              <Link
                href="/work/donkeyjobs"
                data-project-name="DonkeyJobs"
                data-project-hover-label="DonkeyJobs"
                data-project-color-index="0"
                className="rounded-sm text-[#6B84C8] transition-colors hover:text-[#5D77BE] focus:outline-none focus:ring-2 focus:ring-text/20"
              >
                home maintenance company
              </Link>{" "}
              with more than a thousand clients and spent four years learning what users actually do, not what you hope they&apos;ll do.
            </p>
            <p className="w-full font-bricolage font-normal text-[21px] leading-[1.28] tracking-[-0.02em] text-text md:text-[26px] lg:text-[38px] xl:text-[44px]">
              Since then I&apos;ve designed {" "}
              <Link
                href="/work/recanvased"
                data-project-name="reCanvased"
                data-project-hover-label="reCanvased"
                data-project-color-index="2"
                className="rounded-sm text-[#B85C5C] transition-colors hover:text-[#A34E4E] focus:outline-none focus:ring-2 focus:ring-text/20"
              >
                AR marketplaces
              </Link>
              , {" "}
              <Link
                href="/work/learnllama"
                data-project-name="LearnLlama."
                data-project-hover-label="LearnLlama"
                data-project-color-index="1"
                className="rounded-sm text-[#B88A1B] transition-colors hover:text-[#9E7613] focus:outline-none focus:ring-2 focus:ring-text/20"
              >
                learning tools
              </Link>
              {" "}and web platforms and am currently leading the website redesign for the UK&apos;s largest independent {" "}
              <Link
                href="/work/panmure-liberum"
                data-project-name="Panmure Liberum"
                data-project-hover-label="Panmure Liberum"
                data-project-color-index="0"
                className="rounded-sm text-[#1F6A44] transition-colors hover:text-[#185637] focus:outline-none focus:ring-2 focus:ring-text/20"
              >
                investment bank
              </Link>
              . I&apos;m interested in products that are useful, sharp, and built with enough care that people trust them.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
