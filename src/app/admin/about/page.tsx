"use client";

import { useState, useEffect } from "react";
import { User, Save, CheckCircle2, AlertCircle, Link as LinkIcon, Sparkles } from "lucide-react";

export default function AdminAboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    professionalTitle: "",
    shortIntroduction: "",
    fullBiography: "",
    location: "",
    profileImage: "",
    currentlyBuilding: "",
    socialLinks: {
      github: "",
      linkedin: "",
      email: "",
      instagram: "",
      twitter: "",
    },
    stats: [
      { label: "Projects Built", value: "15+" },
      { label: "Students Mentored", value: "100+" },
      { label: "Core Domains", value: "4 (Web, IoT, AI, Net)" },
      { label: "Certifications", value: "5+" },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch("/api/about");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || "",
            professionalTitle: data.professionalTitle || "",
            shortIntroduction: data.shortIntroduction || "",
            fullBiography: data.fullBiography || "",
            location: data.location || "",
            profileImage: data.profileImage || "",
            currentlyBuilding: data.currentlyBuilding || "",
            socialLinks: {
              github: data.socialLinks?.github || "",
              linkedin: data.socialLinks?.linkedin || "",
              email: data.socialLinks?.email || "",
              instagram: data.socialLinks?.instagram || "",
              twitter: data.socialLinks?.twitter || "",
            },
            stats: data.stats && data.stats.length > 0 ? data.stats : formData.stats,
          });
        }
      } catch {
        setMessage({ type: "error", text: "Failed to load about profile data." });
      } finally {
        setIsLoading(false);
      }
    }

    loadAbout();
  }, []);

  const handleChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSocialChange = (network: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [network]: val,
      },
    }));
  };

  const handleStatChange = (index: number, key: "label" | "value", val: string) => {
    setFormData((prev) => {
      const updated = [...prev.stats];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, stats: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "About profile saved successfully in database!" });
      } else {
        setMessage({ type: "error", text: "Failed to save changes." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-7 h-7 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold uppercase tracking-wider">
              Profile Management
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">About &amp; Biography CRUD</h1>
          <p className="text-xs text-slate-400 mt-1">
            Single active profile configuration stored in the <code className="text-cyan-400">about</code> collection.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2 text-xs font-medium border ${
            message.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/60 border-rose-500/40 text-rose-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span>Profile Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Professional Title</label>
              <input
                type="text"
                value={formData.professionalTitle}
                onChange={(e) => handleChange("professionalTitle", e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Profile Image URL</label>
              <input
                type="text"
                value={formData.profileImage}
                onChange={(e) => handleChange("profileImage", e.target.value)}
                placeholder="/profile.jpg or https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Short Introduction</label>
            <textarea
              rows={2}
              value={formData.shortIntroduction}
              onChange={(e) => handleChange("shortIntroduction", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Full Biography</label>
            <textarea
              rows={5}
              value={formData.fullBiography}
              onChange={(e) => handleChange("fullBiography", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Currently Building (Banner)</label>
            <input
              type="text"
              value={formData.currentlyBuilding}
              onChange={(e) => handleChange("currentlyBuilding", e.target.value)}
              placeholder="e.g. Multimodal Gemini Agent system & BLE mesh..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Social Links Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Social &amp; Contact Links</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">GitHub URL</label>
              <input
                type="text"
                value={formData.socialLinks.github}
                onChange={(e) => handleSocialChange("github", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">LinkedIn URL</label>
              <input
                type="text"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Public Email</label>
              <input
                type="email"
                value={formData.socialLinks.email}
                onChange={(e) => handleSocialChange("email", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Instagram URL</label>
              <input
                type="text"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleSocialChange("instagram", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Stats Matrix Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Key Metrics &amp; Stats Highlight</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.stats.map((stat, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                  placeholder="Metric Label"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                  placeholder="Value"
                  className="w-28 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 text-xs focus:outline-none focus:border-cyan-500 font-mono font-bold text-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
