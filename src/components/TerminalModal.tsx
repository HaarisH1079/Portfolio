"use client";

import { useState, useRef, useEffect } from "react";
import { X, Terminal as TerminalIcon, CornerDownLeft, Trash2, Maximize2, Minimize2 } from "lucide-react";
import { TERMINAL_COMMANDS, PERSONAL_INFO } from "@/data/portfolioData";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string;
  timestamp: string;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: `Welcome to Haarish Nandakumar's Interactive Developer Terminal [v2.4.0-prod]
Type "help" to view available commands or tap the quick-command badges below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !isOpen) {
        // Toggle on backtick
        // handled in parent
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output = "";
    if (TERMINAL_COMMANDS[cleanCmd]) {
      output = TERMINAL_COMMANDS[cleanCmd];
    } else if (cleanCmd === "whoami") {
      output = `visitor@webport-client (Guest Recruiter / Engineering Lead)`;
    } else if (cleanCmd === "date") {
      output = new Date().toString();
    } else if (cleanCmd === "sudo" || cleanCmd.startsWith("sudo")) {
      output = `Permission denied: Haarish retains root access. Try "contact" to request engineering collaboration!`;
    } else if (cleanCmd === "exit" || cleanCmd === "quit") {
      onClose();
      return;
    } else {
      output = `Command not recognized: "${cleanCmd}". Type "help" to see valid commands.`;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cleanCmd,
        output,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputVal("");
  };

  const quickCommands = ["help", "skills", "projects", "experience", "certs", "contact", "bio", "clear"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full ${
          isExpanded ? "max-w-5xl h-[85vh]" : "max-w-3xl h-[65vh]"
        } flex flex-col rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/40 overflow-hidden transition-all duration-300 font-mono`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="flex items-center gap-2 ml-3 text-xs text-slate-300">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>haarish@dev-env: ~ (interactive shell)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title={isExpanded ? "Restore" : "Maximize"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setHistory([])}
              className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Clear Terminal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto text-[11px] text-slate-300">
          <span className="text-slate-400 text-[10px] uppercase tracking-wider shrink-0 font-sans">Quick:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors shrink-0 cursor-pointer"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-200"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-bold">haarish@systems:~$</span>
                <span className="text-cyan-300 font-medium">{item.command}</span>
                <span className="text-[10px] text-slate-400 ml-auto">{item.timestamp}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pl-3 border-l-2 border-slate-800 font-mono">
                {item.output}
              </pre>
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm pt-2">
            <span className="text-emerald-400 font-bold shrink-0">haarish@systems:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommand(inputVal);
                }
              }}
              placeholder="type 'help' or command..."
              className="flex-1 bg-transparent text-cyan-300 outline-none border-none placeholder:text-slate-400 font-mono caret-cyan-400"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="text-slate-400 hover:text-cyan-300 cursor-pointer p-1"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Enter</kbd> to run</span>
          <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
