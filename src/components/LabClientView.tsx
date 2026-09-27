"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FlaskConical, 
  ExternalLink, 
  ArrowRight, 
  Cpu, 
  Bot, 
  Network, 
  CheckCircle2, 
  Search,
  BookOpen
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export interface LabItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  objective: string;
  description?: string;
  technologies: string[];
  images?: { url: string; publicId?: string }[];
  githubUrl?: string;
  documentationUrl?: string;
  featured?: boolean;
  status?: string;
  order?: number;
}

interface LabClientViewProps {
  initialLabs: LabItem[];
}

export default function LabClientView({ initialLabs }: LabClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialLabs.forEach((l) => {
      if (l.category) set.add(l.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialLabs]);

  const filteredLabs = useMemo(() => {
    return initialLabs.filter((lab) => {
      const matchesCategory =
        selectedCategory === "All" ||
        lab.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const title = (lab.title || "").toLowerCase();
      const shortDesc = (lab.shortDescription || "").toLowerCase();
      const objective = (lab.objective || "").toLowerCase();
      const techs = (lab.technologies || []).map((t) => t.toLowerCase());

      const matchesSearch =
        !q ||
        title.includes(q) ||
        shortDesc.includes(q) ||
        objective.includes(q) ||
        techs.some((t) => t.includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialLabs, selectedCategory, searchQuery]);

  const getCategoryIcon = (category: string) => {
    const c = (category || "").toLowerCase();
    if (c.includes("net") || c.includes("cisco") || c.includes("router")) {
      return <Network className="w-4 h-4 text-indigo-400" />;
    }
    if (c.includes("iot") || c.includes("embed") || c.includes("esp")) {
      return <Cpu className="w-4 h-4 text-emerald-400" />;
    }
    if (c.includes("ai") || c.includes("agent") || c.includes("llm")) {
      return <Bot className="w-4 h-4 text-cyan-400" />;
    }
    return <FlaskConical className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="space-y-12">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experiments & protocols..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Labs Grid */}
      {filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <div
              key={lab._id || lab.id || lab.slug}
              className="group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 shadow-lg shadow-black/40 hover:shadow-cyan-950/20 transition-all duration-300 overflow-hidden"
            >
              {/* Header Visual */}
              <div className="p-5 border-b border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-950 to-[#0b101d] flex items-center justify-between">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs font-mono text-slate-200">
                  {getCategoryIcon(lab.category)}
                  <span>{lab.category}</span>
                </div>

                {lab.featured && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300">
                    Featured Experiment
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Link href={`/lab/${lab.slug}`}>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {lab.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {lab.shortDescription}
                  </p>

                  {lab.objective && (
                    <div className="pt-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                        Objective
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {lab.objective}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tech Tags */}
                {lab.technologies && lab.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lab.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <Link
                    href={`/lab/${lab.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Experiment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {lab.githubUrl && (
                      <a
                        href={lab.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Repository / Lab Topology"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {lab.documentationUrl && (
                      <a
                        href={lab.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Documentation"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <FlaskConical className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-semibold text-sm">No lab experiments found</p>
          <p className="text-xs text-slate-400">
            {initialLabs.length === 0
              ? "No published lab experiments yet. Add one in the Admin Dashboard!"
              : "Try adjusting your search query or category filter."}
          </p>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-800 text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
