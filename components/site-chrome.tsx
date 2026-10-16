"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { PHONE_DISPLAY, PHONE_E164, SITE_NAME } from "@/lib/pages";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/emergency-elevator-repair", label: "Emergency" },
  { href: "/locations", label: "Cities" },
  { href: "/elevator-repair", label: "National" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-brand" onClick={() => setOpen(false)} aria-label={`${SITE_NAME} home`}>
          <BrandLogo />
        </Link>
        <nav className={`nav-menu ${open ? "is-open" : ""}`} aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="btn btn-primary btn-nav" href={`tel:${PHONE_E164}`}>
          <span className="btn-label">24/7 line</span>
          <span className="btn-value">{PHONE_DISPLAY}</span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-top">
        <div className="foot-brand">
          <BrandLogo />
          <p>Elevator repair for commercial towers, mid-rise buildings, and home lifts across Canada.</p>
        </div>
        <div className="foot-cols">
          <div>
            <h2>Repair</h2>
            <Link href="/emergency-elevator-repair">Emergency</Link>
            <Link href="/elevator-repair">National service</Link>
            <Link href="/home-elevator-repair">Home elevators</Link>
            <Link href="/elevator-drive-repair">Drive systems</Link>
          </div>
          <div>
            <h2>Regions</h2>
            <Link href="/elevator-repair-ontario">Ontario</Link>
            <Link href="/elevator-repair-toronto">Toronto</Link>
            <Link href="/elevator-repair-vancouver">Vancouver</Link>
            <Link href="/locations">All cities</Link>
          </div>
        </div>
        <a className="foot-call btn btn-ghost" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
      </div>
      <div className="wrap foot-base">
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
        <span>Technician availability varies by market.</span>
      </div>
    </footer>
  );
}

export function StickyMobileCta() {
  return (
    <div className="mobile-dial" aria-label="Call for repair">
      <a href={`tel:${PHONE_E164}`}>
        <span>Tap to call</span>
        <strong>{PHONE_DISPLAY}</strong>
      </a>
    </div>
  );
}
