"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  X,
  Save,
  Tag,
  Calendar,
  AlertTriangle,
  FileText,
} from "lucide-react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal / Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<"write" | "preview">("write");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: { url: "" },
    category: "Networking",
    tags: ["OSPF", "Networking", "CCNA"],
    newTag: "",
    author: "Haarish Nandakumar",
    status: "published",
    publishedAt: new Date().toISOString().split("T")[0],
    seo: {
      metaTitle: "",
      metaDescription: "",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== "All") params.set("category", categoryFilter);
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/blog?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categoryFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const openNewPost = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "## Overview\n\nWrite your technical article here using markdown formatting...\n\n### Architecture\n\n- Key principle 1\n- Key principle 2",
      coverImage: { url: "" },
      category: "Networking",
      tags: [],
      newTag: "",
      author: "Haarish Nandakumar",
      status: "draft",
      publishedAt: new Date().toISOString().split("T")[0],
      seo: {
        metaTitle: "",
        metaDescription: "",
      },
    });
    setActiveEditorTab("write");
    setIsEditorOpen(true);
  };

  const openEditPost = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverImage: { url: post.coverImage?.url || "" },
      category: post.category || "Networking",
      tags: post.tags || [],
      newTag: "",
      author: post.author || "Haarish Nandakumar",
      status: post.status || "published",
      publishedAt: post.publishedAt
        ? new Date(post.publishedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      seo: {
        metaTitle: post.seo?.metaTitle || "",
        metaDescription: post.seo?.metaDescription || "",
      },
    });
    setActiveEditorTab("write");
    setIsEditorOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingPost
        ? prev.slug
        : val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
    }));
  };

  const addTag = () => {
    if (!formData.newTag.trim()) return;
    if (!formData.tags.includes(formData.newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: "",
      });
    } else {
      setFormData({ ...formData, newTag: "" });
    }
  };

  const removeTag = (t: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((item) => item !== t),
    });
  };

  const togglePublish = async (post: any) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      const id = post._id || post.id;
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => ((p._id || p.id) === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch {}
  };

  const handleSave = async (e: React.FormEvent, explicitStatus?: "published" | "draft") => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      status: explicitStatus || formData.status,
    };

    try {
      if (editingPost) {
        const id = editingPost._id || editingPost.id;
        const res = await fetch(`/api/blog/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setPosts((prev) => prev.map((p) => ((p._id || p.id) === id ? updated : p)));
          setIsEditorOpen(false);
        }
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setPosts((prev) => [created, ...prev]);
          setIsEditorOpen(false);
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
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
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
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-bold uppercase tracking-wider">
              Publications
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Blog &amp; Articles CRUD</h1>
          <p className="text-xs text-slate-400 mt-1">
            Technical write-ups, deep-dives into OSPF and IoT architectures, and SEO metadata.
          </p>
        </div>

        <button
          onClick={openNewPost}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
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
              placeholder="Search articles by title or keyword..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Networking">Networking</option>
              <option value="IoT">IoT</option>
              <option value="AI">AI</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono cursor-pointer"
            >
              <option value="All">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-3">
          <BookOpen className="w-8 h-8 mx-auto text-slate-600 mb-1" />
          <p className="font-semibold text-slate-300">No blog posts found</p>
          <p>Click "New Post" to compose an article.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => {
            const id = post._id || post.id;
            return (
              <div
                key={id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-white">{post.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                      {post.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        post.status === "published"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {post.status.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags?.map((t: string) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => togglePublish(post)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                      post.status === "published"
                        ? "bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/40"
                        : "bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40"
                    }`}
                  >
                    {post.status === "published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => openEditPost(post)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(id)}
                    className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Blog Editor Modal (Spec Section 18) */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white">
                {editingPost ? "Edit Blog Article" : "Compose New Article"}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => handleSave(e)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Post Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Understanding OSPF: Area Types & LSAs"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">Article Excerpt</label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short 1-2 sentence preview..."
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono cursor-pointer"
                  >
                    <option value="Networking">Networking</option>
                    <option value="IoT">IoT</option>
                    <option value="AI">AI</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Systems">Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono cursor-pointer"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="block font-mono text-slate-300">Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {formData.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-mono"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
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
                    value={formData.newTag}
                    onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="e.g. OSPF, Wireshark..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Content Editor with Dual Write / Preview Tabs */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <label className="block font-mono text-slate-300">Article Content (Markdown)</label>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveEditorTab("write")}
                      className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors cursor-pointer ${
                        activeEditorTab === "write"
                          ? "bg-amber-500/20 text-amber-300 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveEditorTab("preview")}
                      className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors cursor-pointer ${
                        activeEditorTab === "preview"
                          ? "bg-amber-500/20 text-amber-300 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {activeEditorTab === "write" ? (
                  <textarea
                    rows={12}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="# Main Heading\n\nExplain technical concepts with code blocks and diagrams..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono text-xs leading-relaxed"
                  />
                ) : (
                  <div className="w-full min-h-[300px] max-h-[400px] overflow-y-auto px-5 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed font-sans whitespace-pre-wrap text-sm">
                    {formData.content}
                  </div>
                )}
              </div>

              {/* SEO Block (Spec Section 18) */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <span className="block font-mono text-amber-400 uppercase tracking-wider text-[11px] font-bold">
                  SEO Configuration
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.seo.metaTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaTitle: e.target.value },
                      })
                    }
                    placeholder="Meta Title (e.g. Understanding OSPF | Haarish)"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                  <input
                    type="text"
                    value={formData.seo.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaDescription: e.target.value },
                      })
                    }
                    placeholder="Meta Description..."
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSave(e, "draft")}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition-colors cursor-pointer"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSave(e, "published")}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold font-mono transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Saving..." : "Publish Post"}</span>
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
              <h3 className="font-bold text-base text-white">Delete Post?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove this publication?
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
