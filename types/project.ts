export interface GalleryItem {
  src: string;
  label?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  logo?: string;
  heroImage?: string;
  heroVideo?: string;
  problem: string;
  solution?: string;
  detailsTitle?: string;
  detailsSubtitle?: string;
  detailsText?: string;
  detailsVideo?: string;
  gallery: (string | GalleryItem)[];
  tags?: string[];
  type?: string;
}

