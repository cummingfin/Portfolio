"use client";

import { Project } from "@/types/project";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const title = project.detailsTitle || project.title;
  const subtitle = project.detailsSubtitle || "";
  const text = project.detailsText || "";
  const hasCustomVideo = Boolean(project.detailsVideo);
  const galleryStartIndex = hasCustomVideo ? 0 : project.gallery.length > 1 ? 1 : 0;
  const galleryItems = project.gallery.slice(galleryStartIndex, galleryStartIndex + 4);
  const placeholdersNeeded = Math.max(0, 4 - galleryItems.length);
  const displayedGallery = [
    ...galleryItems.map((item) => {
      if (typeof item === 'string') {
        return { src: item, label: undefined, isPlaceholder: false };
      }
      return { src: item.src, label: item.label, isPlaceholder: false };
    }),
    ...Array.from({ length: placeholdersNeeded }, () => ({ src: null, label: undefined, isPlaceholder: true })),
  ];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    if (!hasCustomVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [hasCustomVideo]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  // Format subtitle - make "Eco Friendly" bold if it appears
  const formatSubtitle = (subtitleText: string) => {
    if (subtitleText.toLowerCase().includes("eco friendly")) {
      return subtitleText.split(/(Eco Friendly)/i).map((part, index) => 
        part.toLowerCase() === "eco friendly" ? (
          <span key={index} className="font-bold">{part}</span>
        ) : part
      );
    }
    return subtitleText;
  };

  return (
    <section className="mb-12 md:mb-16">
      <div className="bg-white w-full px-0 md:px-0">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left side - Text */}
            <div className="flex flex-col items-center">
              <h2 className="mb-0 font-bricolage font-bold text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-center">{title}</h2>
              {subtitle && (
                <h3 className="mb-12 lg:mb-16 font-manrope font-normal text-center text-lg lg:text-xl xl:text-2xl">
                  {subtitle}
                </h3>
              )}
              {text && (
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-manrope font-normal text-center max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4">
                  {text}
                </p>
              )}
            </div>

            {/* Right side - Media */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] flex items-center justify-center">
              {hasCustomVideo ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative group h-full max-h-full flex items-center justify-center">
                    {project.slug === "learnllama" ? (
                      <div className="relative inline-flex max-h-full h-full max-w-full rounded-[20px] md:rounded-[28px] lg:rounded-[36px] border-[3px] md:border-[5px] lg:border-[6px] border-text overflow-hidden bg-black shadow-lg backdrop-blur-lg bg-gray-200/60">
                        <video
                          ref={videoRef}
                          src={project.detailsVideo}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="h-full w-auto max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="relative h-full max-h-full aspect-[9/19] rounded-[24px] md:rounded-[36px] lg:rounded-[48px] border-[4px] md:border-[6px] lg:border-[8px] border-text overflow-hidden bg-black shadow-lg backdrop-blur-lg bg-gray-200/60">
                        <video
                          ref={videoRef}
                          src={project.detailsVideo}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={toggleVideoPlayback}
                      className="absolute top-4 left-4 z-20 rounded-full bg-gray-300/80 backdrop-blur text-text w-10 h-10 flex items-center justify-center text-sm font-bold shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:outline-none group-hover:pointer-events-auto pointer-events-none"
                      aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                    >
                      {isVideoPlaying ? (
                        <span className="flex gap-1">
                          <span className="h-4 w-1.5 bg-text block" />
                          <span className="h-4 w-1.5 bg-text block" />
                        </span>
                      ) : (
                        <span className="ml-0.5 border-l-[10px] border-l-text border-y-[6px] border-y-transparent" />
                      )}
                    </button>
                  </div>
                </div>
              ) : project.gallery.length > 0 ? (
                <Image
                  src={typeof project.gallery[0] === 'string' ? project.gallery[0] : project.gallery[0].src}
                  alt={`${project.title} image`}
                  fill
                  className="object-cover rounded-3xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                  <div className="bg-gray-100 rounded-3xl w-full h-full flex items-center justify-center text-gray-400">
                  <p>Project image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Four images grid below - no white background */}
      {displayedGallery.length > 0 && (
        <div className="px-6 md:px-12 mt-12 md:mt-16">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
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
                    <div key={index} className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden flex items-center p-4 md:p-6 lg:p-8">
                      <div className="flex flex-row items-stretch gap-6 md:gap-8 lg:gap-10 w-full h-full">
                        <div className="flex-shrink-0 flex items-center justify-center h-full">
                          <div className="relative h-full aspect-[9/19] rounded-[18px] md:rounded-[24px] lg:rounded-[32px] border-[3px] md:border-[4px] lg:border-[6px] border-text overflow-hidden bg-black shadow-md">
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
                    <div key={index} className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center p-3 md:p-5">
                      <div className="relative h-full aspect-[9/19] rounded-[18px] md:rounded-[24px] lg:rounded-[32px] border-[3px] md:border-[4px] lg:border-[6px] border-text overflow-hidden bg-black shadow-md">
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
      )}
    </section>
  );
}

