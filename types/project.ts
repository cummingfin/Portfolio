export interface GalleryItem {
  src: string;
  label?: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  text: string;
  mediaType?: "image" | "video" | "placeholder";
  frameType?: "phone" | "tablet" | "desktop";
  mediaSrc?: string;
  mediaAlt?: string;
  caption?: string;
}

export interface CaseStudyTextSection {
  id: string;
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  hoverLabel?: string;
  isComingSoon?: boolean;
  detailsMediaType?: "phone" | "tablet" | "desktop";
  logo?: string;
  heroImage?: string;
  heroVideo?: string;
  problem: string;
  whyItMatters?: string;
  theIdea?: string;
  solution?: string;
  detailsTitle?: string;
  detailsSubtitle?: string;
  detailsText?: string;
  detailsVideo?: string;
  caseStudySections?: CaseStudySection[];
  caseStudyTextSections?: CaseStudyTextSection[];
  gallery: (string | GalleryItem)[];
  tags?: string[];
  type?: string;
}
