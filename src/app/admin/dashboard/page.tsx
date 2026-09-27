"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Cpu,
  Briefcase,
  BookOpen,
  FlaskConical,
  Mail,
  Plus,
  RefreshCw,
  Clock,
  ArrowRight,
  Database,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    projects: 0,
    skills: 0,
    experience: 0,
    blogPosts: 0,
    labProjects: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [activity, setActivity] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [databaseMode, setDatabaseMode] = useState<string>("fallback");
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState("");

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats || {});
        setActivity(data.recentActivity || []);
        setRecentMessages(data.recentMessages || []);
        setDatabaseMode(data.databaseMode || "fallback");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSeedDatabase = async () => {
    if (!confirm("This will synchronize and seed the MongoDB database templates. Proceed?")) return;
    setIsSeeding(true);
    setSeedNotice("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeedNotice(data.message || "Database seeded!");
      await loadDashboardData();
    } catch {
      setSeedNotice("Failed to seed database.");
    } finally {
      setIsSeeding(false);
      setTimeout(() => setSeedNotice(""), 5000);
    }
  };

  const statCards = [
    {
      label: "Projects",
      count: stats.projects,
      href: "/admin/projects",
      icon: FolderGit2,
      color: "text-cyan-400",
      border: "border-cyan-500/20",
      bg: "bg-cyan-950/20",
    },
    {
      label: "Skills",
      count: stats.skills,
      href: "/admin/skills",
      icon: Cpu,
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-950/20",
    },
    {
      label: "Experience",
      count: stats.experience,
      href: "/admin/experience",
      icon: Briefcase,
      color: "text-indigo-400",
      border: "border-indigo-500/20",
      bg: "bg-indigo-950/20",
    },
    {
      label: "Blog Posts",
      count: stats.blogPosts,
      href: "/admin/blog",
      icon: BookOpen,
      color: "text-amber-400",
      border: "border-amber-500/20",
      bg: "bg-amber-950/20",
    },
    {
      label: "Lab Projects",
      count: stats.labProjects,
      href: "/admin/lab",
      icon: FlaskConical,
      color: "text-purple-400",
      border: "border-purple-500/20",
      bg: "bg-purple-950/20",
    },
    {
      label: "Messages",
      count: stats.messages,
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} new` : undefined,
      href: "/admin/contact",
      icon: Mail,
      color: "text-rose-400",
      border: "border-rose-500/20",
      bg: "bg-rose-950/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold uppercase tracking-wider">
              Control Center
            </span>
            <span className="text-xs font-mono text-slate-500">haarish_cms_root</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Portfolio CMS Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Centralized MongoDB-backed content management for all 8 portfolio modules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 text-xs font-mono transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isSeeding ? "Syncing..." : "Seed / Sync DB"}</span>
          </button>
        </div>
      </div>

      {seedNotice && (
        <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{seedNotice}</span>
          </div>
        </div>
      )}

      {/* 1. Statistics Cards Grid (From Specification #4) */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          Database Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className={`p-4 rounded-2xl bg-slate-900/60 border ${card.border} hover:border-slate-700 transition-all group flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {card.label}
                  </span>
                  <div className={`p-1.5 rounded-lg ${card.bg}`}>
                    <Icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-bold font-mono ${card.color}`}>
                    {card.count}
                  </span>
                  {card.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500/40 text-rose-300 font-semibold">
                      {card.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2. Quick Actions (From Specification #4) */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 text-xs font-medium text-slate-200 transition-all group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span>+ Add Project</span>
          </Link>

          <Link
            href="/admin/skills"
            className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 text-xs font-medium text-slate-200 transition-all group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span>+ Add Skill</span>
          </Link>

          <Link
            href="/admin/experience"
            className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 text-xs font-medium text-slate-200 transition-all group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span>+ Add Experience</span>
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 text-xs font-medium text-slate-200 transition-all group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span>+ Write Blog</span>
          </Link>
        </div>
      </section>

      {/* 3. Two-Column Row: Recent Activity & Latest Inbound Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recent Activity Feed</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-500">Live Change Log</span>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            {activity.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                No recent activity recorded yet. Modifications to projects, skills, and posts will stream here.
              </p>
            ) : (
              <div className="space-y-2.5">
                {activity.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs"
                  >
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 mt-0.5 ${
                        item.action === "create"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : item.action === "update"
                          ? "bg-cyan-950 text-cyan-400 border border-cyan-500/30"
                          : item.action === "publish"
                          ? "bg-amber-950 text-amber-400 border border-amber-500/30"
                          : item.action === "delete"
                          ? "bg-rose-950 text-rose-400 border border-rose-500/30"
                          : "bg-indigo-950 text-indigo-400 border border-indigo-500/30"
                      }`}
                    >
                      {item.action}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-200 truncate">{item.title}</p>
                      {item.details && (
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.details}</p>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inbound Messages Stream */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>Inbound Inquiries</span>
            </h2>
            <Link
              href="/admin/contact"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
            {recentMessages.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No inquiries received yet.</p>
            ) : (
              recentMessages.slice(0, 4).map((msg) => (
                <Link
                  key={msg._id || msg.id}
                  href="/admin/contact"
                  className="block p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-colors text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white truncate max-w-[150px]">{msg.name}</span>
                    {msg.status === "unread" && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                    )}
                  </div>
                  <p className="text-cyan-400 font-medium truncate text-[11px]">{msg.subject}</p>
                  <p className="text-slate-400 truncate text-[11px] mt-0.5">{msg.message}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
