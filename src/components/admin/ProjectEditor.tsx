"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FolderGit2,
  Save,
  ArrowLeft,
  Plus,
  X,
  Link as LinkIcon,
  Layers,
  FileCode,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ProjectEditorProps {
  initialData?: any;
  projectId?: string;
  isEdit?: boolean;
}

export default function ProjectEditor({ initialData, projectId, isEdit = false }: ProjectEditorProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    coverImage: {
      url: initialData?.coverImage?.url || "",
      publicId: initialData?.coverImage?.publicId || "",
    },
    galleryText: initialData?.gallery ? initialData.gallery.map((g: any) => g.url).join("\n") : "",
    category: initialData?.category || "Full-Stack",
    type: initialData?.type || "personal",
    technologies: (initialData?.technologies || ["Python", "Next.js", "MongoDB"]) as string[],
    newTag: "",
    problem: initialData?.problem || "",
    solution: initialData?.solution || "",
    architecture: initialData?.architecture || "",
    challenges: initialData?.challenges || "",
    results: initialData?.results || "",
    futureImprovements: initialData?.futureImprovements || "",
    githubUrl: initialData?.githubUrl || "",
    liveUrl: initialData?.liveUrl || "",
    videoUrl: initialData?.videoUrl || "",
    featured: initialData?.featured || false,
    status: initialData?.status || "published",
    order: initialData?.order || 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const autoSlug = isEdit
        ? prev.slug
        : val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
      return { ...prev, title: val, slug: autoSlug };
    });
  };

  const addTechnologyTag = () => {
    if (!formData.newTag.trim()) return;
    if (!formData.technologies.includes(formData.newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, prev.newTag.trim()],
        newTag: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, newTag: "" }));
    }
  };

  const removeTechnologyTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent, explicitStatus?: "published" | "draft") => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotice(null);

    const payload = {
      ...formData,
      status: explicitStatus || formData.status,
      gallery: formData.galleryText
        .split("\n")
        .map((u: string) => u.trim())
        .filter(Boolean)
        .map((url: string) => ({ url, publicId: "" })),
    };

    try {
      const url = isEdit ? `/api/projects/${projectId}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNotice({
          type: "success",
          text: isEdit ? "Project updated successfully!" : "Project created successfully!",
        });
        setTimeout(() => {
          router.push("/admin/projects");
        }, 800);
      } else {
        const err = await res.json();
        setNotice({ type: "error", text: err.error || "Failed to save project." });
      }
    } catch {
      setNotice({ type: "error", text: "Network error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isEdit ? "Edit Project" : "Add New Project"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Specify technical case study, stack, architecture, and live links.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "published")}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Project</span>
          </button>
        </div>
      </div>

      {notice && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2 text-xs font-medium border ${
            notice.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/60 border-rose-500/40 text-rose-300"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notice.text}</span>
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        {/* Basic Information (Spec Section 6) */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Basic Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Smart Gym Management System"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Slug (URL identifier)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. smart-gym-management-system"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Short Description</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="e.g. IoT-based gym member and attendance management system."
              required
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Full Description / Overview</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A comprehensive breakdown of what the system does and why it was created..."
              required
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Classification & Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Classification */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Project Classification</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
                >
                  <option value="IoT">IoT / Embedded</option>
                  <option value="AI">AI / Machine Learning</option>
                  <option value="Full-Stack">Full-Stack Web</option>
                  <option value="Systems & Networking">Systems &amp; Networking</option>
                  <option value="Python">Python Automation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Project Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
                >
                  <option value="personal">Personal Project</option>
                  <option value="academic">Academic / University</option>
                  <option value="client">Client / Commercial</option>
                  <option value="open-source">Open Source</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="featuredProj"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800 cursor-pointer"
              />
              <label htmlFor="featuredProj" className="text-xs text-slate-300 cursor-pointer font-medium">
                Feature on Homepage &amp; Hero Showcase
              </label>
            </div>
          </div>

          {/* Project Images */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5" />
              <span>Project Media &amp; Images</span>
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Cover Image URL</label>
              <input
                type="text"
                value={formData.coverImage.url}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coverImage: { ...formData.coverImage, url: e.target.value },
                  })
                }
                placeholder="/projects/smart-gym.png or https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Gallery Image URLs (1 per line)</label>
              <textarea
                rows={3}
                value={formData.galleryText}
                onChange={(e) => setFormData({ ...formData, galleryText: e.target.value })}
                placeholder="https://.../img1.png&#10;https://.../img2.png"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Technologies Tags */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Technologies &amp; Tools Stack
          </label>
          <div className="flex flex-wrap gap-2 items-center">
            {formData.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-mono"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => removeTechnologyTag(tech)}
                  className="text-slate-500 hover:text-rose-400 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm pt-1">
            <input
              type="text"
              value={formData.newTag}
              onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTechnologyTag();
                }
              }}
              placeholder="e.g. ESP8266, Docker..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="button"
              onClick={addTechnologyTag}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono cursor-pointer"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Links & Repositories */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Project Links &amp; Demos</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">GitHub Repository URL</label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/HaarishNK/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Live Demo URL</label>
              <input
                type="text"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Video / Demo URL</label>
              <input
                type="text"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Detailed Case Study (Spec Section 6) */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5" />
            <span>Engineering Case Study</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Problem Statement</label>
              <textarea
                rows={3}
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder="What challenge does this project solve?"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Engineered Solution</label>
              <textarea
                rows={3}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="How was the problem solved?"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Architecture &amp; Data Flow</label>
            <textarea
              rows={3}
              value={formData.architecture}
              onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
              placeholder="System pipeline, sensor buses, API contracts, database modeling..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Challenges Overcome</label>
              <textarea
                rows={3}
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                placeholder="Edge Wi-Fi drops, UART baud rates, memory limits..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Key Results &amp; Metrics</label>
              <textarea
                rows={3}
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="Sub-second verification, 99.9% uptime, 100+ members tracked..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Future Improvements</label>
              <textarea
                rows={3}
                value={formData.futureImprovements}
                onChange={(e) => setFormData({ ...formData, futureImprovements: e.target.value })}
                placeholder="BLE mesh clustering, mobile app companion..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? "Saving..." : isEdit ? "Update Project" : "Create Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
