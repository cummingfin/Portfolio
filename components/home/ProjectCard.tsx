"use client";

import Link from "next/link";
import { Project } from "@/types/project";
import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";

interface ProjectCardProps {
  project: Project;
  isSquare?: boolean;
  priority?: boolean;
  appearance?: "default" | "editorial";
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

export default function ProjectCard({
  project,
  isSquare = false,
  priority = false,
  appearance = "default",
}: ProjectCardProps) {
  const mediaAspect = isSquare
    ? "aspect-[5/6]"
    : "aspect-[4/3] md:aspect-[8/3]";
  const isEditorial = appearance === "editorial";
  const palette = project.editorialPalette;
  const cardStyles = {
    "--card-surface": palette?.surface ?? "#EEE8DE",
    "--card-ink": palette?.ink ?? "#2B2B2B",
    "--card-divider": withOpacity(palette?.ink ?? "#2B2B2B", 0.14),
  } as CSSProperties;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block w-full cursor-none"
      aria-label={`View ${project.title} project`}
      style={cardStyles}
    >
      <motion.div
        whileTap={{ scale: 0.992 }}
        transition={{ duration: 0.2 }}
        className={`relative w-full overflow-hidden rounded-[6px] border transition-[border-radius,box-shadow] duration-500 ease-out group-hover:rounded-[32px] ${
          isEditorial
            ? "border-[var(--card-divider)] bg-[var(--card-surface)]"
            : "border-text/10 bg-section-bg"
        } ${mediaAspect}`}
      >
        {project.heroImage ? (
          <div
            className={`relative h-full w-full ${
              isEditorial
                ? "bg-[var(--card-surface)]"
                : "bg-section-bg"
            }`}
          >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className={`${project.slug === "recanvased" ? "object-contain md:object-cover" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-[1.018]`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            priority={priority}
          />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mb-2 font-manrope text-xl font-medium md:text-2xl">
              {project.title}
              </h3>
              <p className="text-sm text-text/60 md:text-base">
              {project.subtitle}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <div
        className={`mt-2 border-t pt-2 ${
          isEditorial
            ? "border-[var(--card-divider)] text-[var(--card-ink)]"
            : "border-text/16 text-text"
        }`}
      >
        <div>
          <h3
            className={`font-manrope text-[22px] font-medium leading-tight tracking-[-0.03em] md:text-[25px] ${
              isEditorial ? "" : "text-text"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`mt-1 line-clamp-2 max-w-2xl font-manrope text-sm leading-relaxed opacity-55 md:line-clamp-1 md:text-base ${
              isEditorial ? "" : "text-text"
            }`}
          >
            {project.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}
