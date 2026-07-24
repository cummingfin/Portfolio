"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { videoPoster } from "@/lib/media";
import {
  CaseStudySection,
  EditorialPalette,
  Project,
} from "@/types/project";

interface EditorialProjectDetailsProps {
  project: Project;
}

type FrameType = NonNullable<CaseStudySection["frameType"]>;
type MediaType = NonNullable<CaseStudySection["mediaType"]>;

const fallbackPalette: EditorialPalette = {
  page: "#EFE9DE",
  surface: "#F7F4EF",
  soft: "#D9DDD4",
  primary: "#153D29",
  onPrimary: "#F5F1E9",
  accent: "#BFCBB8",
  onAccent: "#153D29",
  ink: "#242422",
  mediaField: "#D9D5CC",
};

function withOpacity(color: string, opacity: number) {
  if (/^#[0-9a-f]{6}$/i.test(color)) {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");

    return `${color}${alpha}`;
  }

  return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
}

function EditorialMedia({
  src,
  label,
  mediaType,
  frameType,
  priority = false,
}: {
  src: string;
  label: string;
  mediaType: MediaType;
  frameType: FrameType;
  priority?: boolean;
}) {
  const isVideo = mediaType === "video";

  if (frameType === "phone" || frameType === "tablet") {
    const frameClass =
      frameType === "phone"
        ? "aspect-[9/19] max-w-[240px] rounded-[28px] border-[6px] md:max-w-[290px] md:rounded-[36px] md:border-[8px]"
        : "aspect-[1206/1716] max-w-[350px] rounded-[26px] border-[6px] md:max-w-[470px] md:rounded-[34px] md:border-[8px]";

    return (
      <div className="flex w-full items-center justify-center py-4 md:py-8">
        <div
          className={`relative w-full overflow-hidden border-text bg-black shadow-[0_24px_55px_rgba(27,35,29,0.14)] ${frameClass}`}
        >
          {isVideo ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={videoPoster(src)}
              aria-label={label}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={src}
              alt={label}
              fill
              priority={priority}
              className="object-cover"
              sizes={frameType === "phone" ? "300px" : "480px"}
            />
          )}
        </div>
      </div>
    );
  }

  if (frameType === "physical") {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] border border-black/10 bg-[var(--project-media)]">
        {isVideo ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={videoPoster(src)}
            aria-label={label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={label}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 84vw"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[6px] border border-black/10 bg-[var(--project-soft)] shadow-[0_24px_70px_rgba(27,35,29,0.13)]">
      {isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={videoPoster(src)}
          aria-label={label}
          className="block h-auto w-full scale-[1.005]"
        />
      ) : (
        <div className="relative aspect-[16/10]">
          <Image
            src={src}
            alt={label}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 84vw"
          />
        </div>
      )}
    </div>
  );
}

export default function EditorialProjectDetails({
  project,
}: EditorialProjectDetailsProps) {
  const reduceMotion = useReducedMotion();
  const chapters = project.caseStudySections ?? [];
  const process = project.caseStudyTextSections ?? [];
  const depth = project.caseStudyDepth ?? "feature";
  const defaultFrame = project.detailsMediaType ?? "physical";
  const palette = project.editorialPalette ?? fallbackPalette;
  const heroSrc =
    project.detailsVideo ?? project.detailsHeroImage ?? project.heroImage;
  const heroType: MediaType = project.detailsVideo ? "video" : "image";
  const showProcess = process.length > 0 && depth !== "note";
  const isCompact = depth === "compact";
  const projectStyles = {
    "--project-page": palette.page,
    "--project-surface": palette.surface,
    "--project-soft": palette.soft,
    "--project-primary": palette.primary,
    "--project-on-primary": palette.onPrimary,
    "--project-accent": palette.accent,
    "--project-on-accent": palette.onAccent,
    "--project-ink": palette.ink,
    "--project-media": palette.mediaField,
    "--project-divider": withOpacity(palette.ink, 0.14),
    "--project-divider-inverse": withOpacity(palette.page, 0.22),
  } as CSSProperties;
  const chapterStyles = [
    {
      background: palette.primary,
      color: palette.onPrimary,
      divider: withOpacity(palette.onPrimary, 0.2),
    },
    {
      background: palette.surface,
      color: palette.ink,
      divider: withOpacity(palette.ink, 0.14),
    },
    {
      background: palette.soft,
      color: palette.ink,
      divider: withOpacity(palette.ink, 0.14),
    },
    {
      background: palette.accent,
      color: palette.onAccent,
      divider: withOpacity(palette.ink, 0.16),
    },
  ];

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 34 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section
      className="overflow-hidden bg-[var(--project-page)] font-manrope text-[var(--project-ink)]"
      style={projectStyles}
    >
      <header className="project-wide-container pb-14 pt-8 md:pb-20 md:pt-12 lg:pb-24 lg:pt-16">
        <div className="mb-9 flex items-end justify-between gap-6 border-b border-[var(--project-divider)] pb-5 md:mb-12">
          <p className="text-sm opacity-60 md:text-base">
            {project.projectDiscipline ?? "Selected project"}
          </p>
          <p className="max-w-[55%] text-right text-sm opacity-60 md:text-base">
            {project.projectServices}
          </p>
        </div>

        <motion.div {...reveal}>
          <h1 className="font-manrope text-[clamp(48px,8.2vw,132px)] font-medium leading-[0.92] tracking-[-0.07em] lg:whitespace-nowrap">
            {project.detailsTitle ?? project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-snug opacity-70 md:mt-7 md:text-3xl">
            {project.detailsSubtitle}
          </p>
        </motion.div>

        {heroSrc && (
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 }}
            className="mt-10 md:mt-16"
          >
            <EditorialMedia
              src={heroSrc}
              label={`${project.title} project overview`}
              mediaType={heroType}
              frameType={defaultFrame}
              priority
            />
          </motion.div>
        )}
      </header>

      <section
        className="border-y border-[var(--project-divider)]"
        style={{ backgroundColor: palette.surface }}
      >
        <motion.div
          {...reveal}
          className="project-wide-container grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.34fr)] lg:gap-20 lg:py-28"
        >
          <p className="max-w-[24ch] text-[34px] font-normal leading-[1.06] tracking-[-0.045em] md:text-[52px] lg:text-[68px]">
            {project.editorialStatement ?? project.problem}
          </p>
          <div className="flex flex-col justify-end border-t border-[var(--project-divider)] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-base leading-relaxed opacity-70 md:text-lg">
              {project.detailsText}
            </p>
          </div>
        </motion.div>
      </section>

      {chapters.map((chapter, index) => {
        const style = chapterStyles[index % chapterStyles.length];
        const mediaFirst = index % 2 === 1;
        const frameType = chapter.frameType ?? defaultFrame;
        const mediaType = chapter.mediaType ?? "image";
        const isDevice = frameType === "phone" || frameType === "tablet";
        const layout = isDevice
          ? "lg:grid-cols-[minmax(260px,0.42fr)_minmax(0,0.58fr)]"
          : "lg:grid-cols-[minmax(260px,0.36fr)_minmax(0,0.64fr)]";

        return (
          <section
            key={chapter.id}
            id={chapter.id}
            style={{
              backgroundColor: style.background,
              color: style.color,
              "--section-divider": style.divider,
            } as CSSProperties}
            className={`${
              isCompact ? "py-14 md:py-20 lg:py-24" : "py-16 md:py-24 lg:py-28"
            }`}
          >
            <motion.div
              {...reveal}
              className={`project-wide-container grid items-center gap-10 md:gap-14 lg:gap-20 ${layout}`}
            >
              <div
                className={`flex h-full flex-col justify-between ${
                  mediaFirst ? "lg:order-2" : ""
                }`}
              >
                <div>
                  <div
                    className="mb-8 flex items-center justify-between gap-6 border-b border-[var(--section-divider)] pb-4"
                  >
                    <p className="text-sm opacity-60">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="text-right text-sm opacity-60">
                      {chapter.caption}
                    </p>
                  </div>
                  <h2 className="max-w-[12ch] text-[42px] font-medium leading-[1.03] tracking-[-0.05em] md:text-[58px] lg:text-[68px]">
                    {chapter.title}
                  </h2>
                </div>
                <p
                  className="mt-9 max-w-md text-lg leading-relaxed opacity-70 md:text-xl"
                >
                  {chapter.text}
                </p>
              </div>

              {chapter.mediaSrc && (
                <div
                  className={mediaFirst ? "lg:order-1" : ""}
                >
                  <EditorialMedia
                    src={chapter.mediaSrc}
                    label={chapter.mediaAlt ?? chapter.title}
                    mediaType={mediaType}
                    frameType={frameType}
                  />
                </div>
              )}
            </motion.div>
          </section>
        );
      })}

      {showProcess && (
        <section
          id="process"
          className="py-16 md:py-24 lg:py-28"
          style={{
            backgroundColor: palette.ink,
            color: palette.page,
          }}
        >
          <div className="project-wide-container">
            <motion.div
              {...reveal}
              className="mb-14 grid gap-6 border-b border-[var(--project-divider-inverse)] pb-8 md:mb-20 lg:grid-cols-2"
            >
              <p className="text-base opacity-55">Process</p>
              <h2 className="max-w-[14ch] text-[42px] font-medium leading-[1.03] tracking-[-0.05em] md:text-[58px] lg:text-[72px]">
                {isCompact
                  ? "What shaped the work."
                  : "From insight to a working system."}
              </h2>
            </motion.div>

            <div
              className={`grid border-t border-[var(--project-divider-inverse)] ${
                process.length >= 4
                  ? "md:grid-cols-2 xl:grid-cols-4"
                  : "md:grid-cols-3"
              }`}
            >
              {process.map((item, index) => (
                <motion.article
                  key={item.id}
                  {...reveal}
                  transition={{
                    ...reveal.transition,
                    delay: reduceMotion ? 0 : index * 0.06,
                  }}
                  className="border-b border-[var(--project-divider-inverse)] py-8 md:min-h-[290px] md:border-r md:px-7 first:pl-0 last:border-r-0 xl:px-8"
                >
                  <p className="mb-12 text-sm opacity-45">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mb-5 text-[28px] font-medium leading-tight tracking-[-0.025em] md:text-[32px]">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed opacity-60">
                    {item.text}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="outcome"
        className="py-16 md:py-24 lg:py-28"
        style={{
          backgroundColor: palette.primary,
          color: palette.onPrimary,
        }}
      >
        <motion.div
          {...reveal}
          className="project-wide-container grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20"
        >
          <p className="text-base opacity-55">Outcome</p>
          <p className="max-w-[23ch] text-[38px] font-normal leading-[1.06] tracking-[-0.045em] md:text-[58px] lg:text-[72px]">
            {project.outcome ?? project.solution ?? project.problem}
          </p>
        </motion.div>
      </section>
    </section>
  );
}
