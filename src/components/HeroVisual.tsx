"use client";

import { useState, useEffect } from "react";
import { Cpu, Terminal, Shield, Bot, Wifi, Check, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroVisual() {
  const [activeTab, setActiveTab] = useState<"software" | "iot" | "ai" | "networking">("iot");
  const [pingCount, setPingCount] = useState(12);
  const [isPinging, setIsPinging] = useState(false);

  const simulatePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setPingCount(prev => Math.floor(Math.random() * 8) + 9);
      setIsPinging(false);
    }, 400);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Glow behind terminal */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
        {/* Window Chrome */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-[11px] text-slate-400 font-sans font-medium">
              haarish_core_telemetry.sys
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL ONLINE
            </span>
          </div>
        </div>

        {/* Domain Tabs */}
        <div className="grid grid-cols-4 bg-slate-900/40 border-b border-slate-800/80 text-[11px]">
          <button
            onClick={() => setActiveTab("iot")}
            className={`py-2 px-1 text-center font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === "iot"
                ? "bg-slate-800/80 text-emerald-300 border-b-2 border-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="w-3 h-3 text-emerald-400" />
            <span>IoT / ESP</span>
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`py-2 px-1 text-center font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === "ai"
                ? "bg-slate-800/80 text-cyan-300 border-b-2 border-cyan-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bot className="w-3 h-3 text-cyan-400" />
            <span>AI / Agent</span>
          </button>
          <button
            onClick={() => setActiveTab("software")}
            className={`py-2 px-1 text-center font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === "software"
                ? "bg-slate-800/80 text-indigo-300 border-b-2 border-indigo-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-3 h-3 text-indigo-400" />
            <span>Next/Web</span>
          </button>
          <button
            onClick={() => setActiveTab("networking")}
            className={`py-2 px-1 text-center font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === "networking"
                ? "bg-slate-800/80 text-amber-300 border-b-2 border-amber-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Shield className="w-3 h-3 text-amber-400" />
            <span>CCNA Net</span>
          </button>
        </div>

        {/* Interactive View Body */}
        <div className="p-5 space-y-4">
          {activeTab === "iot" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-900">
                <span className="text-slate-400">DEVICE: ESP8266-MOD (NodeMCU v3)</span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono">
                  <Wifi className="w-3 h-3" /> RSSI: -54 dBm
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="text-slate-400">// Embedded C++ Fingerprint Routine</div>
                <div className="text-emerald-400">uint8_t id = finger.getImage();</div>
                <div>if (id == FINGERPRINT_OK) &#123;</div>
                <div className="pl-4 text-cyan-300">finger.image2Tz();</div>
                <div className="pl-4 text-cyan-300">finger.fingerFastSearch();</div>
                <div className="pl-4 text-slate-400">// Verified in 0.74s -&gt; HTTP POST to Cloud</div>
                <div className="pl-4 text-emerald-400">http.post(&quot;/api/checkin&quot;, payload);</div>
                <div>&#125;</div>
              </div>
              <div className="pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Biometric Buffer: 0/128 (Clean)</span>
                <button
                  onClick={simulatePing}
                  className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50 transition-colors cursor-pointer"
                >
                  {isPinging ? "Scanning..." : "Simulate Punch"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-900">
                <span className="text-slate-400">AGENT: Gemini 2.5 Market Analyst</span>
                <span className="text-cyan-400 flex items-center gap-1 font-mono">
                  <Activity className="w-3 h-3" /> Latency: 2.1s
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="text-slate-400"># Quantitative Technical Synthesis</div>
                <div className="text-cyan-300">indicators = calculate_rsi_macd(df, window=14)</div>
                <div className="text-slate-300">response = gemini_client.generate_content(</div>
                <div className="pl-4 text-amber-300">model=&quot;gemini-2.5-flash&quot;,</div>
                <div className="pl-4 text-slate-400">contents=[market_prompt, indicators]</div>
                <div>)</div>
                <div className="text-emerald-400">&gt;&gt; Risk Index: Moderate (0.34) | Trend: Bullish Divergence</div>
              </div>
              <div className="pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Grounded JSON Output: 100%</span>
                <Link
                  href="/projects/ai-stock-agent"
                  className="px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 transition-colors inline-flex items-center gap-1"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {activeTab === "software" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-900">
                <span className="text-slate-400">STACK: Next.js 16 • React 19 • TypeScript</span>
                <span className="text-indigo-400 flex items-center gap-1 font-mono">
                  Turbopack: 108ms
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="text-slate-400">// Dynamic App Router Configuration</div>
                <div><span className="text-indigo-400">export default async function</span> <span className="text-cyan-300">Portfolio</span>() &#123;</div>
                <div className="pl-4 text-slate-400">const projects = await getFeaturedProjects();</div>
                <div className="pl-4 text-emerald-400">return &lt;InteractiveShowcase data=&#123;projects&#125; /&gt;;</div>
                <div>&#125;</div>
                <div className="text-slate-400">// Static Prerender + Client Hydration</div>
              </div>
              <div className="pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Lighthouse Score: 99/100</span>
                <Link
                  href="/projects"
                  className="px-2.5 py-1 rounded bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/50 transition-colors inline-flex items-center gap-1"
                >
                  <span>All Projects</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {activeTab === "networking" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-900">
                <span className="text-slate-400">ROUTER: Cisco IOS 2911 (Edge Gateway)</span>
                <span className="text-amber-400 flex items-center gap-1 font-mono">
                  Area 0 (Backbone)
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="text-amber-300">Router(config)# router ospf 1</div>
                <div className="pl-2 text-slate-400">network 192.168.10.0 0.0.0.255 area 0</div>
                <div className="pl-2 text-slate-400">network 10.0.0.0 0.0.0.3 area 0</div>
                <div className="text-amber-300">Router(config)# ip nat inside source list 1 int Gi0/0 ov</div>
                <div className="text-emerald-400">&gt;&gt; NAT PAT active: 142 translations verified</div>
              </div>
              <div className="pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">VLANs: 10 (Eng), 20 (HR), 99 (Mgmt)</span>
                <Link
                  href="/projects/network-topology-lab"
                  className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 hover:bg-amber-900/50 transition-colors inline-flex items-center gap-1"
                >
                  <span>Network Lab</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status Ticker */}
        <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Ping RTT:</span>
            <span className="text-emerald-400 font-bold">{pingCount}ms</span>
            <span className="text-slate-400">• Packet Drop: 0.0%</span>
          </div>

          <button
            onClick={simulatePing}
            className="text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center gap-1 text-[11px]"
          >
            <span>[ping -t]</span>
          </button>
        </div>
      </div>
    </div>
  );
}
