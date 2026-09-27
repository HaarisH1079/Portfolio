import { Metadata } from "next";
import { BlogRepo } from "@/lib/repository";
import BlogClientView from "@/components/BlogClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Engineering Notes | Haarish Nandakumar",
  description:
    "Technical articles, network protocol analyses, embedded IoT designs, and AI agent architectures.",
};

export default async function BlogPage() {
  const rawPosts = await BlogRepo.getAll({ status: "published" });
  const posts = JSON.parse(JSON.stringify(rawPosts));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          06 // Insights &amp; Technical Writing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Blog &amp; Engineering Notes
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Deep dives into network architecture, microcontroller memory optimization, full-stack design patterns, and lessons learned from production systems.
        </p>
      </div>

      <BlogClientView initialPosts={posts} />
    </div>
  );
}
