import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  BookOpen, 
  ArrowRight 
} from "lucide-react";
import { BlogRepo } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await BlogRepo.getById(slug);
  if (!post || post.isDeleted) return { title: "Article Not Found" };

  return {
    title: post.seo?.metaTitle || `${post.title} | Haarish Nandakumar`,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await BlogRepo.getById(slug);

  if (!post || post.isDeleted || (post.status && post.status !== "published")) {
    notFound();
  }

  const dateStr = post.publishedAt || post.createdAt;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  // Simple clean parser for markdown content blocks
  const renderContentBlocks = (content: string) => {
    const lines = (content || "").split("\n");
    const elements: React.ReactNode[] = [];
    let keyIdx = 0;
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={keyIdx++}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto my-4"
            >
              <code>{codeBuffer.join("\n")}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      const trimmed = line.trim();
      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={keyIdx++} className="text-lg font-bold text-white mt-6 mb-2">
            {trimmed.replace(/^###\s+/, "")}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={keyIdx++} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 pb-2 border-b border-slate-800">
            {trimmed.replace(/^##\s+/, "")}
          </h2>
        );
      } else if (trimmed.startsWith("# ")) {
        elements.push(
          <h1 key={keyIdx++} className="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4">
            {trimmed.replace(/^#\s+/, "")}
          </h1>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        elements.push(
          <li key={keyIdx++} className="text-slate-300 leading-relaxed text-sm sm:text-base ml-4 list-disc">
            {trimmed.replace(/^[-*]\s+/, "")}
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li key={keyIdx++} className="text-slate-300 leading-relaxed text-sm sm:text-base ml-4 list-decimal">
            {trimmed.replace(/^\d+\.\s+/, "")}
          </li>
        );
      } else {
        elements.push(
          <p key={keyIdx++} className="text-slate-300 leading-relaxed text-sm sm:text-base my-3">
            {trimmed}
          </p>
        );
      }
    });

    if (inCodeBlock && codeBuffer.length > 0) {
      elements.push(
        <pre
          key={keyIdx++}
          className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto my-4"
        >
          <code>{codeBuffer.join("\n")}</code>
        </pre>
      );
    }

    return elements;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <User className="w-3.5 h-3.5" />
            <span>{post.author || "Haarish Nandakumar"}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-mono leading-relaxed border-l-2 border-cyan-500 pl-4 py-1">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-800/80">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Main Body */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl">
        {renderContentBlocks(post.content || "")}
      </div>

      {/* Author Card Footer */}
      <footer className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            HN
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{post.author || "Haarish Nandakumar"}</h4>
            <p className="text-xs text-slate-400">Software Developer &amp; Technology Builder</p>
          </div>
        </div>

        <Link
          href="/contact"
          className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
        >
          <span>Discuss this article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </article>
  );
}
