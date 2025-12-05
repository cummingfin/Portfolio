"use client";

import Link from "next/link";
import { Project } from "@/types/project";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  isSquare?: boolean;
  colorIndex?: number;
  priority?: boolean;
}

export default function ProjectCard({ project, isSquare = false, colorIndex = 0, priority = false }: ProjectCardProps) {
  // Mobile: always square (1:1 aspect ratio)
  // Desktop: 
  //   - Square: 4:3 aspect ratio (shorter height, determines row height)
  //   - Rectangle: matches square's height (via grid), 2x width (via column span)
  // CSS Grid ensures items in same row have same height
  // Rectangle should NOT use aspect-ratio on desktop - let grid control height
  const rectangleClass = !isSquare ? 'md:project-rectangle' : '';
  const squareAspectClass = isSquare ? 'md:aspect-[4/3]' : '';
  
  return (
    <Link href={`/work/${project.slug}`} className="block w-full h-full">
      <motion.div
        data-project-name={project.title}
        data-project-color-index={colorIndex}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={`bg-section-bg rounded-2xl overflow-hidden w-full h-full cursor-none shadow-sm hover:shadow-md transition-shadow aspect-square ${squareAspectClass} ${rectangleClass} project-card relative`}
        aria-label={`View ${project.title} project`}
      >
        {project.heroImage ? (
          <div className="relative w-full h-full bg-section-bg">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-contain md:object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              priority={priority}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 absolute inset-0">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bricolage font-medium mb-2">
                {project.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {project.subtitle}
              </p>
            </div>
          </div>
        )}
        {/* Floating pill label */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center rounded-full bg-black/80 text-white text-xs md:text-sm font-manrope tracking-wide px-3 py-1">
            {project.title}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

