"use client";

import { useState, useEffect } from "react";
import {
  FlaskConical,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  ExternalLink,
  AlertTriangle,
  Star,
} from "lucide-react";

export default function AdminLabPage() {
  const [labs, setLabs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Networking",
    shortDescription: "",
    objective: "",
    description: "",
    technologies: ["GNS3", "Cisco IOS"],
    newTech: "",
    githubUrl: "",
    documentationUrl: "",
    status: "published",
    featured: false,
    order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchLabs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/lab");
      if (res.ok) {
        const data = await res.json();
        setLabs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const openAddModal = () => {
    setEditingLab(null);
    setFormData({
      title: "",
      slug: "",
      category: "Networking",
      shortDescription: "",
      objective: "",
      description: "",
      technologies: [],
      newTech: "",
      githubUrl: "",
      documentationUrl: "",
      status: "published",
      featured: false,
      order: labs.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (lab: any) => {
    setEditingLab(lab);
    setFormData({
      title: lab.title || "",
      slug: lab.slug || "",
      category: lab.category || "Networking",
      shortDescription: lab.shortDescription || "",
      objective: lab.objective || "",
      description: lab.description || "",
      technologies: lab.technologies || [],
      newTech: "",
      githubUrl: lab.githubUrl || "",
      documentationUrl: lab.documentationUrl || "",
      status: lab.status || "published",
      featured: !!lab.featured,
      order: lab.order || 1,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingLab
        ? prev.slug
        : val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
    }));
  };

  const addTech = () => {
    if (!formData.newTech.trim()) return;
    if (!formData.technologies.includes(formData.newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, formData.newTech.trim()],
        newTech: "",
      });
    } else {
      setFormData({ ...formData, newTech: "" });
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (editingLab) {
        const id = editingLab._id || editingLab.id;
        const res = await fetch(`/api/lab/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setLabs((prev) => prev.map((l) => ((l._id || l.id) === id ? updated : l)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/lab", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setLabs((prev) => [...prev, created]);
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
      const res = await fetch(`/api/lab/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLabs((prev) => prev.filter((l) => l._id !== id && l.id !== id));
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
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 font-bold uppercase tracking-wider">
              Experiments &amp; Benchmarks
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Lab Experiments CRUD</h1>
          <p className="text-xs text-slate-400 mt-1">
            GNS3 topologies, ESP8266 power profiling, and AI agent testbeds.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experiment</span>
        </button>
      </div>

      {/* Lab List Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-7 h-7 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : labs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-3">
          <FlaskConical className="w-8 h-8 mx-auto text-slate-600 mb-1" />
          <p className="font-semibold text-slate-300">No lab experiments recorded</p>
          <p>Click "Add Experiment" above to document your technical testbeds.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {labs.map((lab) => {
            const id = lab._id || lab.id;
            return (
              <div
                key={id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-white">{lab.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                      {lab.category}
                    </span>
                    {lab.featured && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        Featured
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        lab.status === "published"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-950 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {lab.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1">{lab.shortDescription}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lab.technologies?.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                  {lab.githubUrl && (
                    <a
                      href={lab.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="GitHub Repository"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => openEditModal(lab)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(id)}
                    className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Lab Modal (Spec Section 15) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {editingLab ? "Edit Experiment" : "Add New Experiment"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Experiment Name</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. OSPF Multi-Area Topology"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 font-mono cursor-pointer"
                  >
                    <option value="Networking">Networking</option>
                    <option value="IoT">IoT / Embedded</option>
                    <option value="AI">AI &amp; Machine Learning</option>
                    <option value="Systems">Systems Programming</option>
                    <option value="Security">Security &amp; Protocols</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 font-mono cursor-pointer"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="GNS3 enterprise network emulation with multi-area OSPF routing..."
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Problem / Goal (Objective)</label>
                <textarea
                  rows={2}
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  placeholder="Verify SPF calculations and analyze Type 1, 2, and 3 LSAs..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">What I Built (Description)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed configuration steps, router CLI output, Wireshark captures..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <label className="block font-mono text-slate-300">Technologies &amp; Tools</label>
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-purple-300 font-mono"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => removeTech(t)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 max-w-sm pt-1">
                  <input
                    type="text"
                    value={formData.newTech}
                    onChange={(e) => setFormData({ ...formData, newTech: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                    placeholder="e.g. GNS3, Cisco IOS..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-mono cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/HaarishNK/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Documentation URL</label>
                  <input
                    type="text"
                    value={formData.documentationUrl}
                    onChange={(e) => setFormData({ ...formData, documentationUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredLab"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-purple-500 bg-slate-950 border-slate-800 cursor-pointer"
                />
                <label htmlFor="featuredLab" className="text-slate-300 font-medium cursor-pointer">
                  Featured Experiment
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold font-mono transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Saving..." : "Save Experiment"}</span>
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
              <h3 className="font-bold text-base text-white">Delete Experiment?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove this lab record?
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
