import { 
  AboutRepo, 
  ProjectsRepo, 
  SkillsRepo, 
  ExperienceRepo, 
  LabRepo, 
  BlogRepo, 
  ResumeRepo, 
  ContactRepo 
} from "../src/lib/repository";

async function runE2ETests() {
  console.log("=================================================");
  console.log("  STARTING END-TO-END FLOW VERIFICATION");
  console.log("  Admin/Database -> Live Website Pages");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. PROJECTS FLOW
  console.log("\n--- Testing Section: Projects ---");
  const testProjectSlug = "e2e-autonomous-swarm";
  const createdProject = await ProjectsRepo.create({
    title: "Autonomous Drone Swarm Telemetry",
    slug: testProjectSlug,
    shortDescription: "Decentralized mesh networking for drone constellations.",
    description: "Built using C++, ESP32, and UDP broadcast channels for obstacle avoidance.",
    category: "IoT",
    technologies: ["C++", "ESP32", "Mesh Networking", "UDP"],
    problem: "GPS denial in indoor warehouses prevents autonomous formation tracking.",
    solution: "Implemented Ultra-Wideband (UWB) trilateration with local sensor fusion.",
    status: "published",
    featured: true,
    order: 99,
  });

  assert(!!createdProject && (createdProject._id || createdProject.id), "Project created in database");

  // Read via Public Repo (simulating public /projects page)
  const publicProjects = await ProjectsRepo.getAll({ status: "published" });
  const foundInPublic = publicProjects.find((p: any) => p.slug === testProjectSlug);
  assert(!!foundInPublic && foundInPublic.title === "Autonomous Drone Swarm Telemetry", "New project immediately appears in public projects list");

  // Read Detail Page by Slug (simulating /projects/[slug])
  const detailProject = await ProjectsRepo.getById(testProjectSlug);
  assert(!!detailProject && detailProject.solution.includes("Ultra-Wideband"), "Detail page loads project by slug with problem & solution");

  // Update Project in Admin
  await ProjectsRepo.update(createdProject._id || createdProject.id, {
    title: "Autonomous Drone Swarm Telemetry (Upgraded v2)",
  });
  const updatedDetail = await ProjectsRepo.getById(testProjectSlug);
  assert(updatedDetail?.title === "Autonomous Drone Swarm Telemetry (Upgraded v2)", "Project update immediately reflects in database");

  // Change to Draft (should disappear from public)
  await ProjectsRepo.update(createdProject._id || createdProject.id, { status: "draft" });
  const publicAfterDraft = await ProjectsRepo.getAll({ status: "published" });
  assert(!publicAfterDraft.some((p: any) => p.slug === testProjectSlug), "Draft project is excluded from public website");

  // Soft Delete
  await ProjectsRepo.delete(createdProject._id || createdProject.id);
  const publicAfterDelete = await ProjectsRepo.getAll();
  assert(!publicAfterDelete.some((p: any) => p.slug === testProjectSlug), "Deleted project disappears completely from website");

  // 2. ABOUT FLOW
  console.log("\n--- Testing Section: About ---");
  const originalAbout = await AboutRepo.get();
  const testHeadline = "Robotics & Full-Stack System Architect";
  await AboutRepo.update({ professionalTitle: testHeadline });
  const updatedAbout = await AboutRepo.get();
  assert(updatedAbout.professionalTitle === testHeadline, "About profile update immediately changes public headline");
  // Restore original
  await AboutRepo.update({ professionalTitle: originalAbout.professionalTitle });

  // 3. SKILLS FLOW
  console.log("\n--- Testing Section: Skills ---");
  const testSkill = await SkillsRepo.create({
    name: "Kubernetes Cluster Orchestration",
    category: "Cloud Infrastructure",
    description: "Container lifecycle management and ingress routing.",
    level: "Advanced",
    yearsExperience: 2,
    status: "active",
    order: 100,
  });
  assert(!!testSkill, "Skill created in database");

  const publicSkills = await SkillsRepo.getAll({ status: "active" });
  const foundSkill = publicSkills.find((s: any) => s.name === "Kubernetes Cluster Orchestration");
  assert(!!foundSkill && foundSkill.level === "Advanced", "New skill immediately appears in active skills list");

  await SkillsRepo.delete(testSkill._id || testSkill.id);
  const skillsAfterDelete = await SkillsRepo.getAll({ status: "active" });
  assert(!skillsAfterDelete.some((s: any) => s.name === "Kubernetes Cluster Orchestration"), "Deleted skill disappears from public website");

  // 4. EXPERIENCE FLOW
  console.log("\n--- Testing Section: Experience ---");
  const testExp = await ExperienceRepo.create({
    position: "Senior Embedded Firmware Lead",
    company: "Apex Automation Labs",
    employmentType: "Full-Time",
    location: "Chennai, India",
    startDate: "2025",
    endDate: "Present",
    current: true,
    description: "Architected firmware for industrial telemetry units.",
    responsibilities: ["Led a 4-person embedded engineering squad", "Reduced power draw by 42%"],
    technologies: ["FreeRTOS", "C++", "SPI", "I2C"],
    status: "published",
    order: 10,
  });
  assert(!!testExp, "Experience created in database");

  const publicExperiences = await ExperienceRepo.getAll({ status: "published" });
  const foundExp = publicExperiences.find((e: any) => e.company === "Apex Automation Labs");
  assert(!!foundExp && foundExp.position === "Senior Embedded Firmware Lead", "Experience immediately appears on public /experience page");

  await ExperienceRepo.delete(testExp._id || testExp.id);
  const expAfterDelete = await ExperienceRepo.getAll({ status: "published" });
  assert(!expAfterDelete.some((e: any) => e.company === "Apex Automation Labs"), "Deleted experience removed from public website");

  // 5. LAB FLOW
  console.log("\n--- Testing Section: Lab ---");
  const testLabSlug = "e2e-can-bus-investigation";
  const testLab = await LabRepo.create({
    title: "CAN-Bus Differential Signaling & Arbitration Lab",
    slug: testLabSlug,
    category: "Automotive & Hardware",
    shortDescription: "Oscilloscope frame timing and bus contention analysis under 1 Mbps transmission.",
    objective: "Verify dominant/recessive bit arbitration and measure ringing noise margin.",
    description: "Set up two MCP2515 CAN transceivers with Arduino Nano test nodes.",
    technologies: ["CAN-Bus", "Oscilloscope", "MCP2515", "Embedded C"],
    githubUrl: "https://github.com/HaarishNK/can-bus-lab",
    status: "published",
    featured: true,
    order: 10,
  });
  assert(!!testLab, "Lab experiment created in database");

  const publicLabs = await LabRepo.getAll({ status: "published" });
  const foundLab = publicLabs.find((l: any) => l.slug === testLabSlug);
  assert(!!foundLab && foundLab.title.includes("CAN-Bus"), "Lab experiment appears on public /lab page");

  const detailLab = await LabRepo.getById(testLabSlug);
  assert(!!detailLab && detailLab.objective.includes("arbitration"), "Lab detail page (/lab/[slug]) loads empirical objective");

  await LabRepo.delete(testLab._id || testLab.id);
  const labsAfterDelete = await LabRepo.getAll({ status: "published" });
  assert(!labsAfterDelete.some((l: any) => l.slug === testLabSlug), "Deleted lab experiment removed from website");

  // 6. BLOG FLOW
  console.log("\n--- Testing Section: Blog ---");
  const testBlogSlug = "e2e-zero-copy-packet-buffers";
  const testBlog = await BlogRepo.create({
    title: "Zero-Copy Linux Packet Buffers with DPDK & AF_XDP",
    slug: testBlogSlug,
    excerpt: "Bypassing standard kernel networking stack overhead for line-rate 10GbE packet capture.",
    content: "## Zero-Copy Architecture\n\nTraditional socket receive paths incur memory copies between NIC ring buffers and user-space sk_buff structures.\n\n### AF_XDP Ring Queues\nBy utilizing UMEM shared memory pools, frames are mapped directly to user-space ring buffers.",
    category: "Networking",
    tags: ["DPDK", "AF_XDP", "Linux", "Networking"],
    author: "Haarish Nandakumar",
    status: "published",
  });
  assert(!!testBlog, "Blog article created in database");

  const publicPosts = await BlogRepo.getAll({ status: "published" });
  const foundBlog = publicPosts.find((b: any) => b.slug === testBlogSlug);
  assert(!!foundBlog && foundBlog.title.includes("Zero-Copy"), "Blog post appears on public /blog page");

  const detailBlog = await BlogRepo.getById(testBlogSlug);
  assert(!!detailBlog && detailBlog.content.includes("AF_XDP Ring Queues"), "Blog detail page (/blog/[slug]) loads full markdown content");

  await BlogRepo.delete(testBlog._id || testBlog.id);
  const blogAfterDelete = await BlogRepo.getAll({ status: "published" });
  assert(!blogAfterDelete.some((b: any) => b.slug === testBlogSlug), "Deleted blog post removed from website");

  // 7. RESUME FLOW
  console.log("\n--- Testing Section: Resume ---");
  const currentResume = await ResumeRepo.getCurrent();
  assert(!!currentResume && !!currentResume.version, `Current active resume identified (v${currentResume?.version || 1})`);

  // 8. CONTACT FORM FLOW
  console.log("\n--- Testing Section: Contact & Messages ---");
  const createdMsg = await ContactRepo.createMessage({
    name: "Alex Cross (E2E Test)",
    email: "alex.cross@enterprise.io",
    subject: "Hiring Inquiry for IoT Role",
    message: "We reviewed your portfolio and would like to invite you for an interview.",
  });
  assert(!!createdMsg && createdMsg.name === "Alex Cross (E2E Test)", "Visitor message successfully logged to messages collection");

  const allMessages = await ContactRepo.getMessages();
  const foundMsg = allMessages.find((m: any) => m.name === "Alex Cross (E2E Test)");
  assert(!!foundMsg && foundMsg.status === "unread", "Message available in Admin messages inbox with status 'unread'");

  console.log("\n=================================================");
  console.log(`  E2E TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runE2ETests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
