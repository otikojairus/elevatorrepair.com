import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/visuals";
import {
  EMERGENCY_SLUG,
  faqHeadingFor,
  faqsFor,
  h1For,
  heroLeadFor,
  internalLinksFor,
  introFor,
  pageSeoMeta,
  sectionsFor,
} from "@/lib/seo-content";
import { CITY_PAGES, PAGES, PHONE_DISPLAY, PHONE_E164, SITE_NAME, absoluteUrl, getPage, locationName } from "@/lib/pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug);
  if (!page) return {};
  const { title, description } = pageSeoMeta(page);
  return {
    title,
    description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title, description, url: absoluteUrl(page.slug), type: "website" },
  };
}

export default async function SeoPage({ params }: Props) {
  const page = getPage((await params).slug);
  if (!page) notFound();
  const place = locationName(page);
  const faqs = faqsFor(page);
  const sections = sectionsFor(page);
  const links = internalLinksFor(page);
  const cityOnlyLinks = links.filter((link) => CITY_PAGES.some((c) => link.href === `/${c.slug}`));
  const nonCityLinks = links.filter((link) => !CITY_PAGES.some((c) => link.href === `/${c.slug}`));
  const isEmergency = page.slug === EMERGENCY_SLUG;
  const isPillar = page.slug === "elevator-repair";
  const isCity = page.kind === "city";
  const fullIntro = introFor(page);

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: h1For(page),
      serviceType: page.keyword || "elevator repair",
      provider: { "@type": "Organization", name: SITE_NAME, telephone: PHONE_E164, url: absoluteUrl() },
      areaServed: page.area,
      url: absoluteUrl(page.slug),
      description: fullIntro,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
        {
          "@type": "ListItem",
          position: 2,
          name: page.kind === "city" ? "Locations" : "Services",
          item: absoluteUrl(page.kind === "city" ? "locations" : "services"),
        },
        { "@type": "ListItem", position: 3, name: h1For(page), item: absoluteUrl(page.slug) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  if (isCity) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE_NAME,
      image: absoluteUrl("images/hero-bg.webp"),
      telephone: PHONE_E164,
      url: absoluteUrl(page.slug),
      areaServed: { "@type": "City", name: place },
      description: fullIntro,
    });
  }

  return (
    <main>
      <JsonLd data={schemas} />
      <PageHero
        kicker={page.area}
        title={h1For(page)}
        lead={<p>{heroLeadFor(page)}</p>}
        ctaLabel={isEmergency ? "Emergency line" : "Call dispatch"}
        secondaryHref={isEmergency ? "/elevator-repair" : "/emergency-elevator-repair"}
        secondaryLabel={isEmergency ? "Scheduled repair" : "Emergency line"}
      />

      <div className="wrap content-layout">
        <article className="prose-content">
          <p className="intro-paragraph">{fullIntro}</p>

          {sections.map((section) => (
            <section key={section.h2}>
              <h2>{section.h2}</h2>
              {section.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </section>
          ))}

          {isPillar && (
            <section>
              <h2>Cities we cover</h2>
              <p>Tap your market for neighbourhood context and local FAQs.</p>
              <ul className="city-link-grid">
                {cityOnlyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.anchor}</Link>
                  </li>
                ))}
              </ul>
              {nonCityLinks.length > 0 && (
                <>
                  <h3 style={{ marginTop: "2rem" }}>Other lines</h3>
                  <ul className="city-link-grid">
                    {nonCityLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.anchor}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          {!isPillar && links.length > 0 && (
            <section>
              <h2>{isCity ? "Nearby and related" : "You might also need"}</h2>
              <ul className="city-link-grid">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.anchor}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="faq-stack" aria-labelledby="faq-heading">
            <h2 id="faq-heading">{faqHeadingFor(page)}</h2>
            {faqs.map((faq) => (
              <div className="faq-item" key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </section>
        </article>

        <aside className="sticky-dial">
          <h2>{isEmergency ? "Emergency" : "Questions?"}</h2>
          <p>Call {PHONE_DISPLAY} and describe what the elevator is doing. We will tell you if it is an emergency or a scheduled visit.</p>
          <a className="btn btn-primary" href={`tel:${PHONE_E164}`}>
            <span className="btn-label">Tap to call</span>
            <span className="btn-value">{PHONE_DISPLAY}</span>
          </a>
        </aside>
      </div>
    </main>
  );
}
