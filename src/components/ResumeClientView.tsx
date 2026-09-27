"use client";

import { useState } from "react";
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Mail, 
  MapPin, 
  ArrowLeft,
  FileCheck2,
  ExternalLink
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import Link from "next/link";

interface ResumeClientViewProps {
  currentResume: any;
  about: any;
  experiences: any[];
  projects: any[];
  skills: any[];
}

export default function ResumeClientView({
  currentResume,
  about,
  experiences,
  projects,
  skills,
}: ResumeClientViewProps) {
  const [copied, setCopied] = useState(false);

  const name = about?.name || "Haarish Nandakumar";
  const headline = about?.professionalTitle || "Software Developer & Technology Builder";
  const email = about?.socialLinks?.email || "haarishnandakumar@gmail.com";
  const location = about?.location || "Chennai, India";
  const github = about?.socialLinks?.github || "https://github.com/HaarishNK";
  const linkedin = about?.socialLinks?.linkedin || "https://linkedin.com/in/haarish-nandakumar";
  const resumeUrl = currentResume?.fileUrl || "";

  const handleDownload = () => {
    if (resumeUrl && resumeUrl.startsWith("http")) {
      window.open(resumeUrl, "_blank");
    } else if (resumeUrl) {
      const a = document.createElement("a");
      a.href = resumeUrl;
      a.download = currentResume?.fileName || "Haarish_Nandakumar_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.print();
    }
  };

  const handleCopyText = () => {
    const plainText = `
${name.toUpperCase()}
${headline}
${location} | Email: ${email}
GitHub: ${github} | LinkedIn: ${linkedin}

PROFESSIONAL SUMMARY
${about?.shortIntroduction || about?.fullBiography || "Engineering graduate specializing in modern full-stack web architectures, embedded IoT microcontrollers, and CCNA-grade enterprise networking."}

EDUCATION
Velammal Engineering College, Chennai, India
Bachelor of Engineering (B.E.) | 2022 - 2026

TECHNICAL COMPETENCIES
${skills.map((s) => `• ${s.name} (${s.level || "Proficient"})`).join("\n")}

WORK & TEACHING EXPERIENCE
${experiences.map((e) => `${e.position || e.role} | ${e.company} (${e.period || e.startDate || "2025"})\n${(e.responsibilities || e.description || []).join("\n")}`).join("\n\n")}

FEATURED PROJECTS
${projects.slice(0, 4).map((p) => `${p.title} (${p.category}): ${p.subtitle || p.shortDescription || ""}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Toolbar (Hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        {currentResume?.version && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>Active Release:</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
              v{currentResume.version}
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyText}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Plain Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{resumeUrl ? "Download Current PDF" : "Download / Print"}</span>
          </button>
        </div>
      </div>

      {/* Printable Resume Sheet */}
      <div className="resume-paper p-8 sm:p-12 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-8 text-slate-200">
        {/* RESUME HEADER */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {name}
              </h1>
              <p className="text-base font-semibold text-cyan-400 mt-0.5">
                {headline}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                AI • Web Systems • Embedded IoT • CCNA
              </p>
            </div>

            <div className="text-xs space-y-1 font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </div>
              <div className="flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  github.com/{github.split("/").pop()}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  linkedin.com/in/{linkedin.split("/").pop()}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 1. PROFESSIONAL SUMMARY */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800 pb-1">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {about?.shortIntroduction ||
              "Engineering graduate specializing in modern full-stack web architectures, embedded IoT microcontrollers (ESP8266/ESP32), AI agent workflows, and CCNA-grade enterprise networking. Experienced in breaking down complex technical concepts through classroom instruction and engineering physical systems from circuit breadboards to cloud databases."}
          </p>
        </div>

        {/* 2. TECHNICAL SKILLS */}
        {skills.length > 0 && (
          <div className="space-y-2.5">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800 pb-1">
              Technical Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-300">
              {skills.map((s) => (
                <span
                  key={s._id || s.id || s.name}
                  className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono"
                >
                  <strong className="text-slate-100">{s.name}</strong>
                  <span className="text-cyan-400 ml-1">({s.level})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 3. KEY ENGINEERING PROJECTS */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800 pb-1">
              Featured Engineering Projects
            </h2>

            {projects.slice(0, 4).map((p) => {
              const tags = p.tags || p.technologies || [];
              return (
                <div key={p._id || p.id || p.slug} className="space-y-1 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white">
                    <span className="text-sm font-bold text-slate-100">{p.title}</span>
                    <span className="font-mono text-[11px] text-cyan-400 font-normal">
                      {p.subtitle || p.shortDescription}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {p.summary || p.description}
                  </p>
                  {tags.length > 0 && (
                    <div className="text-[11px] text-slate-400 font-mono">
                      Key Stack: {tags.join(" • ")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 4. EXPERIENCE & INSTRUCTION */}
        {experiences.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800 pb-1">
              Experience &amp; Leadership
            </h2>

            {experiences.map((exp) => {
              const resps: string[] = Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0
                ? exp.responsibilities
                : Array.isArray(exp.description)
                ? exp.description
                : exp.description
                ? [exp.description]
                : [];

              return (
                <div key={exp._id || exp.id || exp.position} className="space-y-1.5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white">
                    <div>
                      <span className="text-sm text-slate-100">{exp.position || exp.role}</span>
                      <span className="text-cyan-400 font-medium"> &mdash; {exp.company}</span>
                    </div>
                    <span className="font-mono text-slate-400 text-[11px] font-normal">
                      {exp.period || (exp.startDate ? `${exp.startDate} – ${exp.endDate || "Present"}` : "")}
                    </span>
                  </div>
                  {resps.length > 0 && (
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {resps.map((item, dIdx) => (
                        <li key={dIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 5. EDUCATION */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800 pb-1">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
            <div>
              <span className="font-bold text-sm text-white">Velammal Engineering College</span>
              <p className="text-slate-300">Bachelor of Engineering (B.E.) &bull; Chennai, India</p>
            </div>
            <div className="font-mono text-slate-400 text-[11px]">
              2022 – 2026
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Relevant Coursework: Computer Networks, Data Structures &amp; Algorithms, Microprocessors, DBMS, Operating Systems.
          </p>
        </div>
      </div>
    </div>
  );
}
