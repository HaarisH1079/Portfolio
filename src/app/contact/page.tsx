import { Metadata } from "next";
import { ContactRepo } from "@/lib/repository";
import ContactClientView from "@/components/ContactClientView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Transmission Channel | Haarish Nandakumar",
  description:
    "Direct communication channel to connect with Haarish Nandakumar for software developer roles, IoT systems, and technical collaboration.",
};

export default async function ContactPage() {
  const settings = await ContactRepo.getSettings();

  return (
    <ContactClientView settings={JSON.parse(JSON.stringify(settings || {}))} />
  );
}
