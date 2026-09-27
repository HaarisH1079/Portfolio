import { Metadata } from "next";
import { SkillsRepo } from "@/lib/repository";
import SkillsClientView from "@/components/SkillsClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skills & Engineering Stack | Haarish Nandakumar",
  description:
    "Technologies and tools I have actively built with, debugged at the register/packet level, and taught to others.",
};

export default async function SkillsPage() {
  const rawSkills = await SkillsRepo.getAll({ status: "active" });
  const skills = JSON.parse(JSON.stringify(rawSkills));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          02 // Technical Competencies
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Skills &amp; Engineering Stack
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Technologies and tools I have actively built with, debugged at the register/packet level, and taught to others.
        </p>
      </div>

      <SkillsClientView initialSkills={skills} />
    </div>
  );
}
