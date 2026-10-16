import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/visuals";
import { NATIONAL_PAGES, PROVINCE_PAGES, SPECIALTY_PAGES, PHONE_DISPLAY, PHONE_E164, blurbFor } from "@/lib/pages";
import { pageLinkLabel, serviceTableTitle } from "@/lib/link-labels";
import { introFor } from "@/lib/seo-content";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle("Elevator Repair Services | ElevatorRepair.com"),
  description: trimDescription(
    "Emergency, planned repair, home lifts, drive faults, and Ontario coverage—one index with plain summaries. Call for dispatch.",
  ),
  alternates: { canonical: "/services" },
};

const sections = [
  { title: "National & emergency", pages: NATIONAL_PAGES },
  { title: "Specialized repair", pages: SPECIALTY_PAGES },
  { title: "Provincial", pages: PROVINCE_PAGES },
];

const pillar = NATIONAL_PAGES.find((p) => p.slug === "elevator-repair")!;

const indexFaqs = [
  {
    q: "Which page should I open first?",
    a: "Entrapments or anything unsafe → emergency line. Planned diagnostics → Canada-wide overview. Home lifts and drive faults have their own pages below.",
  },
  {
    q: "Are these pages connected to city guides?",
    a: "Yes. The overview links to every city; city pages link back here and to the emergency line so you can move between them without getting stuck.",
  },
  {
    q: "How do I reach dispatch?",
    a: "Read the brief that matches your situation, then call " + PHONE_DISPLAY + " with your building address.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: indexFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <div className="page-title-block">
        <div className="wrap">
          <p className="kicker kicker--dark">Index</p>
          <h1>Service pages</h1>
          <p className="lead">
            {introFor(pillar).slice(0, 320)}… Choose the page that fits below, then call {PHONE_DISPLAY} when you want a technician routed.
          </p>
          <a className="btn btn-primary" href={`tel:${PHONE_E164}`} style={{ marginTop: "1rem" }}>
            <span className="btn-value">Call {PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
      <div className="wrap">
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <table className="service-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Summary</th>
                  <th aria-hidden="true" />
                </tr>
              </thead>
              <tbody>
                {section.pages.map((page) => (
                  <tr key={page.slug}>
                    <td>
                      <Link href={`/${page.slug}`}>{serviceTableTitle(page)}</Link>
                    </td>
                    <td>
                      <Link href={`/${page.slug}`}>{blurbFor(page)}</Link>
                    </td>
                    <td>
                      <Link href={`/${page.slug}`}>→</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
        <section className="faq-stack">
          <h2>Questions about these pages</h2>
          {indexFaqs.map((faq) => (
            <div className="faq-item" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
