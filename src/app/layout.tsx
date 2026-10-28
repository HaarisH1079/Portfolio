import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haarish Nandakumar | Software Developer & Technology Builder",
  description: "Portfolio of Haarish Nandakumar — Software Developer & Technology Builder specializing in Full-Stack Web, Embedded IoT Systems, AI Agents, and CCNA Networking.",
  keywords: [
    "Haarish Nandakumar",
    "Software Developer",
    "IoT Developer",
    "Embedded Systems",
    "Full-Stack Developer",
    "Python",
    "Next.js",
    "React",
    "ESP8266",
    "CCNA",
    "Chennai"
  ],
  authors: [{ name: "Haarish Nandakumar" }],
  creator: "Haarish Nandakumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haarish.dev",
    title: "Haarish Nandakumar | Software Developer & Technology Builder",
    description: "Bridging the gap between software engineering, physical hardware/IoT, AI agents, and network infrastructure.",
    siteName: "Haarish Nandakumar Portfolio",
  },
  icons: {
    icon: [
      { url: "/HLOGO.png" },
      { url: "/icon.png" },
    ],
    shortcut: "/HLOGO.png",
    apple: "/HLOGO.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haarish Nandakumar | Software Developer & Technology Builder",
    description: "Software Developer & Technology Builder: Web, IoT, AI, Networking",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
