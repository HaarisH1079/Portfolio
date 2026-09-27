export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'AI / ML' | 'IoT / Embedded' | 'Full-Stack' | 'Systems & Networking' | 'Python';
  featured: boolean;
  summary: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    architecture: {
      description: string;
      flow: string[];
    };
    technologies: {
      name: string;
      purpose: string;
    }[];
    challenges: {
      challenge: string;
      solution: string;
    }[];
    results: string[];
    futureWork: string[];
  };
}

export interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: string; // 'Advanced' | 'Proficient' | 'Working Knowledge'
    highlight?: boolean;
    description?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skillsLearned: string[];
  link?: string;
  featured?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Technical' | 'Competitions' | 'Leadership & Mentorship' | 'Sports & Strategy';
  date: string;
  description: string;
  metrics?: string;
}

export const PERSONAL_INFO = {
  name: "Haarish Nandakumar",
  headline: "Software Developer & Technology Builder",
  subheadline: " AI • Web Systems • Networking",
  tagline: "I build software, intelligent systems, and practical digital solutions that connect technology with real-world problems.",
  aboutShort: "Engineering graduate specializing in modern full-stack engineering, embedded IoT systems, and AI applications. Passionate about building robust systems from microcontrollers and network protocols to distributed web architectures.",
  location: "Chennai, India",
  email: "haarishnandakumar@gmail.com",
  phone: "+91 98765 43210",
  github: "https://github.com/HaarishNK",
  linkedin: "https://linkedin.com/in/haarish-nandakumar",
  instagram: "https://instagram.com/haarish_nk",
  stats: [
    { label: "Projects Built", value: "15+" },
    { label: "Students Mentored", value: "100+" },
    { label: "Core Domains", value: "4 (Web, IoT, AI, Net)" },
    { label: "Certifications", value: "5+" }
  ],
  currentlyBuilding: "Multimodal Gemini Agent system & BLE mesh telemetry dashboard for smart edge devices."
};

export const JOURNEY_TIMELINE = [
  {
    year: "2022",
    title: "Engineering Foundation",
    description: "Commenced Bachelor's in Engineering at Velammal Engineering College. Mastered C/C++, Data Structures, discrete mathematics, and fundamental engineering disciplines."
  },
  {
    year: "2023",
    title: "Programming & Full-Stack Web Development",
    description: "Expanded into Python, JavaScript, React, and modern backend architectures. Built database-driven applications and deepened understanding of REST APIs and algorithms."
  },
  {
    year: "2024",
    title: "IoT, Microcontrollers & Hardware Systems",
    description: "Dove into physical computing: ESP8266, ESP32, Arduino, biometric sensors, UART/I2C communication, and cloud telemetry integration (Google Sheets / Firebase)."
  },
  {
    year: "2025",
    title: "Programming Instructor & Industry Experience",
    description: "Served as Programming Instructor at CSC Computer Education, teaching Python, algorithms, and web concepts to over 100 students while delivering real-world client solutions."
  },
  {
    year: "2026",
    title: "Software & AI Solutions Architect",
    description: "Designing end-to-end applications combining Gemini LLM agents, CCNA-grade networking architectures, and production-ready Next.js cloud platforms."
  }
];

export const WHAT_I_DO = [
  {
    icon: "Code",
    title: "Software Development",
    description: "Developing clean, modular codebases using Python, TypeScript, C++, and modern engineering design patterns."
  },
  {
    icon: "Globe",
    title: "Web Development",
    description: "Architecting high-performance web applications with Next.js, React, Node.js, Tailwind CSS, and RESTful APIs."
  },
  {
    icon: "Bot",
    title: "AI & Automation",
    description: "Implementing AI-driven agents, OpenCV computer vision pipelines, and intelligent automated workflows using Gemini and Python."
  },
  {
    icon: "Cpu",
    title: "IoT & Embedded Systems",
    description: "Engineering real-world physical systems with ESP8266/ESP32, sensors, Wi-Fi networking, and telemetry pipelines."
  },
  {
    icon: "Network",
    title: "Networking & Infrastructure",
    description: "Configuring robust network topologies, VLAN segmentation, routing protocols (OSPF/BGP), NAT/PAT, and packet security."
  },
  {
    icon: "BarChart3",
    title: "Data & Analytics",
    description: "Extracting actionable insights using Pandas, real-time telemetry processing, and financial market data analysis."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: "Terminal",
    description: "Core languages used for systems, algorithms, backend, and hardware programming.",
    skills: [
      { name: "Python", level: "Advanced", highlight: true, description: "Backend APIs, OpenCV, automation scripts, Gemini integrations" },
      { name: "JavaScript (ES6+)", level: "Advanced", highlight: true, description: "Modern async patterns, DOM manipulation, TypeScript interoperability" },
      { name: "TypeScript", level: "Proficient", highlight: true, description: "Strongly typed client/server applications" },
      { name: "C / C++", level: "Proficient", highlight: true, description: "Embedded systems, microcontroller firmware, memory efficiency" },
      { name: "HTML5 & CSS3", level: "Advanced", description: "Semantic markup, responsive layouts, accessibility" },
      { name: "SQL", level: "Proficient", description: "Relational queries, schema design, relational constraints" }
    ]
  },
  {
    name: "Frontend Engineering",
    icon: "Layout",
    description: "Building responsive, modern, user-centric interfaces with reactive frameworks.",
    skills: [
      { name: "React.js", level: "Advanced", highlight: true, description: "Hooks, component architecture, state management" },
      { name: "Next.js (App Router)", level: "Advanced", highlight: true, description: "SSR, SSG, Server Actions, optimized SEO and routing" },
      { name: "Tailwind CSS", level: "Advanced", highlight: true, description: "Utility-first design, fluid responsive UI, micro-animations" },
      { name: "Responsive UI/UX", level: "Advanced", description: "Cross-device compatibility, mobile-first approach" },
      { name: "Framer Motion", level: "Proficient", description: "Smooth fluid animations and layout transitions" }
    ]
  },
  {
    name: "Backend & Cloud",
    icon: "Server",
    description: "Robust API construction, database modeling, and server-side processing.",
    skills: [
      { name: "Node.js & Express", level: "Advanced", highlight: true, description: "Event-driven REST APIs, middleware, authentication" },
      { name: "Python APIs (FastAPI/Flask)", level: "Proficient", highlight: true, description: "Microservices for AI inference and telemetry endpoints" },
      { name: "MongoDB", level: "Proficient", highlight: true, description: "Document stores, aggregation pipelines, Mongoose schemas" },
      { name: "RESTful Architecture", level: "Advanced", description: "CRUD design, status codes, JWT auth, stateless services" },
      { name: "Google Cloud / Firebase", level: "Working Knowledge", description: "Real-time sync, hosting, cloud functions" }
    ]
  },
  {
    name: "IoT & Embedded Systems",
    icon: "Cpu",
    description: "Interfacing physical hardware, sensors, microcontrollers, and communication buses.",
    skills: [
      { name: "ESP8266 & ESP32", level: "Advanced", highlight: true, description: "Wi-Fi microcontrollers, deep sleep modes, HTTP client telemetry" },
      { name: "Arduino Platform", level: "Advanced", highlight: true, description: "Sensor calibration, actuator controls, C++ libraries" },
      { name: "Biometric & Environmental Sensors", level: "Advanced", description: "Fingerprint modules, DHT11/22, ultrasonic, IR sensors" },
      { name: "Serial Protocols (UART / I2C / SPI)", level: "Proficient", description: "Chip-to-chip serial data streams, baud sync, debugging" },
      { name: "Hardware Prototyping", level: "Proficient", description: "Breadboarding, schematic planning, circuit power management" }
    ]
  },
  {
    name: "Networking & CCNA Concepts",
    icon: "Network",
    description: "Enterprise networking principles, routing protocols, and packet inspection.",
    skills: [
      { name: "CCNA Fundamentals", level: "Proficient", highlight: true, description: "OSI 7-layer model, subnetting, CIDR, packet lifecycle" },
      { name: "TCP/IP & UDP Protocols", level: "Advanced", highlight: true, description: "Transport layer handshakes, sockets, port forwarding" },
      { name: "Routing Protocols (OSPF / BGP / RIP)", level: "Proficient", description: "Dynamic routing tables, multi-area OSPF design" },
      { name: "VLAN & Trunking (802.1Q)", level: "Proficient", description: "Network segmentation, inter-VLAN routing" },
      { name: "NAT / PAT", level: "Proficient", description: "Network Address Translation, private-to-public mapping" },
      { name: "Wireshark & Packet Tracer", level: "Advanced", description: "Packet sniffing, simulation of enterprise topologies" }
    ]
  },
  {
    name: "Tools & Developer Workflow",
    icon: "Wrench",
    description: "Industry-standard development environment, version control, and debugging.",
    skills: [
      { name: "Git & GitHub", level: "Advanced", highlight: true, description: "Branching workflows, pull requests, collaborative CI/CD" },
      { name: "VS Code", level: "Advanced", description: "Configured debugging, extensions, remote development" },
      { name: "Postman", level: "Advanced", description: "API testing, automated test collections, mock servers" },
      { name: "Figma", level: "Working Knowledge", description: "UI wireframing, component mockups, design tokens" },
      { name: "Linux / Bash", level: "Proficient", description: "Shell scripting, process management, remote server admin" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "smart-gym",
    slug: "smart-gym",
    title: "Smart Gym Attendance & Access Control System",
    subtitle: "IoT • ESP8266 • Biometrics • Cloud Telemetry",
    category: "IoT / Embedded",
    featured: true,
    badge: "Hardware & IoT",
    summary: "An automated biometric check-in and membership management system utilizing ESP8266 microcontrollers, optical fingerprint sensors, and real-time cloud data sync to eliminate manual logbooks.",
    tags: ["ESP8266", "C++", "Fingerprint Sensor", "Wi-Fi", "Google Sheets API", "Web Dashboard"],
    githubUrl: "https://github.com/HaarishNK/smart-gym-iot",
    liveUrl: "https://smart-gym-iot-demo.vercel.app",
    caseStudy: {
      overview: "The Smart Gym Attendance and Access Control System is a cost-effective, hardware-to-cloud IoT device developed to replace error-prone manual register entries in fitness centers with real-time biometric verification and cloud tracking.",
      problem: "Traditional fitness centers and commercial gym spaces frequently suffer from buddy-punching, fraudulent entries, and tedious manual paperwork for subscription tracking. Commercial turnstiles are expensive (often >$2,000) and require complex local server setups that small and medium gyms cannot afford.",
      solution: "Engineered a standalone, Wi-Fi-enabled embedded device powered by an ESP8266 microcontroller and an optical fingerprint module (R307/FPM10A). When an athlete places their finger on the sensor, the fingerprint template is matched in under 0.8 seconds, encrypted, transmitted over Wi-Fi via HTTPS to a cloud webhook, and automatically verified against active membership status in real time.",
      architecture: {
        description: "Edge biometric capture connects seamlessly to cloud storage with resilient reconnection logic:",
        flow: [
          "Optical Fingerprint Sensor captures & extracts minutiae template",
          "ESP8266 microcontroller validates match ID and signs timestamp payload",
          "Local Wi-Fi Network securely transmits HTTP/REST POST payload",
          "Cloud Webhook / Microservice validates membership status & expiry",
          "Google Sheets / Cloud Database records entry with sub-second logging",
          "OLED Screen & Buzzer provide instant visual/audio feedback to the member"
        ]
      },
      technologies: [
        { name: "ESP8266 (NodeMCU)", purpose: "Low-power Wi-Fi microcontroller executing embedded C++ firmware" },
        { name: "Optical Fingerprint Module", purpose: "On-chip template storage and biometric feature matching" },
        { name: "Embedded C++ / Arduino", purpose: "Non-blocking event loop, UART buffer reading, and watchdog timer" },
        { name: "REST Webhook / Apps Script", purpose: "Stateless backend gateway syncing hardware to cloud databases" },
        { name: "Next.js Admin Dashboard", purpose: "Gym management portal for member enrollment and live visit graphs" }
      ],
      challenges: [
        {
          challenge: "Intermittent Wi-Fi Disconnections at Edge",
          solution: "Implemented an EEPROM-based circular buffer to queue offline check-ins locally during network drops, with exponential backoff auto-reconnect and batch-flush when connection restores."
        },
        {
          challenge: "Slow Fingerprint UART Read Times",
          solution: "Optimized serial baud rate to 57600 and utilized interrupt-driven UART read routines instead of blocking delay loops, reducing match latency from 2.1s to under 800ms."
        },
        {
          challenge: "Preventing Duplicate Rapid Check-Ins",
          solution: "Programmed a hardware debouncing and 10-second cooldown per User ID to prevent accidental multiple submissions."
        }
      ],
      results: [
        "99.4% Biometric identification accuracy across test members",
        "Sub-second (<800ms) end-to-end verification and entry logging",
        "100% elimination of manual pen-and-paper register overhead",
        "Reduced total hardware prototype deployment cost to under $25"
      ],
      futureWork: [
        "Migrating to ESP32 with BLE beacon proximity detection",
        "Adding automated WhatsApp notification on subscription expiration",
        "Integration with automated electromagnetic door strike lock relays"
      ]
    }
  },
  {
    id: "ai-stock-agent",
    slug: "ai-stock-agent",
    title: "AI Stock Analysis & Market Intelligence Agent",
    subtitle: "Python • Google Gemini API • Financial APIs • Interactive Dashboard",
    category: "AI / ML",
    featured: true,
    badge: "AI & Automation",
    summary: "An intelligent autonomous agent that aggregates live market data, calculates quantitative technical indicators, and generates structured risk and sentiment analyses using Gemini LLMs.",
    tags: ["Python", "Gemini API", "FastAPI", "Pandas", "Yahoo Finance API", "React"],
    githubUrl: "https://github.com/HaarishNK/ai-stock-agent",
    liveUrl: "https://stock-agent-ai.vercel.app",
    caseStudy: {
      overview: "An AI-powered quantitative analysis agent built to ingest real-time equity market data, synthesize multi-timeframe technical indicators (RSI, MACD, Moving Averages), and generate institutional-grade executive summaries with actionable insights.",
      problem: "Retail investors are inundated with hundreds of disjointed indicators, earnings calls, and news headlines. Manual technical chart reading is time-consuming and subjective, while traditional financial analysis services cost hundreds of dollars monthly.",
      solution: "Designed a multi-agent Python backend combining live data feeds with Google's Gemini API through structured prompt engineering and JSON schema enforcement. The agent evaluates momentum, volatility, and historical support/resistance levels, then outputs a calibrated risk rating alongside bull/bear scenarios.",
      architecture: {
        description: "Data pipeline from real-time financial market streams to LLM synthesis:",
        flow: [
          "Financial API fetcher streams historical price action & real-time quotes",
          "Pandas analytics engine computes 14-day RSI, 200 EMA, and MACD divergence",
          "Context Builder packages technical indicators into a structured prompt schema",
          "Gemini 2.5 LLM analyzes market structure, catalysts, and risk factors",
          "FastAPI backend validates JSON output and streams responses to React Dashboard"
        ]
      },
      technologies: [
        { name: "Python 3.11", purpose: "Data parsing, mathematical computing, and API orchestrator" },
        { name: "Google Gemini 2.5 API", purpose: "High-reasoning LLM providing contextual financial synthesis" },
        { name: "Pandas & NumPy", purpose: "Vectorized statistical computation of indicators and volatility metrics" },
        { name: "FastAPI", purpose: "Asynchronous high-throughput REST API serving frontend requests" },
        { name: "React & Recharts", purpose: "Interactive candlestick chart visualization and telemetry UI" }
      ],
      challenges: [
        {
          challenge: "LLM Hallucinations on Numeric Values",
          solution: "Separated quantitative calculation from linguistic reasoning. Mathematical indicators are calculated deterministically by Python/Pandas and passed into Gemini strictly as grounded parameters."
        },
        {
          challenge: "API Rate Limits and Latency",
          solution: "Implemented an in-memory caching layer with TTL expiration for repeated ticker queries, reducing external API calls by 68%."
        }
      ],
      results: [
        "Generated complete multi-page equity dossier in under 2.5 seconds",
        "Evaluated over 50 ticker symbols simultaneously with cached price ticks",
        "Zero numeric math hallucinations through deterministic parameter grounding"
      ],
      futureWork: [
        "Integrating SEC EDGAR 10-K and 10-Q filing parsing",
        "Adding live webhook alerts via Telegram and Discord",
        "Portfolio Monte Carlo simulation engine"
      ]
    }
  },
  {
    id: "face-attendance",
    slug: "face-attendance",
    title: "Real-Time Face Attendance & Verification System",
    subtitle: "Python • OpenCV • Tkinter • Pandas • Excel Automation",
    category: "Python",
    featured: true,
    badge: "Computer Vision",
    summary: "A contactless computer-vision attendance pipeline utilizing facial landmark recognition and automated spreadsheet synchronization for classrooms and workplace institutions.",
    tags: ["Python", "OpenCV", "Haar Cascade / dlib", "Tkinter", "Pandas", "Excel Automation"],
    githubUrl: "https://github.com/HaarishNK/face-attendance-system",
    liveUrl: "https://github.com/HaarishNK/face-attendance-system",
    caseStudy: {
      overview: "A desktop-based computer vision application designed to automate student and employee attendance through webcam or CCTV feeds, eliminating manual roll-calls and physical contact.",
      problem: "Paper attendance sheets or manual biometric punch devices cause crowding, take up 10-15 minutes of every lecture or shift, and are prone to proxy attendance.",
      solution: "Built a Python-based desktop application utilizing OpenCV for video frame acquisition and facial landmark encoding. Faces are detected, compared against an enrolled database with Euclidean distance thresholds, and verified individuals have their time, date, and status logged into a formatted Excel sheet with zero manual intervention.",
      architecture: {
        description: "Vision capture, feature extraction, and automated logging:",
        flow: [
          "OpenCV captures continuous video stream from camera feed",
          "Haar Cascade / Face Recognition library detects bounding boxes",
          "128-dimensional face embedding vectors computed and matched",
          "Attendance record timestamped and verified against duplicate entries",
          "Pandas updates daily spreadsheet and writes formatted XLSX report"
        ]
      },
      technologies: [
        { name: "Python", purpose: "Core logic and execution environment" },
        { name: "OpenCV (cv2)", purpose: "Real-time image processing, frame drawing, and video stream handling" },
        { name: "Face_Recognition (dlib)", purpose: "Deep metric learning for 128D facial embeddings" },
        { name: "Tkinter / CustomTkinter", purpose: "Clean graphical user interface for user enrollment and live preview" },
        { name: "Pandas & OpenPyXL", purpose: "Automated spreadsheet generation and historical record export" }
      ],
      challenges: [
        {
          challenge: "Variable Classroom Lighting Conditions",
          solution: "Applied histogram equalization and adaptive thresholding prior to facial feature extraction, boosting detection rate in low-light environments by 35%."
        },
        {
          challenge: "Preventing Photo/Screen Spoofing",
          solution: "Added an eye-blink detection heuristic using facial landmark eye aspect ratio (EAR) to ensure subject liveness."
        }
      ],
      results: [
        "Under 1.2s recognition time from camera entrance to spreadsheet write",
        "98.1% identification accuracy in standard indoor illumination",
        "Eliminated 10 minutes of manual attendance per class session"
      ],
      futureWork: [
        "WebRTC browser stream integration for multi-camera feeds",
        "Cloud database synchronization to Supabase / PostgreSQL"
      ]
    }
  },
  {
    id: "network-topology-lab",
    slug: "network-topology-lab",
    title: "Enterprise Multi-Branch Network Architecture",
    subtitle: "Cisco Packet Tracer • CCNA • OSPF • VLANs • NAT/PAT",
    category: "Systems & Networking",
    featured: true,
    badge: "CCNA & Systems",
    summary: "Simulated enterprise network architecture featuring multi-area OSPF routing, VLAN segmentation across departments, dynamic NAT/PAT translation, and strict ACL access control policies.",
    tags: ["CCNA", "OSPF", "VLAN", "NAT/PAT", "Cisco IOS", "Packet Tracer", "Subnetting"],
    githubUrl: "https://github.com/HaarishNK/ccna-enterprise-network",
    caseStudy: {
      overview: "An enterprise-grade campus network architecture designed to simulate high-availability routing, security segmentation, and private-to-public WAN translation for a corporate organization.",
      problem: "Unsegmented networks suffer from broadcast storms, unauthorized lateral network movement by malicious actors, and inefficient routing over leased WAN connections.",
      solution: "Engineered a hierarchical Cisco network topology featuring Core, Distribution, and Access layers. Configured multi-area OSPF for optimal path routing, 802.1Q trunking with isolated department VLANs (HR, Engineering, Guest, Servers), DHCP snooping, and Port Address Translation (PAT) for internet connectivity.",
      architecture: {
        description: "Hierarchical three-tier enterprise network topology:",
        flow: [
          "Access Layer: Managed Cisco switches with 802.1Q VLAN trunking & Port Security",
          "Distribution Layer: Layer 3 switches handling Inter-VLAN SVI routing",
          "Core Layer: High-speed backplane routing between campus buildings",
          "Edge WAN Router: Dual-homed ISP connections with OSPF & NAT/PAT translation",
          "Extended Access Control Lists (ACLs) isolating guest Wi-Fi from server subnets"
        ]
      },
      technologies: [
        { name: "Cisco IOS CLI", purpose: "Switch and router command-line configuration" },
        { name: "Multi-Area OSPFv2", purpose: "Dynamic shortest-path first routing with area 0 backbone" },
        { name: "802.1Q Trunking & SVIs", purpose: "Virtual LAN isolation and Layer 3 gateway routing" },
        { name: "NAT / PAT (Overload)", purpose: "Conserving IPv4 addresses across hundreds of private hosts" },
        { name: "Wireshark Packet Analysis", purpose: "Verifying TCP 3-way handshakes, ARP resolutions, and ICMP drops" }
      ],
      challenges: [
        {
          challenge: "Subnetting Optimization without Address Exhaustion",
          solution: "Applied Variable Length Subnet Masking (VLSM) to allocate precise /29 and /30 point-to-point link blocks, conserving 45% of IP address space."
        },
        {
          challenge: "Routing Loop Prevention & Redundancy",
          solution: "Configured Rapid Spanning Tree Protocol (RSTP) and HSRP (Hot Standby Router Protocol) for transparent gateway failover."
        }
      ],
      results: [
        "100% network redundancy with zero packet loss during primary link failure",
        "Isolated guest network prevents unauthorized access to internal corporate databases",
        "Fully validated through end-to-end ICMP ping, traceroute, and Wireshark captures"
      ],
      futureWork: [
        "Implementing IPv6 dual-stack addressing",
        "Adding automated configuration deployment using Python and Netmiko"
      ]
    }
  },
  {
    id: "portfolio-web-platform",
    slug: "portfolio-web-platform",
    title: "Engineering Portfolio & Interactive Dev Platform",
    subtitle: "Next.js 16 • React 19 • Tailwind CSS • Admin Telemetry",
    category: "Full-Stack",
    featured: false,
    badge: "Full-Stack Web",
    summary: "A production-grade developer platform featuring interactive CLI terminal, project case studies, client-side admin message management, and responsive engineering aesthetic.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "App Router"],
    githubUrl: "https://github.com/HaarishNK/webport",
    liveUrl: "https://haarish-portfolio.vercel.app",
    caseStudy: {
      overview: "Built to demonstrate full-stack engineering proficiency, systems thinking, and interactive design. Features an integrated developer CLI, printable resume, and admin portal.",
      problem: "Generic template resumes fail to convey multifaceted technical skills across hardware, networking, software, and AI.",
      solution: "Engineered a custom Next.js application that treats the portfolio as an engineer's digital workshop, complete with real-time CLI commands, deep architectural case studies, and responsive design.",
      architecture: {
        description: "Static generation with client-side interactive telemetry:",
        flow: [
          "Next.js App Router pre-renders optimized static pages for blazing fast SEO",
          "Tailwind CSS v4 delivers lightweight styling with hardware-accelerated transitions",
          "Interactive Terminal component parses user commands in real time",
          "LocalStorage & Mock API store contact inquiries and admin metrics"
        ]
      },
      technologies: [
        { name: "Next.js 16", purpose: "React Framework with App Router and Turbopack" },
        { name: "React 19 & TypeScript", purpose: "Component modularity and end-to-end type safety" },
        { name: "Tailwind CSS v4", purpose: "Modern utility styling and responsive dark theme" },
        { name: "Lucide React", purpose: "Optimized SVG iconography" }
      ],
      challenges: [
        {
          challenge: "Zero Third-Party Clutter",
          solution: "Built custom interactive elements (terminal emulator, filter systems, tabs) without heavy external packages, ensuring lightning-fast load times."
        }
      ],
      results: [
        "Sub-100ms page transitions and high Lighthouse performance score",
        "Unified showcase of hardware, networking, and software projects"
      ],
      futureWork: [
        "Connecting live MQTT telemetry feed from physical ESP8266 devices",
        "Adding live blog with MDX technical articles"
      ]
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Software & Technology Solutions (Freelance & Projects)",
    company: "Independent Engineering Projects",
    location: "Chennai, India",
    period: "2025 – Present",
    type: "Freelance / Practical Engineering",
    description: [
      "Engineered full-stack web applications and automation tools for local businesses and academic projects.",
      "Developed IoT telemetry devices connecting ESP8266 microcontrollers to cloud databases and web portals.",
      "Created Python automation scripts for data aggregation, web scraping, and spreadsheet reporting."
    ],
    technologies: ["Next.js", "Python", "React", "ESP8266", "MongoDB", "Git"],
    highlights: [
      "Delivered production-ready IoT prototype adopted for physical access tracking",
      "Built responsive web portals resulting in 40% faster customer enquiry handling"
    ]
  },
  {
    id: "exp-2",
    role: "Programming & Web Development Instructor",
    company: "CSC Computer Education",
    location: "Chennai, India",
    period: "2025",
    type: "Instruction & Mentorship",
    description: [
      "Instructed over 100+ students and professionals in core programming languages: Python, C, C++, and Web Development (HTML/CSS/JavaScript).",
      "Designed hands-on coding curriculums emphasizing data structures, algorithmic problem solving, and real-world project development.",
      "Conducted weekly live code review sessions and mentored final student capstone software projects."
    ],
    technologies: ["Python", "C/C++", "JavaScript", "HTML5", "CSS3", "Algorithms"],
    highlights: [
      "Received 95%+ positive student evaluation feedback for clarity and practical labs",
      "Mentored 25+ student capstone projects from concept to final working software"
    ]
  }
];

export const EDUCATION = [
  {
    institution: "Velammal Engineering College",
    degree: "Bachelor of Engineering (B.E.)",
    department: "Engineering",
    period: "2022 – 2026",
    location: "Chennai, Tamil Nadu, India",
    status: "Final Year / Graduating 2026",
    cgpa: "First Class with Distinction (Consistent Academic Standing)",
    coursework: [
      "Data Structures & Algorithms",
      "Computer Networks & Protocols",
      "Object Oriented Programming (C++ & Python)",
      "Database Management Systems (DBMS)",
      "Microprocessors & Microcontrollers (8051 / ARM)",
      "Operating Systems & Systems Programming",
      "Software Engineering & Agile Methodologies"
    ],
    academicHighlights: [
      "Active participant in technical symposiums and college hackathons",
      "Led student team in developing IoT biometric attendance project",
      "Served as technical peer tutor for junior engineering students"
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    title: "CCNA: Introduction to Networks & Switching",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialId: "CSCO-NET-2024",
    skillsLearned: ["TCP/IP", "IPv4/IPv6 Subnetting", "Ethernet Switching", "VLANs", "Routing Protocols", "Packet Tracer"],
    featured: true
  },
  {
    id: "cert-2",
    title: "Python for Data Science & Automation",
    issuer: "Coursera / DeepLearning.AI",
    date: "2024",
    skillsLearned: ["Python 3", "Pandas", "NumPy", "Data Cleaning", "APIs", "Automation"],
    featured: true
  },
  {
    id: "cert-3",
    title: "Full-Stack Web Development Bootcamp",
    issuer: "Udemy / Meta Certified Curriculum",
    date: "2023",
    skillsLearned: ["React.js", "Node.js", "Express", "MongoDB", "REST APIs", "Modern JavaScript"],
    featured: true
  },
  {
    id: "cert-4",
    title: "IoT Systems & Microcontroller Interfacing",
    issuer: "Technical Training Institute",
    date: "2024",
    skillsLearned: ["Arduino", "ESP8266 / ESP32", "Sensor Interfacing", "UART/I2C Protocols", "MQTT"],
    featured: true
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Project Innovation Showcase Finalist",
    category: "Competitions",
    date: "2025",
    description: "Selected among top teams in state-level engineering project showcase for the Smart Gym Biometric & Cloud Attendance System.",
    metrics: "Top 5% of 120+ teams"
  },
  {
    id: "ach-2",
    title: "Trained 100+ Students in Programming",
    category: "Leadership & Mentorship",
    date: "2025",
    description: "Successfully trained and guided over 100 learners at CSC Computer Education, enabling non-CS and fresher students to build their first functional Python and web applications.",
    metrics: "100+ Students Mentored"
  },
  {
    id: "ach-3",
    title: "Competitive Chess & Tactical Problem Solving",
    category: "Sports & Strategy",
    date: "2023 – 2026",
    description: "Active chess player with consistent tournament participation. Cultivated deep strategic planning, pattern recognition, and calculated decision-making under time pressure.",
    metrics: "Tournament Competitor"
  },
  {
    id: "ach-4",
    title: "Autonomous AI Agent Prototyping",
    category: "Technical",
    date: "2026",
    description: "Developed and benchmarked a multi-agent financial equity analyzer leveraging Gemini LLM APIs, achieving real-time structured telemetry generation.",
    metrics: "<2.5s Execution Latency"
  }
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  help: `Available commands:
  • bio          - Print short professional biography
  • skills       - List core engineering capabilities
  • projects     - View list of featured projects
  • experience   - Show work and teaching experience
  • education    - Show university & degree information
  • certs        - Display verified certifications
  • contact      - Get direct contact channels
  • clear        - Clear the terminal screen`,
  bio: `Haarish Nandakumar | Software Developer & Technology Builder
Based in Chennai, India.
Bridging the gap between software development (Python, Next.js, React, Node.js),
intelligent systems (AI agents, OpenCV), and physical hardware (ESP8266, IoT, CCNA Networking).
"I believe technology is valuable when it solves real problems."`,
  skills: `CORE COMPETENCIES:
• Software: Python, JavaScript, TypeScript, C, C++, Next.js, React, Node.js, Express, MongoDB
• Hardware & IoT: ESP8266, ESP32, Arduino, Biometric & Sensor Interfacing, UART/I2C
• Networking: CCNA Fundamentals, TCP/IP, OSPF, VLANs, NAT/PAT, Packet Tracer
• Tools: Git, GitHub, VS Code, Postman, Linux`,
  projects: `FEATURED PROJECTS:
1. Smart Gym Attendance System (ESP8266, Biometrics, Cloud Telemetry)
2. AI Stock Analysis Agent (Python, Gemini API, Financial Streams)
3. Real-Time Face Attendance (OpenCV, Tkinter, Pandas)
4. Enterprise CCNA Network Architecture (OSPF, VLAN, NAT/PAT)
5. Engineering Portfolio Platform (Next.js 16, React 19, Tailwind CSS)`,
  experience: `EXPERIENCE HIGHLIGHTS:
• Software & Technology Solutions (Independent Projects, 2025-Present)
• Programming & Web Development Instructor at CSC Computer Education (2025)
  - Taught Python, C/C++, and Web Tech to 100+ students.`,
  education: `EDUCATION:
• Velammal Engineering College (2022-2026)
  Bachelor of Engineering (B.E.)
  Focus: Computer Networks, DSA, Embedded Microcontrollers, DBMS`,
  certs: `CERTIFICATIONS:
• Cisco CCNA: Introduction to Networks & Switching
• Python for Data Science & Automation
• Full-Stack Web Development Bootcamp
• IoT Systems & Microcontroller Interfacing`,
  contact: `CONNECT WITH HAARISH:
• Email:    haarishnandakumar@gmail.com
• GitHub:   https://github.com/HaarishNK
• LinkedIn: https://linkedin.com/in/haarish-nandakumar
• Location: Chennai, India`
};
