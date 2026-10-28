import { connectToDatabase } from "@/lib/db";
import { About, IAbout } from "@/models/About";
import { Project, IProject } from "@/models/Project";
import { Skill, ISkill } from "@/models/Skill";
import { Experience, IExperience } from "@/models/Experience";
import { Lab, ILab } from "@/models/Lab";
import { BlogPost, IBlogPost } from "@/models/BlogPost";
import { Resume, IResume } from "@/models/Resume";
import { ContactSetting, IContactSetting } from "@/models/ContactSetting";
import { Message, IMessage } from "@/models/Message";
import { ActivityLog } from "@/models/ActivityLog";
import { PROJECTS, SKILL_CATEGORIES, EXPERIENCES, PERSONAL_INFO } from "@/data/portfolioData";

// Memory storage for offline/fallback mode
interface MemoryStorage {
  about: any;
  projects: any[];
  skills: any[];
  experiences: any[];
  labs: any[];
  blogPosts: any[];
  resumes: any[];
  contactSetting: any;
  messages: any[];
  activityLogs: any[];
}

// Initial mock store data
function getInitialStore(): MemoryStorage {
  const defaultProjects = PROJECTS.map((p, idx) => ({
    _id: `proj_${idx + 1}`,
    id: `proj_${idx + 1}`,
    title: p.title,
    slug: p.slug,
    shortDescription: p.subtitle,
    description: p.summary,
    coverImage: { url: `/projects/${p.slug}.png`, publicId: "" },
    gallery: [{ url: `/projects/${p.slug}.png`, publicId: "" }],
    category: p.category.includes("IoT")
      ? "IoT"
      : p.category.includes("AI")
      ? "AI"
      : p.category.includes("Net")
      ? "Networking"
      : "Web",
    type: "personal",
    technologies: p.tags,
    problem: p.caseStudy?.problem || "",
    solution: p.caseStudy?.solution || "",
    architecture: p.caseStudy?.architecture?.description || "",
    challenges: p.caseStudy?.challenges?.map((c) => `${c.challenge}: ${c.solution}`).join("\n\n") || "",
    results: p.caseStudy?.results?.join("\n") || "",
    futureImprovements: p.caseStudy?.futureWork?.join("\n") || "",
    githubUrl: p.githubUrl || "https://github.com/HaarishNK",
    liveUrl: p.liveUrl || "",
    videoUrl: "",
    featured: p.featured,
    status: "published",
    order: idx + 1,
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const flatSkills: any[] = [];
  let sIdx = 1;
  SKILL_CATEGORIES.forEach((cat) => {
    cat.skills.forEach((s) => {
      flatSkills.push({
        _id: `skill_${sIdx}`,
        id: `skill_${sIdx}`,
        name: s.name,
        category: cat.name,
        description: s.description || `${s.name} development and engineering`,
        yearsExperience: s.level === "Advanced" ? 3 : s.level === "Proficient" ? 2 : 1,
        level: s.level === "Advanced" ? "Advanced" : s.level === "Proficient" ? "Intermediate" : "Beginner",
        icon: cat.icon || "Code",
        featured: !!s.highlight,
        order: sIdx,
        status: "active",
        isDeleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      sIdx++;
    });
  });

  const defaultExperiences = EXPERIENCES.map((exp, idx) => ({
    _id: `exp_${idx + 1}`,
    id: `exp_${idx + 1}`,
    position: exp.role,
    company: exp.company,
    employmentType: exp.type.toLowerCase().includes("intern") ? "internship" : "full-time",
    location: exp.location,
    startDate: exp.period.split("-")[0]?.trim() || "2025",
    endDate: exp.period.split("-")[1]?.trim() || "Present",
    current: exp.period.toLowerCase().includes("present"),
    description: exp.description[0] || "",
    responsibilities: exp.description,
    technologies: exp.technologies,
    companyLogo: { url: "", publicId: "" },
    companyWebsite: "",
    status: "published",
    order: idx + 1,
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const defaultLabs = [
    {
      _id: "lab_1",
      id: "lab_1",
      title: "OSPF Multi-Area Topology & LSA Analysis",
      slug: "ospf-multi-area-topology",
      category: "Networking",
      shortDescription: "GNS3 enterprise network emulation with multi-area OSPF routing and Wireshark packet capture.",
      objective: "Verify SPF calculations, optimize inter-area routing tables, and test link redundancy failovers.",
      description: "Implemented a 5-router OSPF mesh topology in GNS3 with Area 0 (Backbone), Area 1 (HQ), and Area 2 (Branch). Tuned cost metrics and analyzed Type 1, 2, and 3 LSAs in Wireshark.",
      technologies: ["GNS3", "Cisco IOS", "Wireshark", "OSPFv2"],
      images: [{ url: "/labs/ospf-topology.png", publicId: "" }],
      githubUrl: "https://github.com/HaarishNK/ospf-gns3-lab",
      documentationUrl: "https://github.com/HaarishNK",
      status: "published",
      featured: true,
      order: 1,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "lab_2",
      id: "lab_2",
      title: "ESP8266 Low-Power Deep Sleep Telemetry Node",
      slug: "esp8266-deep-sleep-telemetry",
      category: "IoT",
      shortDescription: "Optimizing 18650 battery life on ESP8266 using timed deep sleep and fast Wi-Fi handshakes.",
      objective: "Achieve 6+ months battery lifespan for remote environmental sensor beacons.",
      description: "Programmed ESP8266 to wake up every 15 minutes, read DHT22 and battery voltage, transmit telemetry via UDP to MQTT gateway within 850ms, and enter 20uA deep sleep.",
      technologies: ["ESP8266", "C++", "MQTT", "Hardware Sleep"],
      images: [{ url: "/labs/esp8266-deep-sleep.png", publicId: "" }],
      githubUrl: "https://github.com/HaarishNK/esp8266-lowpower",
      documentationUrl: "",
      status: "published",
      featured: true,
      order: 2,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "lab_3",
      id: "lab_3",
      title: "Autonomous AI Agent Tool-Calling Benchmark",
      slug: "ai-agent-tool-calling-benchmark",
      category: "AI",
      shortDescription: "Measuring tool calling latency and reasoning consistency across local LLMs vs Cloud APIs.",
      objective: "Benchmark structured JSON generation reliability under edge network constraints.",
      description: "Created a test harness running 50 synthetic multi-step agent reasoning tasks invoking Python sandbox tools, comparing Claude 3.5, Gemini 1.5, and local Ollama Mistral.",
      technologies: ["Python", "FastAPI", "Gemini API", "Ollama"],
      images: [],
      githubUrl: "https://github.com/HaarishNK/agent-benchmark",
      documentationUrl: "",
      status: "published",
      featured: false,
      order: 3,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const defaultBlogPosts = [
    {
      _id: "blog_1",
      id: "blog_1",
      title: "Understanding OSPF: Area Design, LSA Types, and Metric Tuning",
      slug: "understanding-ospf-area-design-lsas",
      excerpt: "A deep dive into Open Shortest Path First (OSPF), Dijkstra's SPF algorithm, and multi-area routing topologies.",
      content: `## Introduction to OSPF

Open Shortest Path First (OSPF) is an Interior Gateway Protocol (IGP) designed for IP networks. Based on Edsger Dijkstra’s Shortest Path First (SPF) algorithm, OSPF enables routers to independently calculate the loop-free path of least cost to any reachable destination.

### Why Multi-Area OSPF Matters
In large routing domains, a single flat topology results in large Link State Databases (LSDB), heavy CPU recalculations whenever an interface flaps, and massive routing tables.

Dividing the autonomous system into areas:
1. **Area 0 (Backbone)**: The core transit highway.
2. **Standard / Stub Areas**: Isolate internal topology details.
3. **ABRs (Area Border Routers)**: Generate Type 3 Summary LSAs and summarize prefixes.

### Key Takeaway
Proper metric tuning and area summarization reduce routing table overhead by up to 75% on edge enterprise routers.`,
      coverImage: { url: "/blog/ospf-cover.png", publicId: "" },
      category: "Networking",
      tags: ["OSPF", "Networking", "CCNA", "Cisco"],
      author: "Haarish Nandakumar",
      status: "published",
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      seo: {
        metaTitle: "Understanding OSPF: Area Design & LSAs | Haarish Nandakumar",
        metaDescription: "In-depth guide to OSPF routing protocol, Link State Advertisements, and enterprise network design.",
      },
      isDeleted: false,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "blog_2",
      id: "blog_2",
      title: "Architecting an IoT Biometric Attendance System with ESP8266 & Micro-Controllers",
      slug: "architecting-iot-biometric-attendance-system",
      excerpt: "Engineering a robust edge-to-cloud biometric terminal with hardware encryption and offline caching.",
      content: `## System Architecture

When designing a production hardware attendance terminal, reliability under flaky Wi-Fi is paramount.

### Hardware Stack
- **NodeMCU (ESP8266)** 80MHz micro-controller
- **R307 Optical Fingerprint Sensor** with UART interface
- **0.96 inch I2C OLED Display** for instantaneous feedback
- **Hardware Watchdog Timer (WDT)** for automatic hang recovery

### Resilient Data Flow
When an authenticated fingerprint is scanned:
1. Local template comparison occurs in 400ms on the optical module.
2. If Wi-Fi is reachable, an HTTPS POST payload with HMAC signature is dispatched.
3. If network drops, the scan is queued into SPIFFS Flash memory and drained once reconnection occurs.`,
      coverImage: { url: "/blog/iot-gym-cover.png", publicId: "" },
      category: "IoT",
      tags: ["IoT", "ESP8266", "Embedded", "Hardware"],
      author: "Haarish Nandakumar",
      status: "published",
      publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
      seo: {
        metaTitle: "Building an ESP8266 Biometric System | Haarish Nandakumar",
        metaDescription: "How to design a reliable IoT biometric logger using ESP8266, UART sensors, and failover cloud sync.",
      },
      isDeleted: false,
      createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const defaultResumes = [
    {
      _id: "res_3",
      id: "res_3",
      fileName: "Haarish_Nandakumar_Resume_2026.pdf",
      fileUrl: "/resume.pdf",
      storageProvider: "local",
      publicId: "",
      version: 3,
      isCurrent: true,
      notes: "Updated with AI agent projects and CCNA routing topology case study.",
      fileSize: "284 KB",
      uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "res_2",
      id: "res_2",
      fileName: "Haarish_Nandakumar_Resume_v2.pdf",
      fileUrl: "/resume-v2.pdf",
      storageProvider: "local",
      publicId: "",
      version: 2,
      isCurrent: false,
      notes: "Included IoT Gym Management System and CSC teaching experience.",
      fileSize: "260 KB",
      uploadedAt: new Date(Date.now() - 86400000 * 45).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "res_1",
      id: "res_1",
      fileName: "Haarish_Nandakumar_Resume_v1.pdf",
      fileUrl: "/resume-v1.pdf",
      storageProvider: "local",
      publicId: "",
      version: 1,
      isCurrent: false,
      notes: "Initial college graduate draft.",
      fileSize: "230 KB",
      uploadedAt: new Date(Date.now() - 86400000 * 120).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 120).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const defaultMessages = [
    {
      _id: "msg_1",
      id: "msg_1",
      name: "Rajesh Kumar",
      email: "rajesh.k@techinnovations.io",
      subject: "Software Engineer Fresher Opening (IoT / Full-Stack)",
      message: "Hi Haarish, We came across your ESP8266 Smart Gym project and were very impressed with the architecture. We have an upcoming role in our IoT and edge computing team and would like to schedule an introductory call.",
      status: "unread",
      isDeleted: false,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "msg_2",
      id: "msg_2",
      name: "Sarah Jenkins",
      email: "sarah.jenkins@venturesoft.com",
      subject: "AI Agent Project Inquiry & Full-Stack Opportunity",
      message: "Hello Haarish, Loved the AI Stock Analysis case study. Would love to know if you are open to a full-time role in Bangalore or remote.",
      status: "read",
      isDeleted: false,
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const defaultActivityLogs = [
    {
      _id: "act_1",
      id: "act_1",
      action: "update",
      entity: "project",
      title: 'Project "Smart Gym Management System" updated',
      details: "Added biometric circuit diagram and cloud sync case study.",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      _id: "act_2",
      id: "act_2",
      action: "create",
      entity: "skill",
      title: 'Skill "TypeScript" added to Programming category',
      details: "Set level to Advanced with 2 years experience.",
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
    {
      _id: "act_3",
      id: "act_3",
      action: "publish",
      entity: "blog",
      title: 'Blog "Understanding OSPF" published',
      details: "Published with CCNA, Networking, and OSPF tags.",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      _id: "act_4",
      id: "act_4",
      action: "update",
      entity: "resume",
      title: "Resume Version 3 set to current active resume",
      details: "Haarish_Nandakumar_Resume_2026.pdf deployed.",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
  ];

  return {
    about: {
      _id: "about_primary",
      id: "about_primary",
      name: PERSONAL_INFO.name,
      professionalTitle: PERSONAL_INFO.headline,
      shortIntroduction: PERSONAL_INFO.aboutShort,
      fullBiography: `I am an engineering graduate and software developer specializing in modern full-stack development, embedded IoT systems, and intelligent AI applications. I enjoy bridging the gap between physical micro-controllers, network routing protocols, and distributed cloud applications.\n\nMy experience spans building biometric IoT devices with ESP8266, modeling financial sentiment systems using Hugging Face transformers, and configuring multi-area OSPF network topologies in Cisco GNS3.`,
      location: PERSONAL_INFO.location,
      profileImage: "/profile.jpg",
      socialLinks: {
        github: PERSONAL_INFO.github,
        linkedin: PERSONAL_INFO.linkedin,
        email: PERSONAL_INFO.email,
        instagram: PERSONAL_INFO.instagram,
        twitter: "",
      },
      currentlyBuilding: PERSONAL_INFO.currentlyBuilding,
      stats: PERSONAL_INFO.stats,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    projects: defaultProjects,
    skills: flatSkills,
    experiences: defaultExperiences,
    labs: defaultLabs,
    blogPosts: defaultBlogPosts,
    resumes: defaultResumes,
    contactSetting: {
      _id: "contact_primary",
      id: "contact_primary",
      email: PERSONAL_INFO.email,
      phone: PERSONAL_INFO.phone,
      location: PERSONAL_INFO.location,
      linkedin: PERSONAL_INFO.linkedin,
      github: PERSONAL_INFO.github,
      instagram: PERSONAL_INFO.instagram,
      availability: "Open to Full-Time Software Developer & IoT Engineering Roles",
      formEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    messages: defaultMessages,
    activityLogs: defaultActivityLogs,
  };
}

// Global in-memory instance for hot-reloads in Next.js
declare global {
  // eslint-disable-next-line no-var
  var memoryStorage: MemoryStorage | undefined;
}

if (!global.memoryStorage) {
  global.memoryStorage = getInitialStore();
}

const memStore = global.memoryStorage;

// Helper to log activities
export async function logActivity(
  action: "create" | "update" | "delete" | "publish" | "seed",
  entity: "project" | "skill" | "experience" | "lab" | "blog" | "resume" | "about" | "contact" | "system",
  title: string,
  details: string = ""
) {
  const { isConnected } = await connectToDatabase();
  const entry = {
    action,
    entity,
    title,
    details,
    createdAt: new Date(),
  };

  if (isConnected) {
    try {
      await ActivityLog.create(entry);
    } catch {
      // Fallback to memory
      memStore.activityLogs.unshift({ ...entry, _id: `act_${Date.now()}` });
    }
  } else {
    memStore.activityLogs.unshift({ ...entry, _id: `act_${Date.now()}` });
    if (memStore.activityLogs.length > 50) {
      memStore.activityLogs.pop();
    }
  }
}

// REPOSITORIES

export const AboutRepo = {
  async get() {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await About.findOne({ isActive: true });
      if (doc) return doc.toObject();
    }
    return memStore.about;
  },
  async update(data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      let doc = await About.findOne({ isActive: true });
      if (!doc) {
        doc = await About.create({ ...data, isActive: true });
      } else {
        Object.assign(doc, data);
        await doc.save();
      }
      await logActivity("update", "about", `About profile updated for ${data.name || "Haarish"}`);
      return doc.toObject();
    }
    memStore.about = { ...memStore.about, ...data, updatedAt: new Date().toISOString() };
    await logActivity("update", "about", `About profile updated for ${data.name || "Haarish"}`);
    return memStore.about;
  },
};

export const ProjectsRepo = {
  async getAll(filter: { category?: string; status?: string; search?: string } = {}) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const query: any = { isDeleted: false };
      if (filter.category && filter.category !== "All") query.category = filter.category;
      if (filter.status && filter.status !== "All") query.status = filter.status;
      if (filter.search) {
        query.$or = [
          { title: { $regex: filter.search, $options: "i" } },
          { shortDescription: { $regex: filter.search, $options: "i" } },
        ];
      }
      const list = await Project.find(query).sort({ order: 1, createdAt: -1 });
      return list.map((item) => item.toObject());
    }

    let items = memStore.projects.filter((p) => !p.isDeleted);
    if (filter.category && filter.category !== "All") {
      items = items.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter.status && filter.status !== "All") {
      items = items.filter((p) => p.status === filter.status);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      items = items.filter(
        (p) => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
      );
    }
    return items.sort((a, b) => a.order - b.order);
  },
  async getById(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      try {
        const doc = await Project.findOne({ _id: id, isDeleted: false });
        if (doc) return doc.toObject();
      } catch {
        const docBySlug = await Project.findOne({ slug: id, isDeleted: false });
        if (docBySlug) return docBySlug.toObject();
      }
    }
    return (
      memStore.projects.find((p) => (p._id === id || p.id === id || p.slug === id) && !p.isDeleted) || null
    );
  },
  async create(data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Project.create(data);
      await logActivity("create", "project", `Project "${data.title}" added`);
      return doc.toObject();
    }
    const newDoc = {
      ...data,
      _id: `proj_${Date.now()}`,
      id: `proj_${Date.now()}`,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memStore.projects.unshift(newDoc);
    await logActivity("create", "project", `Project "${data.title}" added`);
    return newDoc;
  },
  async update(id: string, data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Project.findByIdAndUpdate(id, data, { new: true });
      if (doc) {
        await logActivity("update", "project", `Project "${doc.title}" updated`);
        return doc.toObject();
      }
    }
    const idx = memStore.projects.findIndex((p) => p._id === id || p.id === id);
    if (idx !== -1) {
      memStore.projects[idx] = {
        ...memStore.projects[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await logActivity("update", "project", `Project "${memStore.projects[idx].title}" updated`);
      return memStore.projects[idx];
    }
    return null;
  },
  async delete(id: string, soft = true) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      if (soft) {
        const doc = await Project.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (doc) {
          await logActivity("delete", "project", `Project "${doc.title}" deleted`);
          return true;
        }
      } else {
        await Project.findByIdAndDelete(id);
        return true;
      }
    }
    const idx = memStore.projects.findIndex((p) => p._id === id || p.id === id);
    if (idx !== -1) {
      const title = memStore.projects[idx].title;
      if (soft) {
        memStore.projects[idx].isDeleted = true;
      } else {
        memStore.projects.splice(idx, 1);
      }
      await logActivity("delete", "project", `Project "${title}" deleted`);
      return true;
    }
    return false;
  },
};

function normalizeSkillCategory(cat?: string): string {
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

export const SkillsRepo = {
  async getAll(filter: { category?: string; search?: string; status?: string } = {}) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const query: any = { isDeleted: false };
      if (filter.category && filter.category !== "All") {
        const norm = normalizeSkillCategory(filter.category);
        const aliases = Array.from(new Set([filter.category, norm]));
        query.category = { $in: aliases.map((a) => new RegExp(`^${a}$`, "i")) };
      }
      if (filter.status && filter.status !== "All") query.status = filter.status;
      if (filter.search) {
        const sQuery = { $regex: filter.search, $options: "i" };
        query.$or = [{ name: sQuery }, { title: sQuery }, { description: sQuery }];
      }
      const list = await Skill.find(query).sort({ order: 1 });
      return list.map((item) => {
        const obj = item.toObject();
        obj.title = obj.title || obj.name;
        obj.name = obj.name || obj.title;
        obj.category = normalizeSkillCategory(obj.category);
        return obj;
      });
    }

    let items = memStore.skills.filter((s) => !s.isDeleted);
    if (filter.category && filter.category !== "All") {
      const norm = normalizeSkillCategory(filter.category).toLowerCase();
      items = items.filter((s) => {
        const sCatNorm = normalizeSkillCategory(s.category).toLowerCase();
        return sCatNorm === norm || s.category.toLowerCase() === filter.category?.toLowerCase();
      });
    }
    if (filter.status && filter.status !== "All") {
      items = items.filter((s) => s.status === filter.status);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      items = items.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.title && s.title.toLowerCase().includes(q)) ||
          (s.description && s.description.toLowerCase().includes(q))
      );
    }
    return items
      .map((s) => ({
        ...s,
        title: s.title || s.name,
        name: s.name || s.title,
        category: normalizeSkillCategory(s.category),
      }))
      .sort((a, b) => a.order - b.order);
  },
  async getById(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      try {
        const doc = await Skill.findOne({ _id: id, isDeleted: false });
        if (doc) {
          const obj = doc.toObject();
          obj.title = obj.title || obj.name;
          obj.name = obj.name || obj.title;
          obj.category = normalizeSkillCategory(obj.category);
          return obj;
        }
      } catch {}
    }
    const mem = memStore.skills.find((s) => (s._id === id || s.id === id) && !s.isDeleted) || null;
    if (mem) {
      return {
        ...mem,
        title: mem.title || mem.name,
        name: mem.name || mem.title,
        category: normalizeSkillCategory(mem.category),
      };
    }
    return null;
  },
  async create(data: any) {
    const skillData = { ...data };
    skillData.name = skillData.name || skillData.title || "";
    skillData.title = skillData.title || skillData.name || "";
    if (skillData.category) {
      skillData.category = normalizeSkillCategory(skillData.category);
    }

    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Skill.create(skillData);
      const obj = doc.toObject();
      obj.title = obj.title || obj.name;
      obj.name = obj.name || obj.title;
      await logActivity("create", "skill", `Skill "${skillData.title || skillData.name}" added`);
      return obj;
    }
    const newDoc = {
      ...skillData,
      _id: `skill_${Date.now()}`,
      id: `skill_${Date.now()}`,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memStore.skills.push(newDoc);
    await logActivity("create", "skill", `Skill "${skillData.title || skillData.name}" added`);
    return newDoc;
  },
  async update(id: string, data: any) {
    const skillData = { ...data };
    if (skillData.name || skillData.title) {
      skillData.name = skillData.name || skillData.title;
      skillData.title = skillData.title || skillData.name;
    }
    if (skillData.category) {
      skillData.category = normalizeSkillCategory(skillData.category);
    }

    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Skill.findByIdAndUpdate(id, skillData, { new: true });
      if (doc) {
        const obj = doc.toObject();
        obj.title = obj.title || obj.name;
        obj.name = obj.name || obj.title;
        await logActivity("update", "skill", `Skill "${obj.title || obj.name}" updated`);
        return obj;
      }
    }
    const idx = memStore.skills.findIndex((s) => s._id === id || s.id === id);
    if (idx !== -1) {
      memStore.skills[idx] = { ...memStore.skills[idx], ...skillData, updatedAt: new Date().toISOString() };
      memStore.skills[idx].title = memStore.skills[idx].title || memStore.skills[idx].name;
      memStore.skills[idx].name = memStore.skills[idx].name || memStore.skills[idx].title;
      await logActivity("update", "skill", `Skill "${memStore.skills[idx].title || memStore.skills[idx].name}" updated`);
      return memStore.skills[idx];
    }
    return null;
  },
  async delete(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Skill.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (doc) {
        await logActivity("delete", "skill", `Skill "${doc.name}" deleted`);
        return true;
      }
    }
    const idx = memStore.skills.findIndex((s) => s._id === id || s.id === id);
    if (idx !== -1) {
      const name = memStore.skills[idx].name;
      memStore.skills[idx].isDeleted = true;
      await logActivity("delete", "skill", `Skill "${name}" deleted`);
      return true;
    }
    return false;
  },
};

export const ExperienceRepo = {
  async getAll(filter: { status?: string } = {}) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const query: any = { isDeleted: false };
      if (filter.status && filter.status !== "All") query.status = filter.status;
      const list = await Experience.find(query).sort({ order: 1 });
      return list.map((item) => item.toObject());
    }
    let items = memStore.experiences.filter((e) => !e.isDeleted);
    if (filter.status && filter.status !== "All") {
      items = items.filter((e) => e.status === filter.status);
    }
    return items.sort((a, b) => a.order - b.order);
  },
  async getById(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      try {
        const doc = await Experience.findOne({ _id: id, isDeleted: false });
        if (doc) return doc.toObject();
      } catch {}
    }
    return memStore.experiences.find((e) => (e._id === id || e.id === id) && !e.isDeleted) || null;
  },
  async create(data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Experience.create(data);
      await logActivity("create", "experience", `Experience "${data.position} at ${data.company}" added`);
      return doc.toObject();
    }
    const newDoc = {
      ...data,
      _id: `exp_${Date.now()}`,
      id: `exp_${Date.now()}`,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memStore.experiences.push(newDoc);
    await logActivity("create", "experience", `Experience "${data.position} at ${data.company}" added`);
    return newDoc;
  },
  async update(id: string, data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Experience.findByIdAndUpdate(id, data, { new: true });
      if (doc) {
        await logActivity("update", "experience", `Experience "${doc.position}" updated`);
        return doc.toObject();
      }
    }
    const idx = memStore.experiences.findIndex((e) => e._id === id || e.id === id);
    if (idx !== -1) {
      memStore.experiences[idx] = {
        ...memStore.experiences[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await logActivity("update", "experience", `Experience "${memStore.experiences[idx].position}" updated`);
      return memStore.experiences[idx];
    }
    return null;
  },
  async delete(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Experience.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (doc) {
        await logActivity("delete", "experience", `Experience "${doc.position}" deleted`);
        return true;
      }
    }
    const idx = memStore.experiences.findIndex((e) => e._id === id || e.id === id);
    if (idx !== -1) {
      const pos = memStore.experiences[idx].position;
      memStore.experiences[idx].isDeleted = true;
      await logActivity("delete", "experience", `Experience "${pos}" deleted`);
      return true;
    }
    return false;
  },
};

export const LabRepo = {
  async getAll(filter: { category?: string; status?: string } = {}) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const query: any = { isDeleted: false };
      if (filter.category && filter.category !== "All") query.category = filter.category;
      if (filter.status && filter.status !== "All") query.status = filter.status;
      const list = await Lab.find(query).sort({ order: 1 });
      return list.map((item) => item.toObject());
    }

    let items = memStore.labs.filter((l) => !l.isDeleted);
    if (filter.category && filter.category !== "All") {
      items = items.filter((l) => l.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter.status && filter.status !== "All") {
      items = items.filter((l) => l.status === filter.status);
    }
    return items.sort((a, b) => a.order - b.order);
  },
  async getById(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      try {
        const doc = await Lab.findOne({ _id: id, isDeleted: false });
        if (doc) return doc.toObject();
      } catch {}
      const docBySlug = await Lab.findOne({ slug: id, isDeleted: false });
      if (docBySlug) return docBySlug.toObject();
    }
    return memStore.labs.find((l) => (l._id === id || l.id === id) && !l.isDeleted) || null;
  },
  async create(data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Lab.create(data);
      await logActivity("create", "lab", `Lab experiment "${data.title}" created`);
      return doc.toObject();
    }
    const newDoc = {
      ...data,
      _id: `lab_${Date.now()}`,
      id: `lab_${Date.now()}`,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memStore.labs.push(newDoc);
    await logActivity("create", "lab", `Lab experiment "${data.title}" created`);
    return newDoc;
  },
  async update(id: string, data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Lab.findByIdAndUpdate(id, data, { new: true });
      if (doc) {
        await logActivity("update", "lab", `Lab experiment "${doc.title}" updated`);
        return doc.toObject();
      }
    }
    const idx = memStore.labs.findIndex((l) => l._id === id || l.id === id);
    if (idx !== -1) {
      memStore.labs[idx] = { ...memStore.labs[idx], ...data, updatedAt: new Date().toISOString() };
      await logActivity("update", "lab", `Lab experiment "${memStore.labs[idx].title}" updated`);
      return memStore.labs[idx];
    }
    return null;
  },
  async delete(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Lab.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (doc) {
        await logActivity("delete", "lab", `Lab "${doc.title}" deleted`);
        return true;
      }
    }
    const idx = memStore.labs.findIndex((l) => l._id === id || l.id === id);
    if (idx !== -1) {
      const title = memStore.labs[idx].title;
      memStore.labs[idx].isDeleted = true;
      await logActivity("delete", "lab", `Lab "${title}" deleted`);
      return true;
    }
    return false;
  },
};

export const BlogRepo = {
  async getAll(filter: { category?: string; status?: string; search?: string } = {}) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const query: any = { isDeleted: false };
      if (filter.category && filter.category !== "All") query.category = filter.category;
      if (filter.status && filter.status !== "All") query.status = filter.status;
      if (filter.search) {
        query.title = { $regex: filter.search, $options: "i" };
      }
      const list = await BlogPost.find(query).sort({ publishedAt: -1, createdAt: -1 });
      return list.map((item) => item.toObject());
    }

    let items = memStore.blogPosts.filter((b) => !b.isDeleted);
    if (filter.category && filter.category !== "All") {
      items = items.filter((b) => b.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter.status && filter.status !== "All") {
      items = items.filter((b) => b.status === filter.status);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      items = items.filter(
        (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
      );
    }
    return items;
  },
  async getById(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      try {
        const doc = await BlogPost.findOne({ _id: id, isDeleted: false });
        if (doc) return doc.toObject();
      } catch {}
      const docBySlug = await BlogPost.findOne({ slug: id, isDeleted: false });
      if (docBySlug) return docBySlug.toObject();
    }
    return (
      memStore.blogPosts.find((b) => (b._id === id || b.id === id || b.slug === id) && !b.isDeleted) || null
    );
  },
  async create(data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await BlogPost.create(data);
      await logActivity(
        data.status === "published" ? "publish" : "create",
        "blog",
        `Blog "${data.title}" created`
      );
      return doc.toObject();
    }
    const newDoc = {
      ...data,
      _id: `blog_${Date.now()}`,
      id: `blog_${Date.now()}`,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memStore.blogPosts.unshift(newDoc);
    await logActivity(
      data.status === "published" ? "publish" : "create",
      "blog",
      `Blog "${data.title}" created`
    );
    return newDoc;
  },
  async update(id: string, data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await BlogPost.findByIdAndUpdate(id, data, { new: true });
      if (doc) {
        await logActivity("update", "blog", `Blog "${doc.title}" updated`);
        return doc.toObject();
      }
    }
    const idx = memStore.blogPosts.findIndex((b) => b._id === id || b.id === id);
    if (idx !== -1) {
      memStore.blogPosts[idx] = {
        ...memStore.blogPosts[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await logActivity("update", "blog", `Blog "${memStore.blogPosts[idx].title}" updated`);
      return memStore.blogPosts[idx];
    }
    return null;
  },
  async delete(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await BlogPost.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (doc) {
        await logActivity("delete", "blog", `Blog "${doc.title}" deleted`);
        return true;
      }
    }
    const idx = memStore.blogPosts.findIndex((b) => b._id === id || b.id === id);
    if (idx !== -1) {
      const title = memStore.blogPosts[idx].title;
      memStore.blogPosts[idx].isDeleted = true;
      await logActivity("delete", "blog", `Blog "${title}" deleted`);
      return true;
    }
    return false;
  },
};

export const ResumeRepo = {
  async getAll() {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const list = await Resume.find().sort({ version: -1 });
      return list.map((item) => item.toObject());
    }
    return [...memStore.resumes].sort((a, b) => b.version - a.version);
  },
  async getCurrent() {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Resume.findOne({ isCurrent: true });
      if (doc) return doc.toObject();
    }
    return memStore.resumes.find((r) => r.isCurrent) || memStore.resumes[0] || null;
  },
  async create(data: { fileName: string; fileUrl: string; notes?: string; fileSize?: string }) {
    const all = await this.getAll();
    const highestVersion = all.length > 0 ? Math.max(...all.map((r) => r.version)) : 0;
    const newVersion = highestVersion + 1;

    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      await Resume.updateMany({}, { isCurrent: false });
      const doc = await Resume.create({
        ...data,
        version: newVersion,
        isCurrent: true,
        uploadedAt: new Date(),
      });
      await logActivity("create", "resume", `Resume version ${newVersion} uploaded`);
      return doc.toObject();
    }

    memStore.resumes.forEach((r) => (r.isCurrent = false));
    const newDoc = {
      ...data,
      _id: `res_${Date.now()}`,
      id: `res_${Date.now()}`,
      version: newVersion,
      isCurrent: true,
      fileSize: data.fileSize || "250 KB",
      uploadedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memStore.resumes.unshift(newDoc);
    await logActivity("create", "resume", `Resume version ${newVersion} uploaded`);
    return newDoc;
  },
  async setCurrent(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      await Resume.updateMany({}, { isCurrent: false });
      const doc = await Resume.findByIdAndUpdate(id, { isCurrent: true }, { new: true });
      if (doc) {
        await logActivity("update", "resume", `Resume version ${doc.version} set to current`);
        return doc.toObject();
      }
    }
    memStore.resumes.forEach((r) => {
      r.isCurrent = r._id === id || r.id === id;
    });
    const cur = memStore.resumes.find((r) => r.isCurrent);
    if (cur) {
      await logActivity("update", "resume", `Resume version ${cur.version} set to current`);
    }
    return cur;
  },
  async delete(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      await Resume.findByIdAndDelete(id);
      return true;
    }
    const idx = memStore.resumes.findIndex((r) => r._id === id || r.id === id);
    if (idx !== -1) {
      memStore.resumes.splice(idx, 1);
      return true;
    }
    return false;
  },
};

export const ContactRepo = {
  async getSettings() {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await ContactSetting.findOne();
      if (doc) return doc.toObject();
    }
    return memStore.contactSetting;
  },
  async updateSettings(data: any) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      let doc = await ContactSetting.findOne();
      if (!doc) {
        doc = await ContactSetting.create(data);
      } else {
        Object.assign(doc, data);
        await doc.save();
      }
      await logActivity("update", "contact", "Contact configuration updated");
      return doc.toObject();
    }
    memStore.contactSetting = { ...memStore.contactSetting, ...data, updatedAt: new Date().toISOString() };
    await logActivity("update", "contact", "Contact configuration updated");
    return memStore.contactSetting;
  },
  async getMessages(filter: { status?: string } = {}) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const query: any = { isDeleted: false };
      if (filter.status && filter.status !== "All") query.status = filter.status;
      const list = await Message.find(query).sort({ createdAt: -1 });
      return list.map((item) => item.toObject());
    }
    let items = memStore.messages.filter((m) => !m.isDeleted);
    if (filter.status && filter.status !== "All") {
      items = items.filter((m) => m.status === filter.status);
    }
    return items;
  },
  async createMessage(data: { name: string; email: string; subject: string; message: string }) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Message.create(data);
      await logActivity("create", "contact", `New inquiry from ${data.name}`);
      return doc.toObject();
    }
    const newDoc = {
      ...data,
      _id: `msg_${Date.now()}`,
      id: `msg_${Date.now()}`,
      status: "unread",
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memStore.messages.unshift(newDoc);
    await logActivity("create", "contact", `New inquiry from ${data.name}`);
    return newDoc;
  },
  async updateMessageStatus(id: string, status: "unread" | "read" | "archived") {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      const doc = await Message.findByIdAndUpdate(id, { status }, { new: true });
      if (doc) return doc.toObject();
    }
    const msg = memStore.messages.find((m) => m._id === id || m.id === id);
    if (msg) {
      msg.status = status;
      msg.updatedAt = new Date().toISOString();
      return msg;
    }
    return null;
  },
  async deleteMessage(id: string) {
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      await Message.findByIdAndUpdate(id, { isDeleted: true });
      return true;
    }
    const msg = memStore.messages.find((m) => m._id === id || m.id === id);
    if (msg) {
      msg.isDeleted = true;
      return true;
    }
    return false;
  },
};

export const StatsRepo = {
  async getDashboardSummary() {
    const { isConnected } = await connectToDatabase();

    if (isConnected) {
      const [
        projectsCount,
        skillsCount,
        experienceCount,
        blogCount,
        labCount,
        messages,
        activityLogs,
      ] = await Promise.all([
        Project.countDocuments({ isDeleted: false }),
        Skill.countDocuments({ isDeleted: false }),
        Experience.countDocuments({ isDeleted: false }),
        BlogPost.countDocuments({ isDeleted: false }),
        Lab.countDocuments({ isDeleted: false }),
        Message.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(10),
        ActivityLog.find().sort({ createdAt: -1 }).limit(12),
      ]);

      const unreadMessagesCount = messages.filter((m) => m.status === "unread").length;

      return {
        stats: {
          projects: projectsCount,
          skills: skillsCount,
          experience: experienceCount,
          blogPosts: blogCount,
          labProjects: labCount,
          messages: messages.length,
          unreadMessages: unreadMessagesCount,
        },
        recentActivity: activityLogs.map((a) => a.toObject()),
        recentMessages: messages.map((m) => m.toObject()),
        databaseMode: "mongodb",
      };
    }

    const projectsCount = memStore.projects.filter((p) => !p.isDeleted).length;
    const skillsCount = memStore.skills.filter((s) => !s.isDeleted).length;
    const experienceCount = memStore.experiences.filter((e) => !e.isDeleted).length;
    const blogCount = memStore.blogPosts.filter((b) => !b.isDeleted).length;
    const labCount = memStore.labs.filter((l) => !l.isDeleted).length;
    const activeMessages = memStore.messages.filter((m) => !m.isDeleted);
    const unreadMessagesCount = activeMessages.filter((m) => m.status === "unread").length;

    return {
      stats: {
        projects: projectsCount,
        skills: skillsCount,
        experience: experienceCount,
        blogPosts: blogCount,
        labProjects: labCount,
        messages: activeMessages.length,
        unreadMessages: unreadMessagesCount,
      },
      recentActivity: memStore.activityLogs.slice(0, 12),
      recentMessages: activeMessages.slice(0, 10),
      databaseMode: "fallback",
    };
  },
};

// Seed function to copy memory seed into MongoDB when connected
export async function seedMongoDatabase() {
  const { isConnected } = await connectToDatabase();
  if (!isConnected) {
    return {
      success: false,
      message: "MongoDB is not connected. Seed cannot push to remote MongoDB cluster. In-memory data is active.",
    };
  }

  const initial = getInitialStore();

  // Upsert About
  await About.deleteMany({});
  await About.create(initial.about);

  // Projects
  await Project.deleteMany({});
  const projectsToInsert = initial.projects.map(({ _id, id, ...rest }) => rest);
  await Project.insertMany(projectsToInsert);

  // Skills
  await Skill.deleteMany({});
  const skillsToInsert = initial.skills.map(({ _id, id, ...rest }) => rest);
  await Skill.insertMany(skillsToInsert);

  // Experiences
  await Experience.deleteMany({});
  const expToInsert = initial.experiences.map(({ _id, id, ...rest }) => rest);
  await Experience.insertMany(expToInsert);

  // Labs
  await Lab.deleteMany({});
  const labsToInsert = initial.labs.map(({ _id, id, ...rest }) => rest);
  await Lab.insertMany(labsToInsert);

  // Blogs
  await BlogPost.deleteMany({});
  const blogsToInsert = initial.blogPosts.map(({ _id, id, ...rest }) => rest);
  await BlogPost.insertMany(blogsToInsert);

  // Resumes
  await Resume.deleteMany({});
  const resumesToInsert = initial.resumes.map(({ _id, id, ...rest }) => rest);
  await Resume.insertMany(resumesToInsert);

  // Contact
  await ContactSetting.deleteMany({});
  await ContactSetting.create(initial.contactSetting);

  // Messages
  await Message.deleteMany({});
  const msgsToInsert = initial.messages.map(({ _id, id, ...rest }) => rest);
  await Message.insertMany(msgsToInsert);

  await logActivity("seed", "system", "MongoDB database seeded from portfolio data templates");

  return {
    success: true,
    message: "MongoDB database successfully populated with all portfolio data models!",
  };
}
