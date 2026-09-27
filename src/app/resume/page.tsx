import { Metadata } from "next";
import { ResumeRepo, AboutRepo, ExperienceRepo, ProjectsRepo, SkillsRepo } from "@/lib/repository";
import ResumeClientView from "@/components/ResumeClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume & Curriculum Vitae | Haarish Nandakumar",
  description:
    "Curriculum Vitae of Haarish Nandakumar detailing software engineering proficiencies, IoT systems, CCNA networking, and academic credentials.",
};

export default async function ResumePage() {
  const [currentResume, about, experiences, projects, skills] = await Promise.all([
    ResumeRepo.getCurrent(),
    AboutRepo.get(),
    ExperienceRepo.getAll({ status: "published" }),
    ProjectsRepo.getAll({ status: "published" }),
    SkillsRepo.getAll({ status: "active" }),
  ]);

  return (
    <ResumeClientView
      currentResume={JSON.parse(JSON.stringify(currentResume))}
      about={JSON.parse(JSON.stringify(about))}
      experiences={JSON.parse(JSON.stringify(experiences))}
      projects={JSON.parse(JSON.stringify(projects))}
      skills={JSON.parse(JSON.stringify(skills))}
    />
  );
}
