"use client";

import { Project } from "@/types/project";

interface ComingSoonCaseStudyProps {
  project: Project;
}

export default function ComingSoonCaseStudy({
  project,
}: ComingSoonCaseStudyProps) {
  return (
    <section className="bg-section-bg px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="border-t border-text/20 pt-7 md:pt-8">
          <p className="mb-3 font-manrope text-sm uppercase tracking-[0.28em] text-text/60">
            Case Study
          </p>
          <h2 className="mb-4 font-bricolage text-[30px] font-bold text-text md:text-[38px]">
            Case study coming soon
          </h2>
          <p className="max-w-3xl font-manrope text-lg leading-relaxed text-text/90 md:text-xl">
            {project.title} is still in progress. A fuller case study will be
            added once the project is complete and ready to show properly.
          </p>
        </div>
      </div>
    </section>
  );
}
