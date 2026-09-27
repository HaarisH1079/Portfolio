import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  Zap, 
  TrendingUp, 
  Sparkles, 
  ArrowRight
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { ProjectsRepo } from "@/lib/repository";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

export const dynamic = "force-dynamic";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await ProjectsRepo.getById(slug);
  if (!project || project.isDeleted) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.description || project.shortDescription || project.title,
  };
}

// Helper to parse challenge strings into structured items
function parseChallenges(rawChallenges: any) {
  if (Array.isArray(rawChallenges)) {
    return rawChallenges;
  }
  if (typeof rawChallenges === "string" && rawChallenges.trim()) {
    const blocks = rawChallenges.split(/\n\n+/).filter(Boolean);
    return blocks.map((block) => {
      const parts = block.split(/:\s*|\n/);
      if (parts.length >= 2) {
        return {
          challenge: parts[0].replace(/^challenge:\s*/i, "").trim(),
          solution: parts.slice(1).join(" ").replace(/^solution:\s*/i, "").trim(),
        };
      }
      return {
        challenge: "Engineering Consideration",
        solution: block.trim(),
      };
    });
  }
  return [];
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await ProjectsRepo.getById(slug);

  if (!project || project.isDeleted || (project.status && project.status !== "published")) {
    notFound();
  }

  const subtitle = project.subtitle || project.shortDescription || "";
  const summary = project.caseStudy?.overview || project.description || project.shortDescription || "";
  const tags = project.tags || project.technologies || [];

  const problem = project.caseStudy?.problem || project.problem || "Addressing edge system latency, reliable connectivity fallbacks, and real-time data synchronization under real-world constraints.";
  const solution = project.caseStudy?.solution || project.solution || "Architected a full-stack solution featuring resilient asynchronous communications, structured telemetry schemas, and an intuitive monitoring interface.";

  const architectureDesc = project.caseStudy?.architecture?.description || project.architecture || `System architecture for ${project.title} implementing modular pipelines from edge inputs to API consumers.`;
  const architectureFlow: string[] = project.caseStudy?.architecture?.flow || (
    tags.length > 0 
      ? tags.map((t: string) => `Process data using ${t} component pipeline`)
      : ["Input Signal & Event Trigger", "Data Processing & Validation", "Cloud Persistence & Client Render"]
  );

  const techList = project.caseStudy?.technologies || tags.map((t: string) => ({
    name: t,
    purpose: `Core library & implementation module for ${project.title}`,
  }));

  const challengesList = parseChallenges(project.caseStudy?.challenges || project.challenges);
  const resultsList: string[] = project.caseStudy?.results || (
    typeof project.results === "string" 
      ? project.results.split("\n").filter(Boolean)
      : ["Reduced latency across data pipelines", "Ensured 99.9% uptime for core operational events", "Seamless user feedback with sub-second response times"]
  );

  const futureWorkList: string[] = project.caseStudy?.futureWork || (
    typeof project.futureImprovements === "string"
      ? project.futureImprovements.split("\n").filter(Boolean)
      : ["Add multi-region edge node clustering", "Expand automated regression test harness"]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Case Study Hero */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
            {project.category}
          </span>
          {project.badge && (
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
              {project.badge}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        {subtitle && (
          <p className="text-base sm:text-lg font-mono text-cyan-400/90">
            {subtitle}
          </p>
        )}

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          {summary}
        </p>

        {/* Action Links & Tech Pills */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 1. PROBLEM & SOLUTION GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/20 space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
              The Engineering Problem
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
            {problem}
          </p>
        </div>

        {/* Solution Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
              The Engineering Solution
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
            {solution}
          </p>
        </div>
      </section>

      {/* 2. ARCHITECTURE DIAGRAM & DATA FLOW */}
      <section className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Architecture Blueprint
          </span>
          <h2 className="text-2xl font-bold text-white">
            System Design &amp; Data Pipeline
          </h2>
          <p className="text-sm text-slate-400">
            {architectureDesc}
          </p>
        </div>

        <ArchitectureDiagram steps={architectureFlow} />
      </section>

      {/* 3. TECHNOLOGIES & PURPOSE */}
      {techList.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Tech Justification
            </span>
            <h2 className="text-2xl font-bold text-white">
              Technologies &amp; Component Roles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techList.map((tech: any) => (
              <div
                key={tech.name}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-mono">
                    {tech.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {tech.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. CHALLENGES & HOW I SOLVED THEM */}
      {challengesList.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Engineering Obstacles
            </span>
            <h2 className="text-2xl font-bold text-white">
              Real Challenges &amp; Technical Solutions
            </h2>
            <p className="text-sm text-slate-400">
              Highlights practical debugging, edge case handling, and engineering trade-offs.
            </p>
          </div>

          <div className="space-y-4">
            {challengesList.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">
                      Challenge: {item.challenge}
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-3 pl-2 sm:pl-7">
                  <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
                      Engineering Resolution
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. MEASURABLE RESULTS */}
      {resultsList.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Measurable Outcomes
            </span>
            <h2 className="text-2xl font-bold text-white">
              Results &amp; Performance Metrics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resultsList.map((result: string, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 flex items-start gap-3"
              >
                <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. FUTURE WORK */}
      {futureWorkList.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Next Iterations &amp; Future Improvements
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            {futureWorkList.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">
            Interested in this implementation?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Let&apos;s discuss the architecture or explore how I can contribute to your engineering team.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
