import Link from "next/link";
import { ExternalLink, ArrowRight, Cpu, Bot, Network, Code, Layers } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export interface ProjectCardData {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  summary?: string;
  description?: string;
  category: string;
  featured?: boolean;
  tags?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
  coverImage?: { url: string; publicId?: string };
  [key: string]: any;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const subtitle = project.subtitle || project.shortDescription || "";
  const summary = project.summary || project.description || "";
  const tags = project.tags || project.technologies || [];
  const category = project.category || "Full-Stack";

  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes("iot") || c.includes("embed")) {
      return <Cpu className="w-4 h-4 text-emerald-400" />;
    }
    if (c.includes("ai") || c.includes("ml")) {
      return <Bot className="w-4 h-4 text-cyan-400" />;
    }
    if (c.includes("net") || c.includes("sys")) {
      return <Network className="w-4 h-4 text-indigo-400" />;
    }
    return <Code className="w-4 h-4 text-amber-400" />;
  };

  const getGradientForCategory = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes("iot") || c.includes("embed")) {
      return "from-emerald-950/40 via-slate-900 to-slate-950";
    }
    if (c.includes("ai") || c.includes("ml")) {
      return "from-cyan-950/40 via-slate-900 to-slate-950";
    }
    if (c.includes("net") || c.includes("sys")) {
      return "from-indigo-950/40 via-slate-900 to-slate-950";
    }
    return "from-slate-900 via-slate-900 to-slate-950";
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 shadow-lg shadow-black/40 hover:shadow-cyan-950/20 transition-all duration-300 overflow-hidden">
      {/* Visual Header / Banner */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${getGradientForCategory(category)} p-5 flex flex-col justify-between border-b border-slate-800/60 overflow-hidden`}>
        {/* Subtle grid in visual header */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-medium text-slate-200">
            {getCategoryIcon(category)}
            <span>{category}</span>
          </div>

          {project.badge && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              {project.badge}
            </span>
          )}
        </div>

        {/* Project Visual Symbol */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 group-hover:border-cyan-500/30 transition-colors">
            <span className="text-cyan-400 font-bold">&gt;_</span>
            <span className="truncate max-w-[220px]">{project.slug}.sys</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
          </Link>
          {subtitle && (
            <p className="text-xs font-mono text-cyan-400/90 font-medium">
              {subtitle}
            </p>
          )}
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
            {summary}
          </p>
        </div>

        {/* Tech Tag Pills */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source on GitHub"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
