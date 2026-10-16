import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/visuals";
import { CITY_PAGES, NATIONAL_PAGES, PHONE_DISPLAY, PHONE_E164, PROVINCE_PAGES, SITE_NAME, SPECIALTY_PAGES, absoluteUrl } from "@/lib/pages";
import { pageLinkLabel } from "@/lib/link-labels";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle("Elevator Repair Canada | ElevatorRepair.com"),
  description: trimDescription(
    `National elevator repair and 24/7 emergency dispatch for Canadian buildings. Traction, hydraulic, and home lifts. Call ${PHONE_DISPLAY} today.`,
  ),
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "When should I call emergency repair instead of regular service?",
    a: "Call emergency when someone is trapped, the car moves unexpectedly, you smell burning, or firefighter service is compromised. For noises or minor leveling issues with everyone safe, open the overview page or your city guide, then call " + PHONE_DISPLAY + ".",
  },
  {
    q: "Do you cover my city?",
    a: "We publish guides for major Canadian markets and often route technicians beyond those cities when coverage allows. Open the locations directory or your nearest city page before you call.",
  },
  {
    q: "What should I have ready on the phone?",
    a: "Street address, which elevator failed, symptoms or error codes, entrapment status, and someone on site who can grant access. A photo of the controller helps when it is safe to take one.",
  },
];

const hubServicePages = [...NATIONAL_PAGES, ...SPECIALTY_PAGES, ...PROVINCE_PAGES];

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: absoluteUrl(),
            telephone: PHONE_E164,
            areaServed: "Canada",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() }],
          },
        ]}
      />

      <PageHero
        variant="home"
        kicker="Canada · Commercial & residential"
        title="Elevator repair you can reach by phone—day or night"
        lead={
          <p>
            One number for entrapments, drive faults, and the repair you planned for next week. We answer for condos, offices, hospitals, and home lifts from coast to coast—no maze of forms, just a real conversation about what your car is doing.
          </p>
        }
        ctaLabel="Call now"
        secondaryHref="/elevator-repair"
        secondaryLabel="How we help nationwide"
      />

      <section className="block">
        <div className="wrap">
          <h2>What do you need today?</h2>
          <p className="lead">Pick the situation that sounds like yours. Each page goes deeper; you can always call if you are not sure.</p>
          <ul className="city-link-grid">
            {hubServicePages.map((page) => (
              <li key={page.slug}>
                <Link href={`/${page.slug}`}>{pageLinkLabel(page)}</Link>
              </li>
            ))}
            <li><Link href="/services">All service pages</Link></li>
            <li><Link href="/locations">Find your city</Link></li>
          </ul>
        </div>
      </section>

      <section className="metro-panel">
        <div className="wrap">
          <h2>Your city</h2>
          <p className="lead">Each guide mentions neighbourhoods, weather quirks, and landmarks we hear about on real calls—not boilerplate.</p>
          <div className="metro-grid">
            {CITY_PAGES.map((page) => (
              <Link href={`/${page.slug}`} key={page.slug}>{pageLinkLabel(page)}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block wrap faq-stack">
        <h2>Common questions</h2>
        {homeFaqs.map((faq) => (
          <div className="faq-item" key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
