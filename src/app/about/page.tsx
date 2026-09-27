import { Metadata } from "next";
import Link from "next/link";
import { 
  GraduationCap, 
  MapPin, 
  Award, 
  Code, 
  ArrowRight,
  Sparkles,
  Briefcase
} from "lucide-react";
import { JOURNEY_TIMELINE, WHAT_I_DO } from "@/data/portfolioData";
import { AboutRepo } from "@/lib/repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Me | Haarish Nandakumar",
  description: "Learn about Haarish Nandakumar's background, engineering journey (2022-2026), core specializations, and engineering philosophy.",
};

export default async function AboutPage() {
  const about = await AboutRepo.get();

  const name = about?.name || "Haarish Nandakumar";
  const professionalTitle = about?.professionalTitle || "Software Developer & Technology Builder";
  const shortIntro = about?.shortIntroduction || "I don't just write code for screens—I bridge physical sensors, embedded microcontrollers, network protocols, and intelligent software to solve real-world operational problems.";
  const fullBiography = about?.fullBiography || "";
  const location = about?.location || "Chennai, India";
  const stats = about?.stats || [
    { label: "Degree", value: "B.E. (2022–2026)" },
    { label: "Location", value: location },
    { label: "Focus", value: "Full-Stack & Embedded IoT" }
  ];
  const currentlyBuilding = about?.currentlyBuilding;

  // Split bio by double line breaks for paragraph rendering
  const bioParagraphs = fullBiography
    ? fullBiography.split(/\n\n+/).filter(Boolean)
    : [
        `Hello! I am ${name}, an engineering fresher from Velammal Engineering College in Chennai, graduating in 2026.`,
        "My curiosity in technology began with fundamental computing and algorithms, but quickly evolved into an engineering mindset: how do software applications reliably communicate with the physical world?",
        "This curiosity led me to explore both ends of the engineering spectrum. On one side, I design modern responsive web applications and AI agents using Next.js, Python, and the Gemini API. On the other side, I solder circuit breadboards, program ESP8266/ESP32 microcontrollers in embedded C++, and configure enterprise-grade Cisco CCNA networks with OSPF routing and VLANs.",
        "In 2025, I had the privilege of serving as a Programming Instructor at CSC Computer Education, where I taught Python, C/C++, and Web Development to more than 100 students. Teaching reinforced the importance of writing clear, maintainable code and breaking down complex computer science architectures into intuitive mental models."
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* SECTION 1: HEADER & INTRODUCTION */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            01 // About Me
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineer, Builder &amp; Problem Solver
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            {shortIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Main Bio Card */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              {bioParagraphs.map((para: string, idx: number) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Snapshot Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Degree</div>
                  <div className="text-xs font-semibold text-slate-200">B.E. Engineering (2022–2026)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Location</div>
                  <div className="text-xs font-semibold text-slate-200">{location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Focus</div>
                  <div className="text-xs font-semibold text-slate-200">{professionalTitle}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats / Highlights Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                Core Domains At A Glance
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Software Development</span>
                  <span className="text-[11px] font-mono text-cyan-400">Python / Next.js</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Embedded Systems &amp; IoT</span>
                  <span className="text-[11px] font-mono text-emerald-400">ESP8266 / C++</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Networking &amp; Security</span>
                  <span className="text-[11px] font-mono text-indigo-400">CCNA / OSPF / VLAN</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">AI &amp; Automation</span>
                  <span className="text-[11px] font-mono text-amber-400">Gemini / OpenCV</span>
                </div>
              </div>
            </div>

            {currentlyBuilding && (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Currently Building</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentlyBuilding}
                </p>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 space-y-3">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
                Career Direction
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seeking a Software Development, IoT Engineering, or Full-Stack role where I can build dependable systems, automate workflows, and collaborate with forward-thinking engineering teams.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>Initiate Contact</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MY JOURNEY TIMELINE */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            02 // Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Engineering Journey (2022 &ndash; 2026)
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            A chronological timeline of milestones, skills acquisition, and technical projects.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10">
          {JOURNEY_TIMELINE.map((item) => (
            <div key={item.year} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-md shadow-cyan-400/30" />

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 group-hover:border-slate-700 transition-all space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    {item.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-300/90 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: WHAT I DO */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            03 // Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What I Do &amp; How I Build
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            Architecting across the hardware, protocol, and cloud spectrum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_I_DO.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: PERSONAL PHILOSOPHY */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 relative overflow-hidden space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            04 // Engineering Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Personal Philosophy &amp; Mindset
          </h2>
          <blockquote className="text-lg sm:text-xl font-semibold text-cyan-300 italic pl-4 border-l-4 border-cyan-400">
            &ldquo;I believe technology is valuable when it solves real problems.&rdquo;
          </blockquote>
          <p className="text-sm text-slate-300 leading-relaxed">
            Too often in software development, complexity is mistaken for sophistication. My philosophy is grounded in pragmatic engineering:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
            <li><strong className="text-white">Reliability over Hype:</strong> Systems must fail gracefully, whether dealing with a dropped Wi-Fi frame on an ESP8266 or an API timeout.</li>
            <li><strong className="text-white">Clean Boundaries:</strong> Separation between presentation layers, business logic, deterministic computations, and AI reasoning.</li>
            <li><strong className="text-white">User-Centered Impact:</strong> If a system doesn&apos;t make someone&apos;s daily routine faster, cheaper, or safer, it hasn&apos;t achieved its purpose.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 5: BEYOND CODE (CHESS & TACTICS) */}
      <section className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            05 // Beyond the Terminal
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Chess, Strategy &amp; Mentorship
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
          <p>
            Outside of programming and hardware prototyping, I am an avid competitive chess player. Chess has trained my ability to evaluate deep positional branches, anticipate opponent moves, and make calm, calculated decisions under strict time controls—qualities that directly translate to debugging mission-critical systems.
          </p>
          <p>
            I am also passionate about teaching and knowledge-sharing. Having trained over 100 students at CSC Computer Education, I know that true mastery of a subject is proven by one&apos;s ability to explain it clearly to beginners.
          </p>
        </div>
      </section>
    </div>
  );
}
