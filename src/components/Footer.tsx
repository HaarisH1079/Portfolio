import Link from "next/link";
import { Mail, Shield, Terminal, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md pt-16 pb-12 text-slate-400 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-950/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
                  <span className="font-mono font-bold text-xs text-cyan-400">&lt;HN/&gt;</span>
                </div>
              </div>
              <span className="font-bold text-white tracking-wide">
                {PERSONAL_INFO.name}
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {PERSONAL_INFO.tagline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-mono">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">About Me</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects & Case Studies</Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-cyan-400 transition-colors">Skills & Tech Stack</Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-cyan-400 transition-colors">Lab & Experiments</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog & Engineering Notes</Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-cyan-400 transition-colors">Resume (CV)</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Credentials */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-mono">
              Background
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/experience" className="hover:text-cyan-400 transition-colors">Experience & Teaching</Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-cyan-400 transition-colors">Velammal Engg. College</Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-cyan-400 transition-colors">Cisco CCNA & Certs</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">Get In Touch</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Engineering Scope */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-mono">
              Specialties
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300">ESP8266 & Embedded IoT</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300">Python & Gemini AI</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-300">CCNA & Network Routing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <span>© 2026 Haarish Nandakumar. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Built with Next.js 16 &amp; Tailwind
            </span>

            <Link 
              href="/admin" 
              className="text-slate-400 hover:text-slate-300 text-[11px] font-mono hover:underline"
            >
              admin access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
