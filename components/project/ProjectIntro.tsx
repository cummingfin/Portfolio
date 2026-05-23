"use client";

import { Project } from "@/types/project";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProjectIntroProps {
  project: Project;
  title: string;
  subtitle: string;
  text: string;
  hasCustomVideo: boolean;
}

export default function ProjectIntro({ project, title, subtitle, text, hasCustomVideo }: ProjectIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(project.slug !== "panmure-liberum");
  const mediaType = project.detailsMediaType ?? "desktop";
  const mediaHeightClass =
    mediaType === "tablet"
      ? "h-[440px] md:h-[520px] lg:h-[580px] xl:h-[640px]"
      : mediaType === "phone"
        ? "h-[420px] md:h-[500px] lg:h-[560px] xl:h-[620px]"
        : "h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px]";
  const mediaShellWidthClass =
    mediaType === "tablet"
      ? "max-w-[340px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[500px]"
      : mediaType === "phone"
        ? "max-w-[280px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[390px]"
        : "max-w-[980px]";
  const isDeviceMedia = mediaType === "phone" || mediaType === "tablet";

  useEffect(() => {
    if (!hasCustomVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    let autoplayDelay: ReturnType<typeof setTimeout> | null = null;

    if (project.slug === "panmure-liberum") {
      video.pause();
      autoplayDelay = setTimeout(() => {
        video.play().catch(() => {
          setIsVideoPlaying(false);
        });
      }, 5000);
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      if (autoplayDelay) {
        clearTimeout(autoplayDelay);
      }
    };
  }, [hasCustomVideo, project.slug]);

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

  const renderVideoMedia = () => {
    if (!project.detailsVideo) {
      return null;
    }

    if (mediaType === "tablet") {
      return (
        <div className="relative h-full max-h-full aspect-[1206/1716] rounded-[24px] md:rounded-[32px] lg:rounded-[40px] border-[4px] md:border-[6px] lg:border-[8px] border-text overflow-hidden bg-black shadow-lg">
          <video
            ref={videoRef}
            src={project.detailsVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover object-[center_12%] bg-[#EAF5FB]"
          />
        </div>
      );
    }

    if (mediaType === "phone") {
      return (
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
      );
    }

    return (
      <div className="w-full max-w-[980px] overflow-hidden rounded-[14px] md:rounded-[18px] lg:rounded-[20px] border border-text/12 bg-white shadow-[0_18px_40px_rgba(43,43,43,0.12)]">
        <video
          ref={videoRef}
          src={project.detailsVideo}
          muted
          loop
          playsInline
          preload="auto"
          className="block h-auto w-full object-contain bg-white"
        />
      </div>
    );
  };

  return (
    <div className="bg-background w-full px-0 md:px-0">
      <div className="site-container pt-0 pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-20 xl:pb-24">
        <div className={`grid grid-cols-1 items-center gap-8 md:gap-12 ${isDeviceMedia ? "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:gap-14" : "lg:grid-cols-2 lg:gap-16 xl:gap-20"}`}>
          {/* Left side - Text */}
          <div className="flex w-full justify-center pt-6 md:pt-8 lg:pt-10">
            <div className={`flex w-full flex-col items-start ${isDeviceMedia ? "max-w-[30rem] xl:max-w-[32rem]" : "max-w-[40rem] xl:max-w-[44rem]"}`}>
              <h2 className="mb-0 max-w-none text-left font-bricolage text-[40px] font-bold md:text-[48px] lg:text-[56px] xl:text-[64px]">{title}</h2>
              {subtitle && (
                <h3 className="mb-12 text-left font-manrope text-lg font-normal lg:mb-16 lg:text-xl xl:text-2xl">
                  {formatSubtitle(subtitle)}
                </h3>
              )}
              {text && (
                <p className={`text-left font-manrope text-base font-normal leading-relaxed md:text-lg lg:text-xl xl:text-2xl ${isDeviceMedia ? "max-w-[26rem] lg:max-w-[28rem] xl:max-w-[30rem]" : "max-w-lg lg:max-w-[32rem] xl:max-w-[34rem]"}`}>
                  {text}
                </p>
              )}
            </div>
          </div>

          {/* Right side - Media */}
          <div className={`relative flex w-full items-center justify-center pt-6 md:pt-8 lg:pt-10 ${mediaHeightClass}`}>
            {hasCustomVideo ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className={`group relative flex h-full w-full max-h-full items-center justify-center ${mediaShellWidthClass}`}>
                  {renderVideoMedia()}
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
  );
}
