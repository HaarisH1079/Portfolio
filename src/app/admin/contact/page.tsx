"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Trash2,
  Archive,
  CheckCircle2,
  Phone,
  MapPin,
  Settings,
  Save,
  Clock,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export default function AdminContactPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "settings">("messages");

  // Messages State
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [msgFilter, setMsgFilter] = useState("All");
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  // Settings State
  const [settings, setSettings] = useState({
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    instagram: "",
    availability: "",
    formEnabled: true,
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsNotice, setSettingsNotice] = useState<string | null>(null);

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const url = msgFilter !== "All" ? `/api/messages?status=${msgFilter}` : "/api/messages";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        if (data.length > 0 && !selectedMessage) {
          setSelectedMessage(data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchSettings();
  }, [msgFilter]);

  const handleUpdateMessageStatus = async (id: string, status: "unread" | "read" | "archived") => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => ((m._id || m.id) === id ? { ...m, status } : m))
        );
        if (selectedMessage && (selectedMessage._id === id || selectedMessage.id === id)) {
          setSelectedMessage((prev: any) => ({ ...prev, status }));
        }
      }
    } catch {}
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => (m._id || m.id) !== id));
        if (selectedMessage && (selectedMessage._id === id || selectedMessage.id === id)) {
          setSelectedMessage(null);
        }
      }
    } catch {}
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsNotice(null);
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSettingsNotice("Contact configuration saved successfully!");
      }
    } catch {
      setSettingsNotice("Failed to save contact settings.");
    } finally {
      setIsSavingSettings(false);
      setTimeout(() => setSettingsNotice(null), 4000);
    }
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500/40 text-rose-300 font-bold uppercase tracking-wider">
              Communication Hub
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Contact &amp; Inquiries</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public contact details and process recruiter and visitor transmissions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "messages"
                ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-slate-950 font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Public Info Settings</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INBOUND MESSAGES (Spec Section 23) */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500">Status Filter:</span>
              <select
                value={msgFilter}
                onChange={(e) => setMsgFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono cursor-pointer"
              >
                <option value="All">All Inquiries</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Total: {messages.length} messages
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Stream */}
            <div className="lg:col-span-5 space-y-2">
              {isLoadingMessages ? (
                <div className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
                  No messages matching filter.
                </div>
              ) : (
                messages.map((msg) => {
                  const id = msg._id || msg.id;
                  const isSelected = selectedMessage && (selectedMessage._id === id || selectedMessage.id === id);
                  return (
                    <div
                      key={id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.status === "unread") {
                          handleUpdateMessageStatus(id, "read");
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-800/90 border-rose-500/50 shadow-md shadow-rose-950/20"
                          : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white truncate max-w-[180px]">
                          {msg.name}
                        </span>
                        {msg.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-rose-300 truncate mb-1">
                        {msg.subject}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{msg.message}</p>
                      <span className="text-[10px] font-mono text-slate-500 mt-2 block">
                        {new Date(msg.createdAt).toLocaleDateString()} &bull;{" "}
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Message Inspection Detail */}
            <div className="lg:col-span-7">
              {selectedMessage ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        {selectedMessage.subject}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        From: <span className="text-white font-semibold">{selectedMessage.name}</span> &bull;{" "}
                        <span className="text-cyan-400 font-mono">{selectedMessage.email}</span>
                      </p>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                        Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {selectedMessage.status === "unread" ? (
                        <button
                          onClick={() =>
                            handleUpdateMessageStatus(selectedMessage._id || selectedMessage.id, "read")
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                          title="Mark Read"
                        >
                          Mark Read
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleUpdateMessageStatus(selectedMessage._id || selectedMessage.id, "unread")
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                          title="Mark Unread"
                        >
                          Mark Unread
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleUpdateMessageStatus(selectedMessage._id || selectedMessage.id, "archived")
                        }
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                        title="Archive"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteMessage(selectedMessage._id || selectedMessage.id)}
                        className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                        selectedMessage.subject
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-rose-500/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply via Default Mail Client</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
                  <Mail className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="font-semibold text-slate-300">Select an inquiry to view transmission</p>
                  <p>Click on any message row in the list to read and respond.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PUBLIC CONTACT SETTINGS (Spec Section 22) */}
      {activeTab === "settings" && (
        <div className="max-w-3xl space-y-6">
          {settingsNotice && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{settingsNotice}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" />
                <span>Contact Information (Website Display)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Direct Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Location</label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  placeholder="Chennai, India"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={settings.linkedin}
                    onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">GitHub Profile</label>
                  <input
                    type="text"
                    value={settings.github}
                    onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Availability Status Banner</label>
                <input
                  type="text"
                  value={settings.availability}
                  onChange={(e) => setSettings({ ...settings, availability: e.target.value })}
                  placeholder="e.g. Open to full-time roles & high-impact projects"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="formToggle"
                  checked={settings.formEnabled}
                  onChange={(e) => setSettings({ ...settings, formEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800 cursor-pointer"
                />
                <label htmlFor="formToggle" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Public Contact Form Enabled (allows visitors to submit inquiries)
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSavingSettings}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingSettings ? "Saving..." : "Save Contact Settings"}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
