"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  FlaskConical,
  BookOpen,
  FileText,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Database,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [dbMode, setDbMode] = useState<"mongodb" | "fallback">("fallback");

  // Check auth session on load
  useEffect(() => {
    async function checkAuth() {
      if (pathname === "/admin/login") {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setCurrentUser(data.user);
          fetchQuickStats();
        } else {
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      } catch {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }

    async function fetchQuickStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setUnreadMessages(data.stats?.unreadMessages || 0);
          setDbMode(data.databaseMode || "fallback");
        }
      } catch {}
    }

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  // If on login page, render plain without CMS chrome
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#070a13] text-slate-100">{children}</div>;
  }

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-slate-400">Loading Portfolio CMS...</span>
        </div>
      </div>
    );
  }

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  ];

  const contentLinks = [
    { label: "About", href: "/admin/about", icon: User },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Skills", href: "/admin/skills", icon: Cpu },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Lab", href: "/admin/lab", icon: FlaskConical },
    { label: "Blog", href: "/admin/blog", icon: BookOpen },
    { label: "Resume", href: "/admin/resume", icon: FileText },
    {
      label: "Contact",
      href: "/admin/contact",
      icon: Mail,
      badge: unreadMessages > 0 ? unreadMessages : undefined,
    },
  ];

  const systemLinks = [
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard" || pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20">
              CMS
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                Portfolio CMS
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                  v2.0
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Database & Profile Actions */}
        <div className="flex items-center gap-3">
          {/* DB Indicator Pill */}
          <div
            title={
              dbMode === "mongodb"
                ? "Connected directly to MongoDB"
                : "Active in Fallback / In-Memory Mode"
            }
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
              dbMode === "mongodb"
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-400"
                : "bg-amber-950/60 border-amber-500/40 text-amber-300"
            }`}
          >
            <Database className="w-3 h-3" />
            <span>{dbMode === "mongodb" ? "MongoDB Live" : "DB Active (Memory)"}</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xs font-bold">
                HN
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-200">
                {currentUser?.name?.split(" ")[0] || "Haarish"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="font-semibold text-white truncate">{currentUser?.name || "Haarish Nandakumar"}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email || "admin@haarish.dev"}</p>
                </div>
                <Link
                  href="/admin/about"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/admin/settings"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  System Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-950/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main CMS Body */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:block w-64 shrink-0 bg-slate-950/60 border-r border-slate-800/80 p-4 space-y-6 fixed md:static inset-y-16 left-0 z-40 overflow-y-auto`}
        >
          {/* Dashboard Link */}
          <div className="space-y-1">
            {navLinks.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-cyan-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CONTENT SECTION */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              CONTENT
            </span>
            <div className="pt-1 space-y-1">
              {contentLinks.map((item) => {
                const active = isLinkActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? "text-cyan-400" : "text-slate-500"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500 text-slate-950 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SYSTEM SECTION */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              SYSTEM
            </span>
            <div className="pt-1 space-y-1">
              {systemLinks.map((item) => {
                const active = isLinkActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-cyan-400" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/20 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-slate-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">Source:</span>
              <span className="text-cyan-400">MongoDB CRUD</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">Mode:</span>
              <span className="text-emerald-400">Headless CMS</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
