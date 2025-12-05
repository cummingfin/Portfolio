"use client";

import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectHeroImageProps {
  project: Project;
}

export default function ProjectHeroImage({ project }: ProjectHeroImageProps) {
  const isRecanvased = project.slug === "recanvased";
  const isLearnLlama = project.slug === "learnllama";
  const isSignal = project.slug === "signal";
  const isCanopyOfEchos = project.slug === "canopy-of-echos";

  // Get hero image - for donkeyjobs use specific image, for recanvased/learnllama/signal use null (custom background), otherwise use heroImage
  const getHeroImage = () => {
    if (project.slug === "donkeyjobs") {
      return "/images/Donkeyjobs/Donkeyjobs2.jpg";
    }
    if (isRecanvased || isLearnLlama || isSignal) {
      return null; // No image, use solid background
    }
    return project.heroImage;
  };

  // Get logo - for donkeyjobs, recanvased, learnllama, and signal use specific logos, otherwise use project.logo
  const getLogo = () => {
    if (project.slug === "donkeyjobs") {
      return "/images/Donkeyjobs/DonkeyJobs Logo.png";
    }
    if (isRecanvased) {
      return "/images/Recanvased/Asset 1@3x 1.png";
    }
    if (isLearnLlama) {
      return "/images/LearnLlama/Learnllamalogo.png";
    }
    if (isSignal) {
      return "/images/Signal/Signal@3x-8%201.png";
    }
    return project.logo;
  };

  // Get text logo - for donkeyjobs use specific text logo
  const getTextLogo = () => {
    if (project.slug === "donkeyjobs") {
      return "/images/Donkeyjobs/Donkeyjobs text logo.png";
    }
    return null;
  };

  const heroImage = getHeroImage();
  const logo = getLogo();
  const textLogo = getTextLogo();

  // Format subtitle - make first two words bold if they are "Eco friendly", or format for recanvased
  const formatSubtitle = (subtitle: string) => {
    if (subtitle.toLowerCase().startsWith("eco friendly")) {
      const parts = subtitle.split(" ");
      const firstTwo = parts.slice(0, 2).join(" ");
      const rest = parts.slice(2).join(" ");
      return (
        <>
          <span className="font-bold">{firstTwo}</span> {rest}
        </>
      );
    }
    if (isLearnLlama && subtitle.toLowerCase().includes("best ar project")) {
      return subtitle.split(/(Best AR Project)/i).map((part, index) =>
        part.toLowerCase() === "best ar project" ? (
          <span key={index} className="font-bold">
            {part}
          </span>
        ) : (
          part
        )
      );
    }

    // Format for recanvased: "Helping unknown artists break out into the art world with AR"
    if (isRecanvased && subtitle.includes("the art world with AR")) {
      const parts = subtitle.split("the art world with");
      return (
        <>
          {parts[0].trim()}
          <br className="hidden md:block" />
          <span className="md:inline"> </span>
          the art world with <span className="font-bold">AR</span>
        </>
      );
    }
    return subtitle;
  };

  if (isLearnLlama) {
    return (
      <div className="w-full mb-12 md:mb-16 px-6 md:px-12">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
          <div className="w-full h-[50vh] md:h-[75vh] xl:h-[80vh] rounded-[32px] bg-[#F7F0CA] flex flex-col items-center justify-center text-center px-6 space-y-6">
            <Image
              src="/images/LearnLlama/Learnllamalogo.png"
              alt="LearnLlama icon"
              width={160}
              height={160}
              className="object-contain w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
              priority
            />
            <Image
              src="/images/LearnLlama/LearnLlamaTextlogo.png"
              alt="LearnLlama wordmark"
              width={420}
              height={120}
              className="object-contain w-56 md:w-72 lg:w-[420px]"
              priority
            />
            {project.subtitle && (
              <p className="font-manrope text-lg md:text-xl lg:text-2xl text-text">
                {formatSubtitle(project.subtitle)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isSignal) {
    return (
      <div className="w-full mb-12 md:mb-16 px-6 md:px-12">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
          <div className="w-full h-[50vh] md:h-[75vh] xl:h-[80vh] rounded-[32px] bg-[#F7F2EA] flex flex-col items-center justify-center text-center px-6 space-y-6">
            <Image
              src="/images/Signal/Signal@3x-8%201.png"
              alt="Signal logo"
              width={420}
              height={180}
              className="object-contain w-56 md:w-72 lg:w-[420px]"
              priority
            />
            {project.subtitle && (
              <p className="font-manrope text-lg md:text-xl lg:text-2xl text-text">
                {formatSubtitle(project.subtitle)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-12 md:mb-16 px-6 md:px-12">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div
          className={`w-full h-[50vh] md:h-[75vh] xl:h-[80vh] relative rounded-3xl overflow-hidden ${
            isRecanvased ? "bg-[#F5F5F0]" : ""
          }`}
        >
          {/* Background Image - only if not recanvased */}
          {heroImage && (
            <Image
              src={heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          
          {/* 50% opacity black overlay - only if not recanvased */}
          {!isRecanvased && <div className="absolute inset-0 bg-black/50"></div>}
          
          {/* Logo and text overlay */}
          {isRecanvased ? (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3 md:gap-4">
                {logo && (
                  <div className="relative">
                    <Image
                      src={logo}
                      alt={`${project.title} logo`}
                      width={500}
                      height={180}
                      className="object-contain w-[240px] md:w-[320px] lg:w-[380px] xl:w-[460px] 2xl:w-[520px] h-auto"
                      priority
                    />
                  </div>
                )}
                {project.subtitle && (
                  <h3 className="text-text text-center max-w-2xl lg:max-w-3xl xl:max-w-4xl px-6 text-lg lg:text-xl xl:text-2xl leading-tight m-0">
                    {formatSubtitle(project.subtitle)}
                  </h3>
                )}
              </div>
            </div>
          ) : isCanopyOfEchos ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 space-y-4 md:space-y-6">
              <h1 className="font-bricolage font-bold text-[48px] md:text-[64px] text-white">
                Canopy of Echos
              </h1>
              {project.subtitle && (
                <h2 className="text-white text-center max-w-2xl lg:max-w-3xl xl:max-w-4xl px-6 text-lg lg:text-xl xl:text-2xl leading-tight m-0">
                  {formatSubtitle(project.subtitle)}
                </h2>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              {logo && (
                <div className="relative mb-6 lg:mb-8 xl:mb-10">
                  <Image
                    src={logo}
                    alt={`${project.title} logo`}
                    width={80}
                    height={80}
                    className="object-contain w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
                    priority
                  />
                </div>
              )}
              {textLogo && (
                <div className="relative mb-4 lg:mb-6 xl:mb-8">
                  <Image
                    src={textLogo}
                    alt={project.title}
                    width={400}
                    height={100}
                    className="object-contain w-64 md:w-80 lg:w-96 xl:w-[450px] 2xl:w-[500px]"
                    priority
                  />
                </div>
              )}
              {project.subtitle && (
                <h3 className="text-white text-center max-w-2xl lg:max-w-3xl xl:max-w-4xl px-6 text-lg lg:text-xl xl:text-2xl">
                  {formatSubtitle(project.subtitle)}
                </h3>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
