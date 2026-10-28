import Link from "next/link";
import { 
  ArrowRight, 
  Download, 
  Mail, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Bot, 
  Network, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Sparkles,
  Terminal,
  Activity,
  Code,
  FlaskConical,
  BookOpen,
  Layout,
  Server,
  Wrench
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import HeroVisual from "@/components/HeroVisual";
import ProjectCard from "@/components/ProjectCard";
import { 
  CERTIFICATIONS, 
  WHAT_I_DO 
} from "@/data/portfolioData";
import { 
  AboutRepo, 
  ProjectsRepo, 
  ExperienceRepo, 
  LabRepo, 
  BlogRepo,
  SkillsRepo 
} from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [about, allProjects, allExperiences, allLabs, allPosts, allSkills] = await Promise.all([
    AboutRepo.get(),
    ProjectsRepo.getAll({ status: "published" }),
    ExperienceRepo.getAll({ status: "published" }),
    LabRepo.getAll({ status: "published" }),
    BlogRepo.getAll({ status: "published" }),
    SkillsRepo.getAll({ status: "active" }),
  ]);

  const name = about?.name || "Haarish Nandakumar";
  const professionalTitle = about?.professionalTitle || "Software Developer & Technology Builder";
  const tagline = about?.shortIntroduction || "I build software, intelligent systems, and practical digital solutions that connect technology with real-world problems.";
  const github = about?.socialLinks?.github || "https://github.com/HaarishNK";
  const linkedin = about?.socialLinks?.linkedin || "https://linkedin.com/in/haarish-nandakumar";
  const email = about?.socialLinks?.email || "haarishnandakumar@gmail.com";
  const currentlyBuilding = about?.currentlyBuilding || "Multimodal Gemini Agent system & BLE mesh telemetry dashboard for smart edge devices.";
  const stats = about?.stats || [
    { label: "Projects", value: `${allProjects.length}+` },
    { label: "Students Mentored", value: "100+" },
    { label: "CCNA Certified", value: "Verified" }
  ];

  const featuredProjects = allProjects.filter((p: any) => p.featured).slice(0, 4);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 4);

  const featuredCerts = CERTIFICATIONS.slice(0, 3);
  const previewExperiences = allExperiences.slice(0, 2);
  const previewLabs = allLabs.slice(0, 3);
  const previewPosts = allPosts.slice(0, 3);

  // Group MongoDB active skills by category
  const skillsByCategory = new Map<string, any[]>();
  allSkills.forEach((s: any) => {
    const cat = s.category || "Programming Languages";
    if (!skillsByCategory.has(cat)) skillsByCategory.set(cat, []);
    skillsByCategory.get(cat)!.push(s);
  });

  const getDomainIcon = (title: string) => {
    const n = title.toLowerCase();
    if (n.includes("program") || n.includes("lang")) return <Terminal className="w-5 h-5 text-cyan-400" />;
    if (n.includes("front") || n.includes("web") || n.includes("ui")) return <Layout className="w-5 h-5 text-indigo-400" />;
    if (n.includes("back") || n.includes("cloud") || n.includes("server")) return <Server className="w-5 h-5 text-emerald-400" />;
    if (n.includes("iot") || n.includes("embed") || n.includes("hardware")) return <Cpu className="w-5 h-5 text-amber-400" />;
    if (n.includes("net") || n.includes("ccna") || n.includes("sys")) return <Network className="w-5 h-5 text-sky-400" />;
    return <Wrench className="w-5 h-5 text-rose-400" />;
  };

  const domainCards = WHAT_I_DO.map((item) => {
    const matchedSkills = skillsByCategory.get(item.title) || [];
    const topSkillNames = matchedSkills.slice(0, 4).map((s: any) => s.title || s.name);
    return {
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      skillsCount: matchedSkills.length,
      topSkills: topSkillNames.join(" • "),
    };
  });

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        {/* Background glow and subtle cyber pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/10 to-emerald-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Introduction & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Engineering Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-medium text-slate-300">
                  Engineering Fresher &bull; 2026 Batch
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base font-mono text-cyan-400 tracking-wider">
                  Hi, I&apos;m
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                  {name}
                </h1>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-indigo-200 to-emerald-300 bg-clip-text text-transparent">
                  {professionalTitle}
                </p>
              </div>

              {/* Positioning Subheading */}
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  Software &bull; Web &amp; AI
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  Hardware &bull; IoT &amp; Embedded
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  Infrastructure &bull; CCNA Networking
                </span>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed">
                {tagline}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all group"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/resume"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm flex items-center gap-2 border border-slate-700/80 transition-all"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Resume (CV)</span>
                </Link>

                <Link
                  href="/contact"
                  className="px-5 py-3 rounded-xl bg-transparent hover:bg-slate-900 text-slate-300 hover:text-cyan-300 font-medium text-sm border border-slate-800 hover:border-cyan-500/40 transition-all"
                >
                  <span>Let&apos;s Connect</span>
                </Link>
              </div>

              {/* Social Links & Quick Stats */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                    aria-label="GitHub"
                  >
                     <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <div className="h-4 w-px bg-slate-800 hidden sm:block" />

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  {stats.map((st: any, sIdx: number) => (
                    <div key={sIdx}>
                      <span className="text-white font-bold">{st.value}</span> {st.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Developer Visual */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME SUMMARY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-3xl pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  01 // Profile &amp; Background
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Engineering with Depth: From Firmware to Cloud
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                I am an engineering graduate from <span className="text-white font-medium">Velammal Engineering College</span> with a distinctive dual focus: physical hardware systems (microcontrollers, sensors, and CCNA-level networking) and modern software architecture (Next.js, Python, and AI agents).
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Rather than learning only frontend interfaces or treating hardware as a black box, I understand how data traverses the full stack: from electrical pins and serial buffers to transport protocols, REST APIs, and responsive user experiences.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Explore My Journey (2022 &ndash; 2026)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quote / Philosophy Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Guiding Philosophy
                </span>
                <blockquote className="text-sm font-medium text-slate-200 italic leading-snug">
                  &ldquo;I believe technology is valuable when it solves real problems.&rdquo;
                </blockquote>
              </div>
              <p className="text-xs text-slate-400">
                Focusing on clean architecture, resilient hardware fallbacks, and real user value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECH STACK / CORE CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              02 // Technical Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tech Stack &amp; Specializations
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Technologies tested through hands-on development, physical lab circuits, and classroom teaching.
            </p>
          </div>
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
          >
            <span>View All Competencies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainCards.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all">
                    {getDomainIcon(item.title)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.skillsCount > 0 ? `${item.skillsCount} competencies` : `DOMAIN 0${idx + 1}`}
                  </span>
                </div>
                <div className="mb-2">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {item.subtitle}
                    </span>
                  )}
                </div>
                {item.topSkills ? (
                  <p className="text-[11px] font-mono text-cyan-400/90 mb-2 truncate">
                    {item.topSkills}
                  </p>
                ) : null}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              03 // Engineering Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Projects &amp; Case Studies
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Real systems built with clear problems, architectural reasoning, and measurable results. Click any project for the deep case study.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            <span>View All Projects ({allProjects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((project: any) => (
              <ProjectCard key={project._id || project.id || project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-sm">
            Projects configured in Admin will appear here.
          </div>
        )}
      </section>

      {/* 5. EXPERIENCE & TEACHING PREVIEW */}
      {previewExperiences.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                04 // Professional Growth
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Experience &amp; Leadership
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Practical application through programming instruction and independent client projects.
              </p>
            </div>
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>Detailed Experience Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {previewExperiences.map((exp: any) => {
              const resps = Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0
                ? exp.responsibilities
                : Array.isArray(exp.description)
                ? exp.description
                : exp.description ? [exp.description] : [];

              return (
                <div
                  key={exp._id || exp.id || exp.position}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                        {exp.period || exp.startDate || "Present"}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {exp.location}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">
                        {exp.position || exp.role}
                      </h3>
                      <p className="text-sm text-cyan-400/90 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                      {resps.slice(0, 3).map((item: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap md:flex-col gap-1.5 shrink-0 md:w-48">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                        Technologies
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.slice(0, 6).map((t: string) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700/60 text-[10px] text-slate-300 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. LAB & EXPERIMENTS SHOWCASE */}
      {previewLabs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                05 // Research &amp; Experiments
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Engineering Lab
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Benchmarking hardware limits, packet capture analysis, and prototype architectures.
              </p>
            </div>
            <Link
              href="/lab"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>Explore All Labs ({allLabs.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewLabs.map((lab: any) => (
              <div
                key={lab._id || lab.id || lab.slug}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {lab.category}
                    </span>
                    <FlaskConical className="w-4 h-4 text-cyan-400" />
                  </div>
                  <Link href={`/lab/${lab.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {lab.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {lab.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/lab/${lab.slug}`}
                    className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Inspect Lab</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. LATEST BLOG POSTS SHOWCASE */}
      {previewPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                06 // Insights &amp; Writing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Latest Engineering Articles
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Technical write-ups exploring networking, distributed systems, and edge IoT devices.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>View All Articles ({allPosts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewPosts.map((post: any) => (
              <div
                key={post._id || post.id || post.slug}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                      {post.category}
                    </span>
                    <BookOpen className="w-4 h-4 text-slate-400" />
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. CURRENTLY BUILDING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  Live Lab Telemetry
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h3 className="text-base font-bold text-white">
                Currently Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {currentlyBuilding}
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
          >
            Collaborate
          </Link>
        </div>
      </section>

      {/* 9. LET'S CONNECT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Available For Immediate Opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Let&apos;s Build Systems Together
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Seeking roles in Software Development, IoT Systems, Full-Stack Engineering, or Technical Solutions. Ready to contribute from day one.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all"
            >
              Get In Touch
            </Link>

            <Link
              href="/resume"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              Download Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
