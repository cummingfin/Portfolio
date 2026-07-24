"use client";

import { Project } from "@/types/project";

interface ProjectCaseStudyTextProps {
  project: Project;
}

export default function ProjectCaseStudyText({
  project,
}: ProjectCaseStudyTextProps) {
  const sections = project.caseStudyTextSections ?? [];

  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="bg-section-bg px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-12">
          <p className="mb-4 font-manrope text-lg text-text/55">
            A closer look at the work
          </p>
          <h2 className="max-w-4xl font-bricolage text-[34px] font-bold leading-[1.05] tracking-[-0.04em] text-text md:text-[48px]">
            {project.title}: from idea to outcome
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:gap-0">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="border-t border-text/20 py-7 first:border-t-0 first:pt-0 md:grid md:grid-cols-[minmax(180px,0.38fr)_minmax(0,1fr)] md:gap-12 md:py-9"
            >
              <div className="mb-4 md:mb-0">
                <p className="mb-2 font-manrope text-sm text-text/55">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-bricolage text-[26px] font-bold leading-[1.05] tracking-[-0.03em] text-text md:text-[32px]">
                  {section.title}
                </h3>
              </div>
              <div>
                <p className="max-w-[48rem] font-manrope text-lg leading-[1.45] text-text/88 md:text-xl">
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
