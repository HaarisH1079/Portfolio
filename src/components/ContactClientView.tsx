"use client";

import { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Phone
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

interface ContactClientViewProps {
  settings: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    availability?: string;
    formEnabled?: boolean;
  };
}

export default function ContactClientView({ settings }: ContactClientViewProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = settings.email || "haarishnandakumar@gmail.com";
  const location = settings.location || "Chennai, India";
  const linkedin = settings.linkedin || "https://linkedin.com/in/haarish-nandakumar";
  const github = settings.github || "https://github.com/HaarishNK";
  const instagram = settings.instagram || "https://instagram.com/haarish_nk";
  const availability = settings.availability || "Open to Full-Time Software Developer & IoT Engineering Roles";
  const formEnabled = settings.formEnabled !== false;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          07 // Transmission Channel
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let&apos;s Connect &amp; Collaborate
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Whether you have a full-time software developer opening, an IoT engineering challenge, or want to discuss technical ideas, I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Channels (Left Column) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white">
              Direct Communication Channels
            </h2>

            {/* Email Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Direct Email
                </span>
                <button
                  onClick={copyEmail}
                  className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${email}`}
                className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors block break-all font-mono"
              >
                {email}
              </a>
            </div>

            {/* LinkedIn */}
            {linkedin && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn Network
                  </span>
                  <p className="text-xs text-slate-300">
                    Connect for professional updates &amp; opportunities
                  </p>
                </div>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* GitHub */}
            {github && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub Repositories
                  </span>
                  <p className="text-xs text-slate-300">
                    Inspect source code, commits, and experiments
                  </p>
                </div>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Location & Status */}
            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Location: {location} (Open to Remote &amp; Relocation)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Response Time: Typically within 24 business hours</span>
              </div>
              {availability && (
                <div className="flex items-center gap-2 text-cyan-300 font-mono pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{availability}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Form (Right Column) */}
        <div className="lg:col-span-7">
          {formEnabled ? (
            <ContactForm />
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Direct Email Inquiries Only</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Web transmission form is currently resting. Please send your inquiries directly to{" "}
                <a href={`mailto:${email}`} className="text-cyan-400 underline">{email}</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
