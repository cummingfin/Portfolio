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
    <section className="bg-section-bg px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 md:mb-12">
          <p className="mb-3 font-manrope text-sm uppercase tracking-[0.28em] text-text/60">
            Case Study
          </p>
          <h2 className="max-w-3xl font-bricolage text-[30px] font-bold text-text md:text-[38px]">
            The thinking behind {project.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="border-t border-text/20 pt-7 md:pt-8 md:grid md:grid-cols-[80px_minmax(0,1fr)] md:gap-8"
            >
              <p className="mb-3 font-manrope text-sm uppercase tracking-[0.28em] text-text/65 md:mb-0">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="mb-4 font-bricolage text-[30px] font-bold text-text md:text-[34px]">
                  {section.title}
                </h3>
                <p className="max-w-[42rem] font-manrope text-lg leading-relaxed text-text/92 md:text-xl">
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
