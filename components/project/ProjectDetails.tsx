"use client";

import { Project } from "@/types/project";
import ProjectIntro from "./ProjectIntro";
import ProjectNarrativeScroll from "./ProjectNarrativeScroll";
import ProjectGallery from "./ProjectGallery";
import ProjectCaseStudy from "./ProjectCaseStudy";
import ProjectCaseStudyText from "./ProjectCaseStudyText";
import ComingSoonCaseStudy from "./ComingSoonCaseStudy";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const title = project.detailsTitle || project.title;
  const subtitle = project.detailsSubtitle || "";
  const text = project.detailsText || "";
  const hasCustomVideo = Boolean(project.detailsVideo);
  const hasNarrative = Boolean(
    project.problem && project.whyItMatters && project.theIdea
  );
  const hasCaseStudy = Boolean(project.caseStudySections?.length);
  const hasCaseStudyText = Boolean(project.caseStudyTextSections?.length);
  const isComingSoon = Boolean(project.isComingSoon);
  const showGallery = !["recanvased", "panmure-liberum", "learnllama"].includes(project.slug);
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

  return (
    <section className="mb-12 md:mb-16">
      <ProjectIntro
        project={project}
        title={title}
        subtitle={subtitle}
        text={text}
        hasCustomVideo={hasCustomVideo}
      />
      {isComingSoon ? (
        <ComingSoonCaseStudy project={project} />
      ) : (
        <>
      {hasCaseStudy ? (
        <ProjectCaseStudy project={project} />
      ) : hasNarrative && (
        <ProjectNarrativeScroll
          problem={project.problem}
          whyItMatters={project.whyItMatters}
          theIdea={project.theIdea}
        />
      )}
      {hasCaseStudyText && <ProjectCaseStudyText project={project} />}
      {showGallery && (
        <ProjectGallery
          project={project}
          displayedGallery={displayedGallery}
        />
      )}
        </>
      )}
    </section>
  );
}
