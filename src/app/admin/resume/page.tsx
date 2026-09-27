"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Download,
  Eye,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Calendar,
  Layers,
  Plus,
  X,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export default function AdminResumePage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [currentResume, setCurrentResume] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal for new resume upload
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fileName: `Haarish_Nandakumar_Resume_${new Date().getFullYear()}.pdf`,
    fileUrl: "/resume.pdf",
    notes: "",
    fileSize: "285 KB",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/resume");
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
        setCurrentResume(data.current || null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleMakeCurrent = async (id: string) => {
    try {
      const res = await fetch(`/api/resume/${id}`, { method: "PATCH" });
      if (res.ok) {
        const data = await res.json();
        setCurrentResume(data.current);
        setResumes((prev) =>
          prev.map((r) => {
            const rId = r._id || r.id;
            return { ...r, isCurrent: rId === id };
          })
        );
      }
    } catch {}
  };

  const handleCreateNewVersion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const created = await res.json();
        setCurrentResume(created);
        setResumes((prev) => [
          created,
          ...prev.map((r) => ({ ...r, isCurrent: false })),
        ]);
        setIsModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/resume/${id}`, { method: "DELETE" });
      if (res.ok) {
        setResumes((prev) => prev.filter((r) => (r._id || r.id) !== id));
        setDeleteConfirmId(null);
      }
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold uppercase tracking-wider">
              Document Lifecycle
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Resume Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Versioned document metadata stored in MongoDB collection <code className="text-cyan-400">resumes</code> with 1-click rollback.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Version</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-7 h-7 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Active / Current Resume Spotlight (Spec Section 20) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 shadow-xl shadow-cyan-950/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  CURRENT ACTIVE RESUME
                </span>
                <span className="text-xs font-mono text-slate-400">
                  v{currentResume?.version || 1}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {currentResume?.fileSize || "280 KB"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    {currentResume?.fileName || "Haarish_Nandakumar_Resume.pdf"}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Uploaded: {new Date(currentResume?.uploadedAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  {currentResume?.notes && (
                    <p className="text-xs text-slate-300 mt-1 italic">
                      &ldquo;{currentResume.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentResume?.fileUrl || "/resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </a>
                <a
                  href={currentResume?.fileUrl || "/resume.pdf"}
                  download
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
              </div>
            </div>
          </div>

          {/* Previous Versions Archive (Spec Section 20) */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Version History &amp; Rollback Archive</span>
            </h2>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Version</th>
                      <th className="py-3 px-4">File Name</th>
                      <th className="py-3 px-4">Date Uploaded</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {resumes.map((r) => {
                      const id = r._id || r.id;
                      return (
                        <tr key={id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            v{r.version}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-200">
                            {r.fileName}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {new Date(r.uploadedAt || r.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-xs italic">
                            {r.notes || "—"}
                          </td>
                          <td className="py-3.5 px-4">
                            {r.isCurrent ? (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                                Current
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                Archived
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {!r.isCurrent && (
                                <button
                                  onClick={() => handleMakeCurrent(id)}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono transition-colors cursor-pointer"
                                  title="Rollback to this version"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Rollback</span>
                                </button>
                              )}
                              <a
                                href={r.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                title="View PDF"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </a>
                              {!r.isCurrent && (
                                <button
                                  onClick={() => setDeleteConfirmId(id)}
                                  className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Upload New Version Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Upload New Resume Version</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewVersion} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-slate-300 mb-1">File Name</label>
                <input
                  type="text"
                  value={formData.fileName}
                  onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  File URL or Public Path
                </label>
                <input
                  type="text"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="/resume.pdf or https://storage.provider/resume.pdf"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Estimated Size</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="285 KB"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Next Version</label>
                  <input
                    type="text"
                    disabled
                    value={`Version ${(currentResume?.version || 1) + 1}`}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Release Notes / Changes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Added CCNA certification and ESP8266 gym project case study..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Publishing..." : "Publish Version"}</span>
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
              <h3 className="font-bold text-base text-white">Delete Resume Version?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove this archived resume version from the database?
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
