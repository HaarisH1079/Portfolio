"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@haarish.dev");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setErrorMsg(data.error || "Authentication failed. Try 'demo' or 'admin123'.");
      }
    } catch {
      setErrorMsg("Network error occurred while authenticating.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setEmail("admin@haarish.dev");
    setPassword("demo");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@haarish.dev", password: "demo" }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setErrorMsg("Failed to authenticate demo session.");
      }
    } catch {
      setErrorMsg("Network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0b0f1c] rounded-2xl flex items-center justify-center text-cyan-400">
              <Lock className="w-7 h-7" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Portfolio CMS
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Haarish Nandakumar &bull; MongoDB Content Management System
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Admin Email / Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@haarish.dev"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Access Key / Password
                </label>
                <span className="text-[11px] font-mono text-cyan-400/80">
                  code: <code className="text-cyan-300 font-bold">demo</code>
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-[#0e1322] px-3 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Quick Access
            </span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>1-Click Recruiter / Demo Access</span>
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              &larr; Return to Public Portfolio
            </Link>
          </div>
        </div>

        <p className="text-center text-[11px] font-mono text-slate-600">
          Powered by Next.js 16 App Router &bull; MongoDB Database CMS
        </p>
      </div>
    </div>
  );
}
