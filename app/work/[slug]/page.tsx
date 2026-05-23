import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectDetails from "@/components/project/ProjectDetails";
import GalleryPage from "@/components/project/GalleryPage";
import MoreProjects from "@/components/project/MoreProjects";

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
    <main className="pt-16 md:pt-18 lg:pt-20 pb-12 md:pb-16">
      <ProjectDetails project={project} />
      <MoreProjects currentProject={project} />
    </main>
  );
}
