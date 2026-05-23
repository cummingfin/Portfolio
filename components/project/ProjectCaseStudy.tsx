"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Project } from "@/types/project";

interface ProjectCaseStudyProps {
  project: Project;
}

export default function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps) {
  const sections = project.caseStudySections ?? [];
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const defaultFrameType = project.detailsMediaType ?? "phone";
  const isDesktopMediaProject = defaultFrameType === "desktop";

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const viewportFocus = window.innerHeight * 0.42;
      const positions = sections
        .map((section) => {
          const element = sectionRefs.current[section.id];
          if (!element) {
            return null;
          }

          const rect = element.getBoundingClientRect();
          return {
            id: section.id,
            distance: Math.abs(rect.top + rect.height / 2 - viewportFocus),
          };
        })
        .filter(
          (
            item
          ): item is {
            id: string;
            distance: number;
          } => Boolean(item)
        );

      if (positions.length === 0) {
        return;
      }

      const currentDistance =
        positions.find((item) => item.id === activeId)?.distance ??
        Number.POSITIVE_INFINITY;
      const closest = positions.sort((a, b) => a.distance - b.distance)[0];

      if (closest && closest.id !== activeId && closest.distance + 60 < currentDistance) {
        setActiveId(closest.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [activeId, sections]);

  if (sections.length === 0) {
    return null;
  }

  const activeSection =
    sections.find((section) => section.id === activeId) ?? sections[0];

  const renderCaseStudyMedia = (section: (typeof sections)[number]) => {
    const frameType = section.frameType ?? defaultFrameType;
    const isVideo = section.mediaType === "video" && Boolean(section.mediaSrc);
    const isImage = section.mediaType === "image" && Boolean(section.mediaSrc);

    if (!isVideo && !isImage) {
      return (
        <div className="flex w-full items-center justify-center rounded-[24px] border border-text/12 bg-[linear-gradient(135deg,#E9E1D5_0%,#D6C8B4_100%)] px-8 py-16 text-center shadow-lg">
          <p className="font-manrope text-base text-text/55">Supporting visual</p>
        </div>
      );
    }

    if (frameType === "desktop") {
      if (isVideo) {
        return (
          <div className="w-full overflow-hidden rounded-[14px] md:rounded-[18px] lg:rounded-[20px] border border-text/10 shadow-[0_18px_40px_rgba(43,43,43,0.12)]">
            <video
              src={section.mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="block h-auto w-full scale-[1.01] object-contain"
            />
          </div>
        );
      }

      return (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] md:rounded-[18px] lg:rounded-[20px] border border-text/10 shadow-[0_18px_40px_rgba(43,43,43,0.12)]">
          <Image
            src={section.mediaSrc!}
            alt={section.mediaAlt ?? section.title}
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 70vw, 980px"
          />
        </div>
      );
    }

    if (frameType === "tablet") {
      return (
        <div className="relative w-full aspect-[1206/1716] rounded-[24px] md:rounded-[32px] lg:rounded-[40px] border-[4px] md:border-[6px] lg:border-[8px] border-text overflow-hidden bg-black shadow-lg">
          {isVideo ? (
            <video
              src={section.mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover object-[center_50%] bg-[#EAF5FB]"
            />
          ) : (
            <Image
              src={section.mediaSrc!}
              alt={section.mediaAlt ?? section.title}
              fill
              className="object-cover object-[center_50%] bg-[#EAF5FB]"
              sizes="(max-width: 1024px) 40vw, 520px"
            />
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full aspect-[9/19] rounded-[24px] md:rounded-[36px] lg:rounded-[48px] border-[4px] md:border-[6px] lg:border-[8px] border-text overflow-hidden bg-black shadow-lg backdrop-blur-lg bg-gray-200/60">
        {isVideo ? (
          <video
            src={section.mediaSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={section.mediaSrc!}
            alt={section.mediaAlt ?? section.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 40vw, 320px"
          />
        )}
      </div>
    );
  };

  return (
    <section className="bg-white px-6 py-16 md:px-12 md:py-24">
      <div className={`mx-auto ${isDesktopMediaProject ? "max-w-7xl xl:max-w-[1400px]" : "max-w-6xl"}`}>
        <div className="space-y-12 md:hidden">
          {sections.map((section, index) => (
            <section key={section.id} className="space-y-4">
              <p className="font-manrope text-sm uppercase tracking-[0.28em] text-text/50">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-bricolage text-[30px] font-bold text-text">
                {section.title}
              </h3>
              {section.caption && (
                <p className="font-manrope text-lg leading-relaxed text-text/68">
                  {section.caption}
                </p>
              )}
              <p className="max-w-2xl font-manrope text-lg leading-relaxed text-text/82">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        <div
          className={`hidden md:grid md:gap-12 lg:gap-16 xl:gap-20 ${
            isDesktopMediaProject
              ? "md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
              : "md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)]"
          }`}
        >
          <div className="space-y-14 lg:pl-4 xl:pl-8">
            {sections.map((section) => {
              const frameType = section.frameType ?? defaultFrameType;
              const widthClass =
                frameType === "desktop"
                  ? "max-w-[1120px]"
                  : frameType === "tablet"
                    ? "max-w-[360px] md:max-w-[400px] lg:max-w-[440px]"
                    : "max-w-[220px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px]";

              return (
                <div
                  key={section.id}
                  ref={(element) => {
                    sectionRefs.current[section.id] = element;
                  }}
                  data-case-study-id={section.id}
                  className="min-h-[56vh] flex items-center"
                >
                  <div className={`mx-auto flex w-full items-center justify-center ${widthClass}`}>
                    {renderCaseStudyMedia(section)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="md:sticky md:top-28 md:self-start">
            <div className="rounded-[32px] bg-section-bg px-8 py-8 shadow-sm md:px-9 md:py-9 lg:min-h-[360px] xl:min-h-[390px]">
              <p className="mb-4 font-manrope text-xs uppercase tracking-[0.28em] text-text/52 md:text-sm">
                How It Works
              </p>
              <h3 className="mb-4 max-w-[16ch] font-bricolage text-[28px] font-bold leading-[1.05] text-text lg:text-[34px] xl:text-[38px]">
                {activeSection.title}
              </h3>
              {activeSection.caption && (
                <p className="mb-4 max-w-[28rem] font-manrope text-lg leading-relaxed text-text/68 lg:text-[20px]">
                  {activeSection.caption}
                </p>
              )}
              <p className="max-w-[28rem] font-manrope text-lg leading-relaxed text-text/84 lg:text-[19px] xl:text-[21px]">
                {activeSection.text}
              </p>
              <div className="mt-7 flex gap-3">
                {sections.map((section) => {
                  const isActive = section.id === activeSection.id;

                  return (
                    <span
                      key={section.id}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isActive ? "w-10 bg-text" : "w-2.5 bg-text/20"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
