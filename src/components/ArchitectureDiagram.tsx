"use client";

import { ArrowRight, CheckCircle2, Cpu, Globe, Server, Database, Smartphone, ShieldCheck } from "lucide-react";

interface ArchitectureDiagramProps {
  steps: string[];
  title?: string;
}

export default function ArchitectureDiagram({ steps, title = "System Architecture & Data Flow" }: ArchitectureDiagramProps) {
  const getIconForStep = (stepText: string, index: number) => {
    const lower = stepText.toLowerCase();
    if (lower.includes("sensor") || lower.includes("fingerprint") || lower.includes("camera") || lower.includes("biometric")) {
      return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
    if (lower.includes("esp8266") || lower.includes("microcontroller") || lower.includes("embedded") || lower.includes("switch")) {
      return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
    if (lower.includes("wi-fi") || lower.includes("network") || lower.includes("stream") || lower.includes("router")) {
      return <Globe className="w-5 h-5 text-indigo-400" />;
    }
    if (lower.includes("gemini") || lower.includes("ai") || lower.includes("fastapi") || lower.includes("webhook") || lower.includes("server")) {
      return <Server className="w-5 h-5 text-amber-400" />;
    }
    if (lower.includes("database") || lower.includes("sheet") || lower.includes("excel") || lower.includes("storage")) {
      return <Database className="w-5 h-5 text-rose-400" />;
    }
    return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  };

  return (
    <div className="w-full my-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <h4 className="text-sm font-semibold text-slate-200 tracking-wide font-mono uppercase">
            {title}
          </h4>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
          End-to-End Pipeline
        </span>
      </div>

      {/* Interactive Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="relative flex flex-col p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                STAGE 0{idx + 1}
              </span>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                {getIconForStep(step, idx)}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium flex-1">
              {step}
            </p>

            <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Active node
              </span>
              {idx < steps.length - 1 && (
                <span className="text-cyan-400 flex items-center gap-1">
                  next <ArrowRight className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
