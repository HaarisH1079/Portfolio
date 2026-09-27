import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from "lucide-react";
import { ExperienceRepo } from "@/lib/repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience | Haarish Nandakumar",
  description: "Work, teaching, and engineering experience of Haarish Nandakumar including CSC Computer Education and freelance software/IoT development.",
};

export default async function ExperiencePage() {
  const rawExperiences = await ExperienceRepo.getAll({ status: "published" });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          04 // Professional Track
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Work &amp; Teaching Experience
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Demonstrated capability through technical instruction, hands-on software development, and delivering real client solutions.
        </p>
      </div>

      {/* Experience Timeline */}
      {rawExperiences.length > 0 ? (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-12">
          {rawExperiences.map((exp: any) => {
            const role = exp.position || exp.role || "Software Engineer";
            const company = exp.company || "";
            const empType = exp.employmentType || exp.type || "Full-Time";
            const period = exp.period || (exp.startDate ? `${exp.startDate} – ${exp.endDate || (exp.current ? "Present" : "")}` : "2025 – Present");
            const location = exp.location || "Chennai, India";
            const responsibilities: string[] = Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0
              ? exp.responsibilities
              : Array.isArray(exp.description)
              ? exp.description
              : exp.description
              ? [exp.description]
              : [];
            const technologies: string[] = exp.technologies || [];
            const highlights: string[] = exp.highlights || [];

            return (
              <div key={exp._id || exp.id || role} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-md shadow-cyan-400/30" />

                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 group-hover:border-slate-700 transition-all space-y-6">
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-bold capitalize">
                        {empType}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                        {role}
                      </h2>
                      <p className="text-sm font-semibold text-cyan-400">
                        {company}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs font-mono text-slate-400 sm:text-right">
                      <div className="flex items-center sm:justify-end gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  {responsibilities.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Core Responsibilities &amp; Contributions
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-300">
                        {responsibilities.map((desc: string, dIdx: number) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2"></span>
                            <span className="leading-relaxed">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                        <Award className="w-4 h-4" />
                        <span>Key Achievements &amp; Impact</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {highlights.map((h: string, hIdx: number) => (
                          <li key={hIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {technologies.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">
                        Applied Tech:
                      </span>
                      {technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-semibold text-sm">No published experience entries found</p>
          <p className="text-xs text-slate-400">
            Add your roles in the Admin Dashboard to populate this section.
          </p>
        </div>
      )}

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">Looking for an enthusiastic engineer?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Available for immediate full-time software developer or engineering opportunities.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
}
