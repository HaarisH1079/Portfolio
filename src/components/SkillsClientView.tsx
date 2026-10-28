"use client";

import { useState, useMemo } from "react";
import { 
  Terminal, 
  Layout, 
  Server, 
  Cpu, 
  Network, 
  Wrench, 
  CheckCircle2, 
  Sparkles,
  Code
} from "lucide-react";

interface SkillItem {
  _id?: string;
  id?: string;
  name: string;
  title?: string;
  category: string;
  description?: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
  yearsExperience?: number;
  featured?: boolean;
  highlight?: boolean;
  order?: number;
  status?: string;
}

interface SkillsClientViewProps {
  initialSkills: SkillItem[];
}

const STANDARD_CATEGORIES_ORDER = [
  "Programming Languages",
  "Frontend Engineering",
  "Backend & Cloud",
  "IoT & Embedded Systems",
  "Networking & CCNA Concepts",
  "Tools & Developer Workflow",
  "AI & Data",
  "Database"
];

function normalizeCategory(cat?: string): string {
  if (!cat) return "Programming Languages";
  const trimmed = cat.trim();
  const lower = trimmed.toLowerCase();
  if (lower === "programming" || lower === "programming language") return "Programming Languages";
  if (lower === "frontend" || lower === "front-end") return "Frontend Engineering";
  if (lower === "backend" || lower === "back-end") return "Backend & Cloud";
  if (lower === "iot" || lower === "iot / hardware" || lower === "hardware") return "IoT & Embedded Systems";
  if (lower === "networking" || lower === "networking & systems") return "Networking & CCNA Concepts";
  if (lower === "tools" || lower === "tools & devops" || lower === "devops") return "Tools & Developer Workflow";
  return trimmed;
}

function getCategoryDescription(catName: string): string {
  const n = catName.toLowerCase();
  if (n.includes("program") || n.includes("lang")) {
    return "Core languages used for systems, algorithms, backend, and hardware programming.";
  }
  if (n.includes("front") || n.includes("web") || n.includes("ui")) {
    return "Building responsive, modern, user-centric interfaces with reactive frameworks.";
  }
  if (n.includes("back") || n.includes("cloud") || n.includes("server")) {
    return "Robust API construction, database modeling, and server-side processing.";
  }
  if (n.includes("iot") || n.includes("embed") || n.includes("hard")) {
    return "Interfacing physical hardware, sensors, microcontrollers, and communication buses.";
  }
  if (n.includes("net") || n.includes("ccna") || n.includes("sys")) {
    return "Enterprise networking principles, routing protocols, and packet inspection.";
  }
  if (n.includes("tool") || n.includes("devops") || n.includes("work")) {
    return "Industry-standard development environment, version control, and debugging.";
  }
  if (n.includes("ai") || n.includes("data")) {
    return "Machine learning models, AI agent integrations, and data engineering.";
  }
  return `Core technologies and engineering proficiencies in ${catName}.`;
}

export default function SkillsClientView({ initialSkills }: SkillsClientViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeProtocolTab, setActiveProtocolTab] = useState<"ccna" | "iot">("ccna");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialSkills.forEach((s) => {
      const cat = normalizeCategory(s.category);
      if (cat) set.add(cat);
    });

    const sortedCats = Array.from(set).sort((a, b) => {
      const idxA = STANDARD_CATEGORIES_ORDER.indexOf(a);
      const idxB = STANDARD_CATEGORIES_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return ["All", ...sortedCats];
  }, [initialSkills]);

  const groupedCategories = useMemo(() => {
    const map = new Map<string, SkillItem[]>();
    initialSkills.forEach((s) => {
      const cat = normalizeCategory(s.category);
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push({
        ...s,
        category: cat,
        name: s.name || s.title || "",
        title: s.title || s.name || "",
      });
    });

    const list: { name: string; skills: SkillItem[]; description?: string }[] = [];
    map.forEach((skills, catName) => {
      list.push({
        name: catName,
        skills: skills.sort((a, b) => (a.order || 0) - (b.order || 0)),
        description: getCategoryDescription(catName),
      });
    });

    return list.sort((a, b) => {
      const idxA = STANDARD_CATEGORIES_ORDER.indexOf(a.name);
      const idxB = STANDARD_CATEGORIES_ORDER.indexOf(b.name);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [initialSkills]);

  const filteredCategories = activeCategory === "All"
    ? groupedCategories
    : groupedCategories.filter((c) => c.name.toLowerCase() === activeCategory.toLowerCase());

  const getCategoryIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("program") || n.includes("lang")) {
      return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
    if (n.includes("front") || n.includes("web") || n.includes("ui")) {
      return <Layout className="w-5 h-5 text-indigo-400" />;
    }
    if (n.includes("back") || n.includes("cloud") || n.includes("server")) {
      return <Server className="w-5 h-5 text-emerald-400" />;
    }
    if (n.includes("iot") || n.includes("embed") || n.includes("hardware")) {
      return <Cpu className="w-5 h-5 text-amber-400" />;
    }
    if (n.includes("net") || n.includes("ccna") || n.includes("sys")) {
      return <Network className="w-5 h-5 text-sky-400" />;
    }
    if (n.includes("ai") || n.includes("data")) {
      return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
    return <Wrench className="w-5 h-5 text-rose-400" />;
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "Expert":
      case "Advanced":
        return "bg-emerald-950/70 border-emerald-500/40 text-emerald-300";
      case "Intermediate":
      case "Proficient":
        return "bg-cyan-950/70 border-cyan-500/40 text-cyan-300";
      case "Beginner":
      case "Working Knowledge":
        return "bg-amber-950/70 border-amber-500/40 text-amber-300";
      default:
        return "bg-slate-800 border-slate-700 text-slate-300";
    }
  };

  return (
    <div className="space-y-16">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Categories Grid */}
      <div className="space-y-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.name} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {getCategoryIcon(category.name)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {category.name}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {category.skills.length} competencies
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill._id || skill.id || skill.name || skill.title}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                          {skill.name || skill.title}
                        </h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelBadgeClass(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      {skill.description && (
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {skill.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        {skill.yearsExperience ? `${skill.yearsExperience} yrs exp` : "Production Ready"}
                      </span>
                      {(skill.featured || skill.highlight) && (
                        <span className="text-cyan-400/90 flex items-center gap-0.5">
                          <Sparkles className="w-3 h-3 text-cyan-400" /> Key Focus
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <p className="text-slate-300 font-semibold text-sm">No skills found in this category</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              Reset Category
            </button>
          </div>
        )}
      </div>

      {/* SPECIAL INTERACTIVE WIDGET: NETWORKING & PROTOCOL ARCHITECTURE */}
      <section className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-white font-mono">
                Interactive Protocol Inspector
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Demonstrating full OSI 7-Layer &amp; IoT stack understanding
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveProtocolTab("ccna")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeProtocolTab === "ccna"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              CCNA Network Model
            </button>
            <button
              onClick={() => setActiveProtocolTab("iot")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeProtocolTab === "iot"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ESP8266 IoT Stack
            </button>
          </div>
        </div>

        {activeProtocolTab === "ccna" ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">L7: Application</div>
              <div className="text-slate-300">HTTP, HTTPS, DNS, DHCP, SSH</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Web dashboards, API transactions, and remote management consoles.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-indigo-400 font-bold">L4: Transport</div>
              <div className="text-slate-300">TCP (3-Way Handshake) &amp; UDP</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Reliable biometric data streams vs fast telemetry broadcasts.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold">L3: Network</div>
              <div className="text-slate-300">IPv4, OSPFv2, Subnetting, NAT/PAT</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Enterprise routing tables, inter-VLAN routing, and WAN translations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-bold">L2: Data Link</div>
              <div className="text-slate-300">Ethernet, 802.1Q VLANs, ARP</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Broadcast isolation, switch access/trunk ports, and MAC table learning.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold">Layer 1: Sensor &amp; Edge</div>
              <div className="text-slate-300">R307 Optical Sensor, GPIO, ADC</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Hardware analog-to-digital conversions and physical interrupts.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">Layer 2: Protocol Bus</div>
              <div className="text-slate-300">UART Serial (57600 baud), I2C, SPI</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Hardware registers, packet buffers, and display controller sync.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-indigo-400 font-bold">Layer 3: Wi-Fi Transport</div>
              <div className="text-slate-300">ESP8266 802.11 b/g/n, TCP Client</div>
              <p className="text-[11px] text-slate-400 font-sans">
                WPA2 authentication, station mode, and socket keep-alive timers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-bold">Layer 4: Cloud Gateway</div>
              <div className="text-slate-300">RESTful HTTPS POST, HMAC Auth</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Encrypted payload delivery to FastAPI backend &amp; Google Cloud storage.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
