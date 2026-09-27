"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Terminal, 
  Menu, 
  X, 
  FileText, 
  Send, 
  Layers, 
  Cpu, 
  GraduationCap, 
  Award, 
  Briefcase, 
  User, 
  Home,
  FlaskConical,
  BookOpen
} from "lucide-react";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Projects", href: "/projects", icon: Layers },
    { name: "Skills", href: "/skills", icon: Cpu },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Lab", href: "/lab", icon: FlaskConical },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Resume", href: "/resume", icon: FileText },
    { name: "Contact", href: "/contact", icon: Send },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-sm shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all">
                <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
                  <span className="font-mono font-bold text-sm text-cyan-400 group-hover:text-cyan-300">
                    &lt;HN/&gt;
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-100 text-sm tracking-wide group-hover:text-cyan-400 transition-colors">
                  Haarish Nandakumar
                </span>
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open to Opportunities
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60 backdrop-blur-sm">
            {navLinks.slice(0, 7).map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenTerminal}
              title="Open Developer CLI"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 hover:border-cyan-500/50 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>CLI</span>
              <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-slate-900 rounded border border-slate-700 text-slate-400 font-sans">~</kbd>
            </button>

            <Link
              href="/resume"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/70 hover:bg-slate-700 border border-slate-700/70 hover:border-slate-500 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span>Resume</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Mobile Menu & Terminal Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg text-cyan-400 bg-slate-800/80 border border-slate-700/60"
              aria-label="Open CLI Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 bg-slate-800/80 border border-slate-700/60 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium text-slate-200 bg-slate-800 border border-slate-700 text-center"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 text-center shadow-md shadow-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
