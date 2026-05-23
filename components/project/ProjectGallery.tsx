"use client";

import { Project } from "@/types/project";
import Image from "next/image";

interface GalleryItem {
  src: string | null;
  label: string | undefined;
  isPlaceholder: boolean;
}

interface ProjectGalleryProps {
  project: Project;
  displayedGallery: GalleryItem[];
}

export default function ProjectGallery({ project, displayedGallery }: ProjectGalleryProps) {
  if (displayedGallery.length === 0) {
    return null;
  }

  const isRecanvasedCaseStudy = project.slug === "recanvased";
  const deviceFrameWidthClass =
    "max-w-[220px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px]";
  const deviceFrameClass =
    "relative w-full aspect-[9/19] rounded-[24px] md:rounded-[36px] lg:rounded-[48px] border-[4px] md:border-[6px] lg:border-[8px] border-text overflow-hidden bg-black shadow-lg backdrop-blur-lg bg-gray-200/60";

  if (isRecanvasedCaseStudy) {
    return (
      <section className="px-6 pb-12 pt-4 md:px-12 md:pb-16">
        <div className="site-container">
          <div className="mb-10 md:mb-12">
            <p className="mb-3 font-manrope text-sm uppercase tracking-[0.28em] text-text/50">
              Gallery
            </p>
            <h2 className="max-w-2xl font-bricolage text-[30px] font-bold text-text md:text-[36px]">
              More from the prototype
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
            {displayedGallery.map((item, index) => {
              const isVideo =
                item.src &&
                typeof item.src === "string" &&
                (item.src.endsWith(".mp4") ||
                  item.src.endsWith(".MP4") ||
                  item.src.endsWith(".webm") ||
                  item.src.endsWith(".mov") ||
                  item.src.endsWith(".MOV"));

              if (item.isPlaceholder) {
                return null;
              }

              return (
                <div key={index} className="space-y-4">
                  <div className={`mx-auto flex w-full items-center justify-center ${deviceFrameWidthClass}`}>
                    {isVideo ? (
                      <div className={deviceFrameClass}>
                        <video
                          src={item.src as string}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload={index < 2 ? "auto" : "metadata"}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={deviceFrameClass}>
                        <Image
                          src={item.src as string}
                          alt={`${project.title} image ${index + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 40vw, 320px"
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      </div>
                    )}
                  </div>

                  {item.label && (
                    <p className="mx-auto max-w-[360px] font-manrope text-base leading-relaxed text-text/78 md:text-lg">
                      {item.label}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="mt-12 md:mt-16">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {displayedGallery.map((item, index) => {
            const isVideo = item.src && typeof item.src === 'string' && (item.src.endsWith('.mp4') || item.src.endsWith('.MP4') || item.src.endsWith('.webm') || item.src.endsWith('.mov') || item.src.endsWith('.MOV'));
            const hasLabel = Boolean(item.label);
            
            if (item.isPlaceholder) {
              return (
                <div key={index} className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center">
                  <span className="text-gray-400 font-manrope">Image coming soon</span>
                </div>
              );
            }
            
            if (isVideo && hasLabel) {
              // Video with label - phone on left, text on right, within rectangle
              return (
                <div key={index} className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden flex items-center px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
                  <div className="flex flex-row items-stretch gap-6 md:gap-8 lg:gap-10 w-full h-full">
                    <div className="flex-shrink-0 flex items-center justify-center h-full">
                      <div className="relative h-[90%] max-h-full aspect-[9/19] rounded-[18px] md:rounded-[24px] lg:rounded-[32px] border-[3px] md:border-[4px] lg:border-[6px] border-text overflow-hidden bg-black shadow-md">
                        <video
                          src={item.src as string}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload={index < 2 ? "auto" : "metadata"}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex items-center">
                      <p className="text-text font-manrope text-lg md:text-xl lg:text-2xl leading-relaxed">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            
            if (isVideo) {
              // Video without label - centered in rectangle
              return (
                <div key={index} className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center px-3 md:px-5 py-6 md:py-8 lg:py-10">
                  <div className="relative h-[90%] max-h-full aspect-[9/19] rounded-[18px] md:rounded-[24px] lg:rounded-[32px] border-[3px] md:border-[4px] lg:border-[6px] border-text overflow-hidden bg-black shadow-md">
                    <video
                      src={item.src as string}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={index < 2 ? "auto" : "metadata"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            }
            
            // Image
            return (
              <div key={index} className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden">
                <Image
                  src={item.src as string}
                  alt={`${project.title} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
