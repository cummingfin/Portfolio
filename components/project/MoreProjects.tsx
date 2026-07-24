"use client";

import { projects } from "@/lib/projects";
import { Project } from "@/types/project";
import ProjectCard from "@/components/home/ProjectCard";
import type { CSSProperties } from "react";

interface MoreProjectsProps {
  currentProject: Project;
}

function withOpacity(color: string, opacity: number) {
  if (/^#[0-9a-f]{6}$/i.test(color)) {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");

    return `${color}${alpha}`;
  }

  return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
}

export default function MoreProjects({ currentProject }: MoreProjectsProps) {
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentProject.slug
  );

  if (currentIndex === -1 || projects.length <= 1) {
    return null;
  }

  const orderedProjects = projects
    .slice(currentIndex + 1)
    .concat(projects.slice(0, currentIndex))
    .filter(
      (project) =>
        project.slug !== currentProject.slug && project.slug !== "gallery"
    );

  const featuredProjects = orderedProjects.slice(0, 3);

  if (featuredProjects.length < 3) {
    return null;
  }

  const palette = currentProject.editorialPalette;
  const sectionStyles = palette
    ? ({
        backgroundColor: palette.page,
        color: palette.ink,
        "--more-projects-divider": withOpacity(palette.ink, 0.14),
      } as CSSProperties)
    : undefined;

  return (
    <section
      className="border-t border-[var(--more-projects-divider)] py-16 font-manrope md:py-24 lg:py-28"
      style={sectionStyles}
    >
      <div className="project-wide-container">
        <div className="mb-10 md:mb-14 lg:mb-16">
          <p className="text-sm opacity-55 md:text-base">More projects</p>
          <h2 className="mt-3 text-[clamp(42px,6vw,82px)] font-medium leading-[1] tracking-[-0.05em] md:whitespace-nowrap">
            Continue exploring
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 border-t border-[var(--more-projects-divider)] pt-8 md:grid-cols-3 md:gap-x-8 md:pt-10">
          {featuredProjects.map((project) => {
            return (
              <div key={project.slug} className="w-full">
                <ProjectCard
                  project={project}
                  isSquare
                  priority={false}
                  appearance="editorial"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
