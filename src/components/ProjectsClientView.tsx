"use client";

import { useState, useMemo } from "react";
import { Search, FolderGit2 } from "lucide-react";
import ProjectCard, { ProjectCardData } from "@/components/ProjectCard";

interface ProjectsClientViewProps {
  initialProjects: ProjectCardData[];
}

export default function ProjectsClientView({ initialProjects }: ProjectsClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dynamically derive distinct categories from the live database projects
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const title = (project.title || "").toLowerCase();
      const subtitle = (project.subtitle || project.shortDescription || "").toLowerCase();
      const summary = (project.summary || project.description || "").toLowerCase();
      const tags = (project.tags || project.technologies || []).map((t: string) => t.toLowerCase());

      const matchesSearch =
        !q ||
        title.includes(q) ||
        subtitle.includes(q) ||
        summary.includes(q) ||
        tags.some((t: string) => t.includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

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
            placeholder="Search by tag, tech, or title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id || project.id || project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-300 font-semibold text-base">No matching projects found</p>
          <p className="text-xs text-slate-400">
            {initialProjects.length === 0
              ? "No published projects in the database yet. Add one in the Admin dashboard!"
              : "Try adjusting your search query or selecting a different category filter."}
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
