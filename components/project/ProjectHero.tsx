"use client";

import { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <div className="bg-section-bg rounded-3xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16">
      <div className="text-center">
        {project.logo && (
          <div className="mb-6">
            {/* Logo would go here if provided */}
          </div>
        )}
        <h1 className="mb-4">{project.title}</h1>
        <p className="text-lg md:text-xl text-gray-600">{project.subtitle}</p>
      </div>
    </div>
  );
}

