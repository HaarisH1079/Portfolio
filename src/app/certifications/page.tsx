"use client";

import { useState } from "react";
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Trophy, Target, Users, BookOpen } from "lucide-react";
import { CERTIFICATIONS, ACHIEVEMENTS } from "@/data/portfolioData";
import Link from "next/link";

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState<"certs" | "achievements">("certs");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          06 // Credentials &amp; Honors
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Certifications &amp; Achievements
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Verifiable technical certifications, competitive hackathon recognitions, and leadership milestones.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab("certs")}
          className={`px-5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
            activeTab === "certs"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Certifications ({CERTIFICATIONS.length})
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`px-5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
            activeTab === "achievements"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Achievements &amp; Honors ({ACHIEVEMENTS.length})
        </button>
      </div>

      {/* CERTIFICATIONS TAB */}
      {activeTab === "certs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {cert.title}
                </h3>

                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-slate-400">
                    ID: <span className="text-slate-300">{cert.credentialId}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Core Competencies Tested:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsLearned.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Credential
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACHIEVEMENTS TAB */}
      {activeTab === "achievements" && (
        <div className="space-y-6">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-bold">
                    {ach.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {ach.date}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {ach.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {ach.metrics && (
                <div className="shrink-0 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center sm:w-44 flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Impact Metric
                  </span>
                  <span className="text-sm font-bold text-emerald-400 mt-1 font-mono">
                    {ach.metrics}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
