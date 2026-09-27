"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TerminalModal from "@/components/TerminalModal";
import { Terminal as TerminalIcon } from "lucide-react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on ~ key when not in an input
      if (e.key === "~" || e.key === "`") {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          setTerminalOpen(prev => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isAdmin) {
    return <div className="min-h-screen bg-[#070a12] text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      
      <main className="flex-1 pt-20">
        {children}
      </main>

      <Footer />

      {/* Interactive Developer Terminal Modal */}
      <TerminalModal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      {/* Floating CLI Terminal Toggle Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <button
          onClick={() => setTerminalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 shadow-xl shadow-black/50 backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          aria-label="Open Interactive Terminal"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <TerminalIcon className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
          <span className="text-xs font-mono font-medium hidden sm:inline">
            CLI
          </span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-950 rounded border border-slate-700 text-slate-400 font-mono">
            ~
          </kbd>
        </button>
      </div>
    </div>
  );
}
