"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, ExternalLink, Loader2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setStatus("error");
        setStatusMessage("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setStatus("error");
        setStatusMessage("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      // Submit to MongoDB API route
      const apiRes = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Inquiry",
          message: formData.message,
        }),
      });

      if (!apiRes.ok) {
        throw new Error("API submission failed");
      }

      const newMsg = {
        id: "msg_" + Date.now(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Portfolio Inquiry",
        message: formData.message,
        date: new Date().toISOString(),
        read: false
      };

      if (typeof window !== "undefined") {
        const existingRaw = localStorage.getItem("haarish_portfolio_messages");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        localStorage.setItem("haarish_portfolio_messages", JSON.stringify([newMsg, ...existing]));
        window.dispatchEvent(new Event("storage"));
      }

      setStatus("success");
      setStatusMessage("Message sent successfully! Haarish will respond shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMessage("An error occurred while sending your message. Please try sending directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDirectEmail = () => {
    const subject = encodeURIComponent(formData.subject || "Contact from Portfolio");
    const body = encodeURIComponent(`Hi Haarish,\n\nMy name is ${formData.name || "[Your Name]"}.\n\n${formData.message || "[Your Message]"}\n\nBest,\n${formData.name || ""}\n${formData.email || ""}`);
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-100 mb-2">Send a Message</h3>
        <p className="text-sm text-slate-400">
          Interested in working together or hiring for a role? Send a note directly to my inbox.
        </p>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
          <div className="flex-1">
            <p className="font-semibold">{statusMessage}</p>
            <p className="text-xs text-emerald-400/80 mt-1">
              Your inquiry has been logged into the systems queue.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          <p className="font-medium">{statusMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Vance"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Software Developer Role / Project Collaboration"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
            Message *
          </label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Hi Haarish, I reviewed your projects and would like to discuss..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={openDirectEmail}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open in Mail App</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </form>
    </div>
  );
}
