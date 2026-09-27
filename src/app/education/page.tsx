import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Calendar, MapPin, BookOpen, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { EDUCATION } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Education | Haarish Nandakumar",
  description: "Academic background of Haarish Nandakumar at Velammal Engineering College, relevant coursework, and key academic projects.",
};

export default function EducationPage() {
  const edu = EDUCATION[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          05 // Academic Foundation
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education &amp; Academic Training
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Rigorous engineering background establishing deep fundamentals in algorithmic computation, microprocessors, and network protocols.
        </p>
      </div>

      {/* Main Degree Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
              {edu.status}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {edu.degree}
            </h2>
            <p className="text-base sm:text-lg font-semibold text-cyan-400">
              {edu.institution}
            </p>
            <p className="text-xs font-medium text-slate-400">
              {edu.department} &bull; {edu.cgpa}
            </p>
          </div>

          <div className="space-y-1.5 text-xs font-mono text-slate-400 md:text-right">
            <div className="flex items-center md:justify-end gap-1.5 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{edu.period}</span>
            </div>
            <div className="flex items-center md:justify-end gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{edu.location}</span>
            </div>
          </div>
        </div>

        {/* Relevant Coursework */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Core Computer Science &amp; Engineering Coursework</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {edu.coursework.map((course, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Highlights */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-sm font-mono text-emerald-400 font-bold uppercase">
            <Award className="w-4 h-4" />
            <span>Campus Leadership &amp; Engineering Highlights</span>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {edu.academicHighlights.map((hl, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2"></span>
                <span className="leading-relaxed">{hl}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white">Review professional credentials?</h3>
          <p className="text-xs text-slate-400">View verified Cisco CCNA, Python, and IoT certifications.</p>
        </div>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
        >
          <span>Certifications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
