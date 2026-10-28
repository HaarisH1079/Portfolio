"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Cpu,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  AlertTriangle,
  X,
  Save,
} from "lucide-react";

const STANDARD_CATEGORIES = [
  "Programming Languages",
  "Frontend Engineering",
  "Backend & Cloud",
  "IoT & Embedded Systems",
  "Networking & CCNA Concepts",
  "Tools & Developer Workflow",
  "AI & Data",
  "Database",
];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "Programming Languages",
    description: "",
    yearsExperience: 2,
    level: "Intermediate",
    icon: "Code",
    featured: false,
    order: 1,
    status: "active",
  });
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const set = new Set<string>(STANDARD_CATEGORIES);
    skills.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, [skills]);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== "All") params.set("category", categoryFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/skills?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSkills();
  };

  const openAddModal = () => {
    setEditingSkill(null);
    setIsCustomCategory(false);
    setCustomCategory("");
    setFormData({
      name: "",
      title: "",
      category: "Programming Languages",
      description: "",
      yearsExperience: 2,
      level: "Intermediate",
      icon: "Code",
      featured: false,
      order: skills.length + 1,
      status: "active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: any) => {
    setEditingSkill(skill);
    setIsCustomCategory(false);
    setCustomCategory("");
    setFormData({
      name: skill.name || skill.title || "",
      title: skill.title || skill.name || "",
      category: skill.category || "Programming Languages",
      description: skill.description || "",
      yearsExperience: skill.yearsExperience || 1,
      level: skill.level || "Intermediate",
      icon: skill.icon || "Code",
      featured: !!skill.featured,
      order: skill.order || 1,
      status: skill.status || "active",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const finalCategory = isCustomCategory && customCategory.trim()
      ? customCategory.trim()
      : formData.category;

    const payload = {
      ...formData,
      name: (formData.name || formData.title || "").trim(),
      title: (formData.title || formData.name || "").trim(),
      category: finalCategory,
    };

    try {
      if (editingSkill) {
        const id = editingSkill._id || editingSkill.id;
        const res = await fetch(`/api/skills/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setSkills((prev) =>
            prev.map((s) => ((s._id || s.id) === id ? updated : s))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setSkills((prev) => [...prev, created]);
          setIsModalOpen(false);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSkills((prev) => prev.filter((s) => s._id !== id && s.id !== id));
        setDeleteConfirmId(null);
      }
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold uppercase tracking-wider">
              Competencies
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Skills CRUD</h1>
          <p className="text-xs text-slate-400 mt-1">
            Categorized technical capabilities with seniority levels (Beginner, Intermediate, Advanced, Expert).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-semibold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skill name..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] font-mono text-slate-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-mono cursor-pointer"
          >
            <option value="All">All Categories ({skills.length})</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Skills Table */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : skills.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-3">
          <Cpu className="w-8 h-8 mx-auto text-slate-600 mb-1" />
          <p className="font-semibold text-slate-300">No skills found</p>
          <p>Click &quot;Add Skill&quot; above to register a new technical competency.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Skill Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {skills.map((skill) => {
                  const id = skill._id || skill.id;
                  return (
                    <tr key={id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{skill.title || skill.name}</span>
                          {skill.featured && (
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-cyan-300">{skill.category}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                            skill.level === "Expert"
                              ? "bg-purple-950 text-purple-300 border border-purple-500/40"
                              : skill.level === "Advanced"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                              : skill.level === "Intermediate"
                              ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                              : "bg-slate-800 text-slate-300 border border-slate-700"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {skill.yearsExperience ? `${skill.yearsExperience} yrs` : "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            skill.status === "active"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {skill.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(skill)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors cursor-pointer"
                            title="Edit Skill"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(id)}
                            className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 transition-colors cursor-pointer"
                            title="Delete Skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Skill Title / Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Python, ESP8266..."
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Category</label>
                  {!isCustomCategory ? (
                    <div className="space-y-1">
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          if (e.target.value === "__custom__") {
                            setIsCustomCategory(true);
                          } else {
                            setFormData({ ...formData, category: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono cursor-pointer"
                      >
                        {allCategories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                        <option value="__custom__">+ Enter Custom Category...</option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="New category name..."
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomCategory(false)}
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 text-slate-400 hover:text-white shrink-0"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Description / Usage</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Used for automation, AI models, and backend APIs..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Seniority Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredSkill"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800 cursor-pointer"
                />
                <label htmlFor="featuredSkill" className="text-slate-300 font-medium cursor-pointer">
                  Featured (highlight in top skills summary)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold font-mono transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Saving..." : "Save Skill"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base text-white">Delete Skill?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove this skill from the active catalog?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
