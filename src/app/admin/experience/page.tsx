"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Building2,
  MapPin,
  Calendar,
  AlertTriangle,
} from "lucide-react";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal / Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    employmentType: "internship",
    location: "Chennai, India",
    startDate: "June 2026",
    endDate: "August 2026",
    current: false,
    description: "",
    responsibilities: ["Developed modern full-stack features", "Optimized database queries"],
    newResp: "",
    technologies: ["Python", "React", "MongoDB"],
    newTech: "",
    companyLogo: { url: "" },
    companyWebsite: "",
    status: "published",
    order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/experience");
      if (res.ok) {
        const data = await res.json();
        setExperiences(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openAddModal = () => {
    setEditingExp(null);
    setFormData({
      position: "",
      company: "",
      employmentType: "internship",
      location: "Chennai, India",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      responsibilities: [],
      newResp: "",
      technologies: [],
      newTech: "",
      companyLogo: { url: "" },
      companyWebsite: "",
      status: "published",
      order: experiences.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp: any) => {
    setEditingExp(exp);
    setFormData({
      position: exp.position || "",
      company: exp.company || "",
      employmentType: exp.employmentType || "internship",
      location: exp.location || "Chennai, India",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      current: !!exp.current,
      description: exp.description || "",
      responsibilities: exp.responsibilities || [],
      newResp: "",
      technologies: exp.technologies || [],
      newTech: "",
      companyLogo: { url: exp.companyLogo?.url || "" },
      companyWebsite: exp.companyWebsite || "",
      status: exp.status || "published",
      order: exp.order || 1,
    });
    setIsModalOpen(true);
  };

  const addResp = () => {
    if (!formData.newResp.trim()) return;
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, formData.newResp.trim()],
      newResp: "",
    });
  };

  const removeResp = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index),
    });
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
      if (editingExp) {
        const id = editingExp._id || editingExp.id;
        const res = await fetch(`/api/experience/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setExperiences((prev) =>
            prev.map((e) => ((e._id || e.id) === id ? updated : e))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setExperiences((prev) => [...prev, created]);
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
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExperiences((prev) => prev.filter((e) => e._id !== id && e.id !== id));
        setDeleteConfirmId(null);
      }
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold uppercase tracking-wider">
              Career History
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Experience CRUD</h1>
          <p className="text-xs text-slate-400 mt-1">
            Internships, mentorships, and full-time engineering roles.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-400 hover:to-cyan-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : experiences.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-3">
          <Briefcase className="w-8 h-8 mx-auto text-slate-600 mb-1" />
          <p className="font-semibold text-slate-300">No experience records found</p>
          <p>Click "Add Experience" above to record your professional trajectory.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => {
            const id = exp._id || exp.id;
            return (
              <div
                key={id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-white">{exp.position}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs font-semibold text-cyan-300">{exp.company}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {exp.employmentType}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        exp.status === "published"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-950 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  {exp.responsibilities?.length > 0 && (
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5 pt-1">
                      {exp.responsibilities.slice(0, 2).map((r: string, idx: number) => (
                        <li key={idx} className="line-clamp-1">
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies?.map((tech: string) => (
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
                  <button
                    onClick={() => openEditModal(exp)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
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

      {/* Add / Edit Experience Modal (Spec Section 12) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {editingExp ? "Edit Experience" : "Add Experience"}
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
                  <label className="block font-mono text-slate-300 mb-1">Position / Role</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Software Developer Intern"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. ABC Tech Solutions"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono cursor-pointer"
                  >
                    <option value="internship">Internship</option>
                    <option value="full-time">Full-Time</option>
                    <option value="mentorship">Mentorship / Teaching</option>
                    <option value="freelance">Freelance / Contract</option>
                    <option value="part-time">Part-Time</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Chennai, India"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="June 2026"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={formData.current}
                    value={formData.current ? "Present" : formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="August 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="currentRole"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-500 bg-slate-950 border-slate-800 cursor-pointer"
                />
                <label htmlFor="currentRole" className="text-slate-300 font-medium cursor-pointer">
                  Currently working here
                </label>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">General Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of responsibilities and technical context..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Responsibilities List */}
              <div className="space-y-2">
                <label className="block font-mono text-slate-300">Key Responsibilities / Impact</label>
                <div className="space-y-1.5">
                  {formData.responsibilities.map((r, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    >
                      <span className="flex-1 text-xs">• {r}</span>
                      <button
                        type="button"
                        onClick={() => removeResp(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={formData.newResp}
                    onChange={(e) => setFormData({ ...formData, newResp: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addResp();
                      }
                    }}
                    placeholder="Add responsibility bullet..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addResp}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-mono cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Technologies Tags */}
              <div className="space-y-2">
                <label className="block font-mono text-slate-300">Technologies Used</label>
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-mono"
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
                    placeholder="e.g. Python, Docker..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Company Website</label>
                  <input
                    type="text"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono cursor-pointer"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold font-mono transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Saving..." : "Save Experience"}</span>
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
              <h3 className="font-bold text-base text-white">Delete Experience?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove this experience record from the database?
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
