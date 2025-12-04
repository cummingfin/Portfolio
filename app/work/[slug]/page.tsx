import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectDetails from "@/components/project/ProjectDetails";
import BackHomeButton from "@/components/project/BackHomeButton";
import ProjectHeroImage from "@/components/project/ProjectHeroImage";
import GalleryPage from "@/components/project/GalleryPage";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "gallery") {
    return <GalleryPage project={project} />;
  }

  return (
    <main className="pt-24 pb-12 md:pb-16">
      <ProjectHeroImage project={project} />
      <ProjectDetails project={project} />
      <div className="px-6 md:px-12">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
          <BackHomeButton />
        </div>
      </div>
    </main>
  );
}

