import type { SeoPage } from "./pages";
import { locationName, SITE_NAME } from "./pages";

const BRAND = "ElevatorRepair.com";

export function trimTitle(title: string, max = 60) {
  if (title.length <= max) return title;
  const cut = title.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

export function trimDescription(text: string, min = 150, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max && clean.length >= min) return clean;
  if (clean.length < min) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > min ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

export function metaTitleFor(page: SeoPage) {
  const place = locationName(page);
  let title: string;
  switch (page.slug) {
    case "emergency-elevator-repair":
      title = `Emergency Elevator Repair Canada | ${BRAND}`;
      break;
    case "elevator-repair":
      title = `Elevator Repair Canada | ${BRAND}`;
      break;
    case "home-elevator-repair":
      title = `Home Elevator Repair Canada | ${BRAND}`;
      break;
    case "elevator-drive-repair":
      title = `Elevator Drive Repair Canada | ${BRAND}`;
      break;
    case "elevator-repair-ontario":
      title = `Elevator Repair Ontario | ${BRAND}`;
      break;
    default:
      if (page.kind === "city") {
        title = `Elevator Repair ${place} | ${BRAND}`;
      } else {
        title = `${place} | ${BRAND}`;
      }
  }
  return trimTitle(title);
}

export function metaDescriptionFor(page: SeoPage, introLead: string, phone: string) {
  const place = locationName(page);
  const cta = `Call ${phone} for dispatch.`;
  let base: string;
  if (page.slug === "emergency-elevator-repair") {
    base = `24/7 emergency elevator repair across Canada. Entrapments, outages, unsafe doors. ${cta}`;
  } else if (page.slug === "elevator-repair") {
    base = `National elevator repair for traction, hydraulic & MRL systems. Licensed technicians, safety sign-off. ${cta}`;
  } else if (page.kind === "city") {
    base = `${page.keyword} for ${place} condos, offices & hospitals. Diagnostics to return-to-service. ${cta}`;
  } else if (page.kind === "province") {
    base = `Elevator repair across ${page.area}—high-rises, mid-rise & residential. ${cta}`;
  } else {
    base = `${introLead.slice(0, 90)}… ${cta}`;
  }
  return trimDescription(base);
}

export { BRAND, SITE_NAME };
