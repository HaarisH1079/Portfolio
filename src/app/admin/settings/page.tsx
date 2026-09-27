"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Database,
  Sparkles,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Server,
  Lock,
  Key,
  RefreshCw,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [dbMode, setDbMode] = useState<string>("fallback");
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const statsRes = await fetch("/api/stats");
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setDbMode(statsData.databaseMode || "fallback");
        }

        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.user);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  const handleSeed = async () => {
    if (!confirm("This will synchronize all 8 portfolio collections with initial templates in MongoDB. Proceed?")) return;
    setIsSeeding(true);
    setSeedNotice(null);

    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedNotice({ type: "success", text: data.message });
      } else {
        setSeedNotice({ type: "error", text: data.message });
      }
    } catch {
      setSeedNotice({ type: "error", text: "Failed to connect to seed endpoint." });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold uppercase tracking-wider">
              Configuration
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-400 mt-1">
            MongoDB connection telemetry, database seeding, and security credentials.
          </p>
        </div>
      </div>

      {seedNotice && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2 text-xs font-medium border ${
            seedNotice.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-amber-950/60 border-amber-500/40 text-amber-300"
          }`}
        >
          {seedNotice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{seedNotice.text}</span>
        </div>
      )}

      {/* 1. Database Configuration */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span>MongoDB Database Engine</span>
          </h2>

          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${
              dbMode === "mongodb"
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-400"
                : "bg-amber-950/60 border-amber-500/40 text-amber-300"
            }`}
          >
            {dbMode === "mongodb" ? "MongoDB Live Connection" : "In-Memory / Fallback Active"}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The CMS is architected with a universal repository layer. When{" "}
          <code className="text-cyan-400 font-mono">MONGODB_URI</code> is defined in{" "}
          <code className="text-cyan-400 font-mono">.env.local</code>, Mongoose executes direct queries on your MongoDB Atlas or local replica set. When offline or unconfigured, the system automatically runs in high-performance fallback mode.
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>Environment Variable:</span>
            <span className="text-white">MONGODB_URI</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Example Connection:</span>
            <span className="text-cyan-300 truncate max-w-xs sm:max-w-md">
              mongodb+srv://admin:pass@cluster.mongodb.net/portfolio
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Database Collections:</span>
            <span className="text-emerald-400">8 managed collections</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
          <div>
            <p className="text-xs font-semibold text-white">Seed Portfolio Collections</p>
            <p className="text-[11px] text-slate-400">
              Populate empty collections with Haarish&apos;s verified project and case study data.
            </p>
          </div>

          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSeeding ? "Syncing..." : "Seed Database Now"}</span>
          </button>
        </div>
      </div>

      {/* 2. Admin Authentication Details */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Security &amp; Admin Identity</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400">Active Admin User</span>
            <p className="text-sm font-bold text-white">{user?.name || "Haarish Nandakumar"}</p>
            <p className="text-xs font-mono text-cyan-400">{user?.email || "admin@haarish.dev"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400">Session Guard</span>
            <p className="text-sm font-bold text-emerald-400">HMAC-SHA256 Token</p>
            <p className="text-xs font-mono text-slate-400">HTTP-Only Cookie Protected</p>
          </div>
        </div>
      </div>

      {/* 3. Portfolio Architecture Roadmap */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-3 font-mono text-xs">
        <h2 className="uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-2">
          <Server className="w-4 h-4" />
          <span>Architecture Status</span>
        </h2>
        <p className="text-slate-400 leading-relaxed font-sans">
          Phase 1 through Phase 4 CMS foundation is active. All 8 portfolio sections (About, Projects, Skills, Experience, Lab, Blog, Resume, Contact) have dedicated MongoDB-backed CRUD API routes. Public website components consume this centralized database layer.
        </p>
      </div>
    </div>
  );
}
