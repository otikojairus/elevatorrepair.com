import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/pages";

type PageHeroProps = {
  kicker?: string;
  title: string;
  lead: ReactNode;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "home" | "page";
};

export function PageHero({
  kicker,
  title,
  lead,
  ctaLabel = "Call dispatch",
  secondaryHref,
  secondaryLabel,
  variant = "page",
}: PageHeroProps) {
  return (
    <section className={`cinema-hero cinema-hero-${variant}`}>
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="cinema-hero-bg"
      />
      <div className="cinema-hero-overlay" aria-hidden="true" />
      <div className="cinema-hero-grid" aria-hidden="true" />
      <div className="wrap cinema-hero-inner">
        <div className="cinema-hero-copy">
          {kicker && <p className="cinema-kicker">{kicker}</p>}
          <h1>{title}</h1>
          <div className="cinema-lead">{lead}</div>
          <div className="cinema-cta-row">
            <a className="btn btn-primary btn-hero" href={`tel:${PHONE_E164}`}>
              <span className="btn-label">{ctaLabel}</span>
              <span className="btn-value">{PHONE_DISPLAY}</span>
            </a>
            {secondaryHref && secondaryLabel && (
              <Link className="btn btn-glass" href={secondaryHref}>{secondaryLabel}</Link>
            )}
          </div>
        </div>
        <aside className="cinema-hero-panel">
          <div className="panel-pulse" aria-hidden="true" />
          <p className="panel-label">Live dispatch</p>
          <p className="panel-title">Tell us what the car is doing</p>
          <ul className="panel-checklist">
            <li>Address &amp; elevator bank</li>
            <li>Codes, noises, or entrapment</li>
            <li>Who meets the technician</li>
          </ul>
          <a className="btn btn-primary btn-block" href={`tel:${PHONE_E164}`}>
            <span className="btn-value">{PHONE_DISPLAY}</span>
          </a>
        </aside>
      </div>
      {variant === "home" && (
        <div className="wrap cinema-ticker">
          <span>24/7 emergency triage</span>
          <span>Licensed technicians</span>
          <span>Canada-wide routing</span>
        </div>
      )}
    </section>
  );
}
