# Haarish Nandakumar — Software Developer & Technology Builder Portfolio

> High-performance, production-ready personal engineering portfolio and developer platform built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## 🌟 Architecture & Highlights

- **Brand Positioning**: Tailored for an engineering fresher with deep dual-competencies across software (Web, Python, AI) and hardware/systems (IoT, ESP8266, CCNA Networking).
- **Interactive Recruiter Terminal (CLI)**: Accessible from anywhere via `~` or the floating badge. Commands include `help`, `bio`, `skills`, `projects`, `experience`, `certs`, `contact`, `clear`.
- **In-Depth Case Studies (`/projects/[slug]`)**:
  - **Smart Gym Attendance System**: ESP8266, biometric fingerprint sensor, cloud webhook, sub-800ms verification.
  - **AI Stock Analysis Agent**: Python, Google Gemini 2.5 API, technical indicator computations, structured JSON schema.
  - **Real-Time Face Attendance System**: Python, OpenCV, Tkinter, Pandas, Excel automation.
  - **Enterprise Multi-Branch Network**: Cisco CCNA architecture, multi-area OSPF, VLANs, NAT/PAT translation.
- **Interactive Protocol & Systems Inspector**: Visual OSI 7-layer and IoT microcontroller packet telemetry inspector.
- **ATS-Optimized Printable Resume (`/resume`)**: Instant PDF print styling (`window.print()`), copy plain text for job boards, clean structured layout.
- **Working Contact Form (`/contact`)**: Client-side validation, instant feedback, direct mailto fallback, and persistence for the admin dashboard.
- **Admin Management Portal (`/admin`)**: Secure passcode login (`demo` or `admin123`) to view inbound contact messages, manage project status, and view edge telemetry.

---

## 🗺️ Website Sitemap & Routes

| Route | Description |
|---|---|
| `/` | Landing page: Hero HUD visual, tech stack, featured projects, experience preview, CTA |
| `/about` | Biography, 2022–2026 engineering journey, what I do, and engineering philosophy |
| `/skills` | Filterable skills (Languages, Frontend, Backend, IoT, CCNA Networking, Tools) + Protocol Inspector |
| `/projects` | Complete project catalog with search and tag filters |
| `/projects/[slug]` | Deep architectural case studies (Problem, Solution, Diagram, Challenges, Results) |
| `/experience` | Chronological work and teaching experience (CSC Computer Education, Projects) |
| `/education` | Velammal Engineering College, degree details, coursework, academic highlights |
| `/certifications` | Cisco CCNA, Python, and IoT certifications with verified badges + achievements |
| `/resume` | Web resume with PDF download and plain-text copy |
| `/contact` | Working contact form with mailto fallback and social links |
| `/admin` | Interactive dashboard for message review, telemetry, and system stats |

---

## 🚀 Getting Started Locally

### 1. Clone & Install
```bash
git clone https://github.com/HaarishNK/webport.git
cd webport
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🚢 Deployment to Vercel (Recommended)

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete deployment-ready engineering portfolio"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository `webport`.
4. Leave build settings as default (`next build`).
5. Click **Deploy**. Your portfolio will be live worldwide on an edge CDN with automatic SSL!

---

## 🔒 Admin Credentials (Demo Mode)
- **URL**: `/admin`
- **Passcode**: `admin123` or `demo` (or click the *1-Click Demo Login* button)
