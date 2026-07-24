export interface GalleryItem {
  src: string;
  label?: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  text: string;
  mediaType?: "image" | "video" | "placeholder";
  frameType?: "phone" | "tablet" | "desktop" | "physical";
  mediaSrc?: string;
  mediaAlt?: string;
  caption?: string;
}

export interface CaseStudyTextSection {
  id: string;
  title: string;
  text: string;
}

export interface EditorialPalette {
  page: string;
  surface: string;
  soft: string;
  primary: string;
  onPrimary: string;
  accent: string;
  onAccent: string;
  ink: string;
  mediaField: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  hoverLabel?: string;
  isComingSoon?: boolean;
  pageStyle?: "standard" | "editorial";
  caseStudyDepth?: "feature" | "compact" | "note";
  projectDiscipline?: string;
  projectServices?: string;
  editorialStatement?: string;
  outcome?: string;
  editorialPalette?: EditorialPalette;
  detailsMediaType?: "phone" | "tablet" | "desktop" | "physical";
  logo?: string;
  heroImage?: string;
  detailsHeroImage?: string;
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
