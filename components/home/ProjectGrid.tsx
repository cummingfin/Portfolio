"use client";

import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <section 
      id="work" 
      className="px-6 md:px-12 pt-8 md:pt-12 pb-24 md:pb-32 scroll-mt-24"
    >
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full">
        {/* 3-column grid: squares = 1 col, rectangles = 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full project-grid-row">
          {projects.map((project, index) => {
            // Pattern from image:
            // Row 1 (0,1): rectangle (2 cols), square (1 col)
            // Row 2 (2,3): square (1 col), rectangle (2 cols)
            // Row 3 (4,5): rectangle (2 cols), square (1 col)
            const row = Math.floor(index / 2);
            const positionInRow = index % 2;
            // Even rows (0, 2): first is rectangle, second is square
            // Odd rows (1): first is square, second is rectangle
            const isSquare = (row % 2 === 0 && positionInRow === 1) || (row % 2 === 1 && positionInRow === 0);
            const colSpan = isSquare ? "md:col-span-1" : "md:col-span-2";
            
            return (
              <div key={project.slug} className={`w-full ${colSpan}`}>
                <ProjectCard 
                  project={project} 
                  isSquare={isSquare}
                  colorIndex={index}
                  priority={index < 4}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

