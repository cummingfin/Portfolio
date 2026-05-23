"use client";

import { projects } from "@/lib/projects";
import { Project } from "@/types/project";
import ProjectCard from "@/components/home/ProjectCard";

interface MoreProjectsProps {
  currentProject: Project;
}

export default function MoreProjects({ currentProject }: MoreProjectsProps) {
  const getHomeGridShape = (projectSlug: string) => {
    const index = projects.findIndex((project) => project.slug === projectSlug);

    if (index === -1) {
      return {
        isSquare: false,
        colSpan: "md:col-span-2",
      };
    }

    const row = Math.floor(index / 2);
    const positionInRow = index % 2;
    const isSquare =
      (row % 2 === 0 && positionInRow === 1) ||
      (row % 2 === 1 && positionInRow === 0);

    return {
      isSquare,
      colSpan: isSquare ? "md:col-span-1" : "md:col-span-2",
    };
  };

  const currentIndex = projects.findIndex(
    (project) => project.slug === currentProject.slug
  );

  if (currentIndex === -1 || projects.length <= 1) {
    return null;
  }

  const otherProjects = projects.filter(
    (project) => project.slug !== currentProject.slug && project.slug !== "gallery"
  );

  const orderedProjects = projects
    .slice(currentIndex + 1)
    .concat(projects.slice(0, currentIndex))
    .filter(
      (project) =>
        project.slug !== currentProject.slug && project.slug !== "gallery"
    );

  let wideProject: Project | null = null;
  let smallProject: Project | null = null;

  for (const project of orderedProjects) {
    const { isSquare } = getHomeGridShape(project.slug);

    if (!isSquare && !wideProject) {
      wideProject = project;
    }

    if (isSquare && !smallProject) {
      smallProject = project;
    }

    if (wideProject && smallProject) {
      break;
    }
  }

  const featuredProjects = [wideProject, smallProject].filter(
    (project): project is Project => Boolean(project)
  );

  if (featuredProjects.length < 2) {
    return null;
  }

  return (
    <section className="px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-12">
      <div className="site-container">
        <div className="mb-8 md:mb-10">
          <p className="mb-3 font-manrope text-sm uppercase tracking-[0.28em] text-text/60">
            More Projects
          </p>
          <h2 className="font-bricolage text-[30px] font-bold text-text md:text-[38px]">
            Keep exploring
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 project-grid-row">
          {featuredProjects.map((project, index) => {
            const { isSquare, colSpan } = getHomeGridShape(project.slug);

            return (
              <div key={project.slug} className={`w-full ${colSpan}`}>
                <ProjectCard
                  project={project}
                  isSquare={isSquare}
                  colorIndex={projects.findIndex((item) => item.slug === project.slug)}
                  priority={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
