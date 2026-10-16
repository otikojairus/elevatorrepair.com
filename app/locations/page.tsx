import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/visuals";
import { CITY_PAGES, PROVINCE_PAGES, PHONE_DISPLAY, PHONE_E164 } from "@/lib/pages";
import { pageLinkLabel } from "@/lib/link-labels";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle("Elevator Repair Cities Canada | ElevatorRepair.com"),
  description: trimDescription(
    "City guides across Quebec, Ontario, Alberta, BC, and more—each with local context. Open yours and call for dispatch.",
  ),
  alternates: { canonical: "/locations" },
};

const provinceName = (area: string) => {
  const code = area.split(", ")[1];
  return ({
    QC: "Quebec",
    ON: "Ontario",
    AB: "Alberta",
    BC: "British Columbia",
    MB: "Manitoba",
    SK: "Saskatchewan",
    NS: "Nova Scotia",
  } as Record<string, string>)[code] || "Canada";
};

const groups = ["Quebec", "Ontario", "Alberta", "British Columbia", "Manitoba", "Saskatchewan", "Nova Scotia"];

const locFaqs = [
  {
    q: "How is a city page different from the Canada-wide overview?",
    a: "City pages add neighbourhood context, climate wear, and landmarks. The overview explains how dispatch works and links to every city listed here.",
  },
  {
    q: "My town is not on the list—can you still help?",
    a: "Often yes. Call " + PHONE_DISPLAY + " with your address; we route based on technician availability and partners in the region.",
  },
  {
    q: "Where do I go if someone is trapped?",
    a: "Use the 24/7 emergency line from any city page or the main menu—do not wait on a directory page.",
  },
];

export default function LocationsPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: locFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <div className="page-title-block">
        <div className="wrap">
          <p className="kicker kicker--dark">Directory</p>
          <h1>Find your city</h1>
          <p className="lead">
            Open the guide closest to your building—each one has its own intro, neighbourhood notes, and FAQs. When you are ready, call {PHONE_DISPLAY} with the address so we can confirm routing. For how we work coast to coast, see the Canada-wide overview; if anyone is trapped, use the emergency line right away.
          </p>
          <a className="btn btn-primary" href={`tel:${PHONE_E164}`} style={{ marginTop: "1rem" }}>
            <span className="btn-value">Call {PHONE_DISPLAY}</span>
          </a>
          <div className="province-bar">
            <Link href="/elevator-repair">Canada-wide</Link>
            {PROVINCE_PAGES.map((page) => (
              <Link href={`/${page.slug}`} key={page.slug}>{pageLinkLabel(page)}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap loc-columns">
        {groups.map((province) => {
          const cities = CITY_PAGES.filter((page) => provinceName(page.area) === province);
          if (!cities.length) return null;
          return (
            <div className="loc-col" key={province}>
              <h2>{province}</h2>
              <ul>
                {cities.map((page) => (
                  <li key={page.slug}>
                    <Link href={`/${page.slug}`}>{pageLinkLabel(page)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <section className="block wrap faq-stack">
        <h2>Questions about these guides</h2>
        {locFaqs.map((faq) => (
          <div className="faq-item" key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
