"use client";

import { homepageProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <section 
      id="work" 
      className="scroll-mt-24 pb-24 pt-8 md:pb-32 md:pt-12 2xl:pb-40"
    >
      <div className="home-wide-container">
        <div className="mb-10 flex items-end justify-between gap-8 border-t border-text/20 pt-6 md:mb-14 md:pt-8">
          <h2 className="font-manrope text-[36px] font-medium leading-none tracking-[-0.045em] text-text md:text-[52px]">
            Selected work
          </h2>
          <p className="hidden font-manrope text-sm text-text/50 md:block">
            Design · Build · Creative technology
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 2xl:gap-x-10 2xl:gap-y-20">
          {homepageProjects.map((project, index) => {
            return (
              <div key={project.slug} className="w-full">
                <ProjectCard 
                  project={project} 
                  isSquare
                  priority={index < 2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
