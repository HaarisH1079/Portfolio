import { Metadata } from "next";
import { ProjectsRepo } from "@/lib/repository";
import ProjectsClientView from "@/components/ProjectsClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Haarish Nandakumar",
  description:
    "Detailed engineering projects ranging from IoT microcontrollers and AI analytical agents to full-stack web platforms and CCNA enterprise networks.",
};

export default async function ProjectsPage() {
  const rawProjects = await ProjectsRepo.getAll({ status: "published" });

  // Map to clean plain JSON objects for client component
  const projects = JSON.parse(JSON.stringify(rawProjects));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          03 // Engineering Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Projects &amp; Case Studies
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Detailed engineering projects ranging from IoT microcontrollers and AI analytical agents to full-stack web platforms and CCNA enterprise networks.
        </p>
      </div>

      <ProjectsClientView initialProjects={projects} />
    </div>
  );
}
