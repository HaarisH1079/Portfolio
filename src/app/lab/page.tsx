import { Metadata } from "next";
import { LabRepo } from "@/lib/repository";
import LabClientView from "@/components/LabClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lab & Experiments | Haarish Nandakumar",
  description:
    "Experimental engineering benchmarks, CCNA routing topologies, low-power IoT sleep investigations, and autonomous AI agents.",
};

export default async function LabPage() {
  const rawLabs = await LabRepo.getAll({ status: "published" });
  const labs = JSON.parse(JSON.stringify(rawLabs));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          05 // Research &amp; Prototyping
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Lab &amp; Experiments
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Hands-on hardware testbenches, network emulation topologies, and distributed protocol benchmarks constructed to measure empirical limits.
        </p>
      </div>

      <LabClientView initialLabs={labs} />
    </div>
  );
}
