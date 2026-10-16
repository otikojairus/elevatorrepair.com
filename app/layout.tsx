import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { SiteFooter, SiteHeader, StickyMobileCta } from "@/components/site-chrome";
import { absoluteUrl, SITE_NAME } from "@/lib/pages";
import "./globals.css";

const body = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600"], display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: { default: "Elevator Repair Across Canada | ElevatorRepair.com", template: "%s" },
  description: "Emergency and scheduled elevator repair, drive service, and home elevator support across Canada. Call for fast dispatch.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_NAME,
    title: "ElevatorRepair.com | Repair & Emergency Service",
    description: "Commercial and residential elevator repair coordinated nationwide.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${body.variable} ${display.variable}`}>
      <body>
        <div className="page-frame">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <StickyMobileCta />
      </body>
    </html>
  );
}
