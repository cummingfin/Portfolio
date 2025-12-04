"use client";

import { GalleryItem, Project } from "@/types/project";
import Image from "next/image";
import { useRef, useState } from "react";

interface GalleryPageProps {
  project: Project;
}

export default function GalleryPage({ project }: GalleryPageProps) {
  return (
    <main className="pt-24 pb-12 md:pb-16">
      <section className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-bricolage font-bold text-[48px] md:text-[64px]">{project.title}</h1>
          {project.subtitle && (
            <p className="text-lg md:text-2xl font-manrope text-gray-700 mt-4">
              {project.subtitle}
            </p>
          )}
          {project.detailsText && (
            <p className="text-base md:text-lg font-manrope text-gray-600 mt-6 max-w-3xl mx-auto">
              {project.detailsText}
            </p>
          )}
        </div>

        <div className="space-y-10">
          {project.gallery.map((item, index) => {
            const src = typeof item === "string" ? item : (item as GalleryItem).src;
            const label = typeof item === "string" ? undefined : (item as GalleryItem).label;
            const isVideo = src?.match(/\.(mp4|mov|webm)$/i);

            return (
              <GalleryMedia
                key={index}
                src={src}
                label={label}
                projectTitle={project.title}
                priority={index === 0}
                isVideo={Boolean(isVideo)}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

interface GalleryMediaProps {
  src: string;
  label?: string;
  projectTitle: string;
  priority?: boolean;
  isVideo: boolean;
}

function GalleryMedia({ src, label, projectTitle, priority = false, isVideo }: GalleryMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full h-[50vh] md:h-[75vh] xl:h-[80vh] relative overflow-hidden rounded-3xl shadow-lg bg-black">
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <button
              onClick={togglePlay}
              className="rounded-full bg-black/70 text-white w-10 h-10 flex items-center justify-center shadow-md cursor-pointer"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <span className="flex gap-1">
                  <span className="h-4 w-1.5 bg-white block" />
                  <span className="h-4 w-1.5 bg-white block" />
                </span>
              ) : (
                <span className="ml-0.5 border-l-[10px] border-l-white border-y-[6px] border-y-transparent" />
              )}
            </button>
            <button
              onClick={toggleSound}
              className="rounded-full bg-black/70 text-white w-10 h-10 flex items-center justify-center shadow-md cursor-pointer"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <span className="text-xs font-bold">S</span>
              ) : (
                <span className="text-xs font-bold">🔊</span>
              )}
            </button>
          </div>
        </>
      ) : (
        <Image
          src={src}
          alt={`${projectTitle} image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1300px"
          priority={priority}
        />
      )}
      {label && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs md:text-sm px-3 py-1 rounded-full font-manrope">
          {label}
        </div>
      )}
    </div>
  );
}


