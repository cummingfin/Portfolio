import HeroOverlay from "@/components/home/HeroOverlay";
import Hero from "@/components/home/Hero";
import ProjectGrid from "@/components/home/ProjectGrid";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroOverlay />
      <Hero />
      <ProjectGrid />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

