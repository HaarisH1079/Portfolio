import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  FlaskConical, 
  Target, 
  Cpu, 
  Network, 
  Bot, 
  ExternalLink, 
  BookOpen, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { LabRepo } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = await LabRepo.getById(slug);
  if (!lab || lab.isDeleted) return { title: "Lab Experiment Not Found" };

  return {
    title: `${lab.title} | Lab Experiment`,
    description: lab.shortDescription || lab.objective,
  };
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = await LabRepo.getById(slug);

  if (!lab || lab.isDeleted || (lab.status && lab.status !== "published")) {
    notFound();
  }

  const paragraphs = (lab.description || "")
    .split(/\n\n+/)
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Lab Experiments</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
            {lab.category}
          </span>
          {lab.featured && (
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300">
              Featured Experiment
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {lab.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {lab.shortDescription}
        </p>

        {/* Action Buttons & Tech */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
          {lab.technologies && lab.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {lab.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            {lab.githubUrl && (
              <a
                href={lab.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Lab Repository</span>
              </a>
            )}
            {lab.documentationUrl && (
              <a
                href={lab.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Objective Card */}
      {lab.objective && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400">
            <Target className="w-5 h-5" />
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
              Primary Objective &amp; Empirical Goal
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {lab.objective}
          </p>
        </section>
      )}

      {/* Methodology & Description */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-indigo-400" />
          <span>Experiment Methodology &amp; Implementation Details</span>
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((p: string, idx: number) => (
              <p key={idx} className="whitespace-pre-line">
                {p}
              </p>
            ))
          ) : (
            <p className="text-slate-400 italic">
              Detailed technical writeup is being compiled in the testbench repository.
            </p>
          )}
        </div>
      </section>

      {/* Images gallery if present */}
      {lab.images && lab.images.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">Visual Artifacts &amp; Diagrams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lab.images.map((img: any, idx: number) => (
              <div key={idx} className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 p-2">
                <img
                  src={img.url}
                  alt={`${lab.title} schematic ${idx + 1}`}
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">
            Want to discuss this experiment?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Let&apos;s talk about edge optimization, routing convergence, or testing protocols.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
        >
          <span>Connect with Haarish</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
