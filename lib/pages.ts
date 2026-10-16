export type PageKind = "national" | "specialty" | "province" | "city";

export type SeoPage = {
  id: number;
  title: string;
  slug: string;
  keyword: string;
  secondary: string[];
  area: string;
  priority: "Top Priority" | "High" | "Medium";
  kind: PageKind;
};

const row = (
  id: number,
  title: string,
  slug: string,
  keyword: string,
  secondary: string,
  area = "Canada",
  priority: SeoPage["priority"] = "Medium",
  kind: PageKind = "city",
): SeoPage => ({ id, title, slug, keyword, secondary: secondary ? secondary.split("|") : [], area, priority, kind });

export const PAGES: SeoPage[] = [
  row(1, "Emergency Elevator Repair | Call Now", "emergency-elevator-repair", "emergency elevator repair services", "", "Canada (National)", "Top Priority", "national"),
  row(2, "Elevator Repair | Call Now", "elevator-repair", "elevator repair", "elevator repair services|elevator repair service|local elevator repair|elevator repair near me|elevator repair company|elevator repair companies", "Canada (National)", "Top Priority", "national"),
  row(3, "Home Elevator Repair | Call Now", "home-elevator-repair", "home elevator repair", "", "Canada (National)", "High", "specialty"),
  row(4, "Elevator Drive Repair | Call Now", "elevator-drive-repair", "elevator drive repair", "", "Canada (National)", "Medium", "specialty"),
  row(5, "Elevator Repair Ontario | Call Now", "elevator-repair-ontario", "elevator repair ontario", "", "Ontario", "High", "province"),
  row(6, "Elevator Repair Mont-Tremblant | Call Now", "elevator-repair-mont-tremblant", "elevator repair mont-tremblant", "", "Mont-Tremblant, QC", "Top Priority"),
  row(7, "Elevator Repair Lachute | Call Now", "elevator-repair-lachute", "elevator repair lachute", "", "Lachute, QC", "Top Priority"),
  row(8, "Elevator Repair Toronto | Call Now", "elevator-repair-toronto", "elevator repair toronto", "", "Toronto, ON", "High"),
  row(9, "Elevator Repair Calgary | Call Now", "elevator-repair-calgary", "elevator repair", "", "Calgary, AB", "High"),
  row(10, "Elevator Repair Winnipeg | Call Now", "elevator-repair-winnipeg", "elevator repair", "", "Winnipeg, MB", "Medium"),
  row(11, "Elevator Repair Edmonton | Call Now", "elevator-repair-edmonton", "elevator repair", "", "Edmonton, AB", "High"),
  row(12, "Elevator Repair Ottawa | Call Now", "elevator-repair-ottawa", "elevator repair", "", "Ottawa, ON", "Medium"),
  row(13, "Elevator Repair Montreal | Call Now", "elevator-repair-montreal", "elevator repair", "", "Montreal, QC", "High"),
  row(14, "Elevator Repair Laval | Call Now", "elevator-repair-laval", "elevator repair", "", "Laval, QC", "Medium"),
  row(15, "Elevator Repair Hamilton | Call Now", "elevator-repair-hamilton", "elevator repair", "", "Hamilton, ON", "Medium"),
  row(16, "Elevator Repair St Catharines | Call Now", "elevator-repair-st-catharines", "elevator repair", "", "St. Catharines, ON", "Medium"),
  row(17, "Elevator Repair Markham | Call Now", "elevator-repair-markham", "elevator repair", "", "Markham, ON", "Medium"),
  row(18, "Elevator Repair North York | Call Now", "elevator-repair-north-york", "elevator repair", "", "North York, ON", "Medium"),
  row(19, "Elevator Repair London Ontario | Call Now", "elevator-repair-london-ontario", "elevator repair", "", "London, ON", "Medium"),
  row(20, "Elevator Repair Surrey BC | Call Now", "elevator-repair-surrey-bc", "elevator repair", "", "Surrey, BC", "Medium"),
  row(21, "Elevator Repair Mississauga | Call Now", "elevator-repair-mississauga", "elevator repair", "", "Mississauga, ON", "Medium"),
  row(22, "Elevator Repair Halifax | Call Now", "elevator-repair-halifax", "elevator repair", "", "Halifax, NS", "Medium"),
  row(23, "Elevator Repair Regina | Call Now", "elevator-repair-regina", "elevator repair", "", "Regina, SK", "Medium"),
  row(24, "Elevator Repair Vancouver | Call Now", "elevator-repair-vancouver", "elevator repair", "", "Vancouver, BC", "High"),
  row(25, "Elevator Repair Vaughan | Call Now", "elevator-repair-vaughan", "elevator repair", "", "Vaughan, ON", "Medium"),
  row(26, "Elevator Repair Etobicoke | Call Now", "elevator-repair-etobicoke", "elevator repair", "", "Etobicoke, ON", "Medium"),
  row(27, "Elevator Repair Barrie | Call Now", "elevator-repair-barrie", "elevator repair", "", "Barrie, ON", "Medium"),
  row(28, "Elevator Repair Woodbridge | Call Now", "elevator-repair-woodbridge", "elevator repair", "", "Woodbridge, ON", "Medium"),
  row(29, "Elevator Repair Thornhill | Call Now", "elevator-repair-thornhill", "elevator repair", "", "Thornhill, ON", "Medium"),
  row(30, "Elevator Repair Abbotsford | Call Now", "elevator-repair-abbotsford", "elevator repair", "", "Abbotsford, BC", "Medium"),
];

export const NATIONAL_PAGES = PAGES.filter((page) => page.kind === "national");
export const SPECIALTY_PAGES = PAGES.filter((page) => page.kind === "specialty");
export const PROVINCE_PAGES = PAGES.filter((page) => page.kind === "province");
export const CITY_PAGES = PAGES.filter((page) => page.kind === "city");

const PHONE_DISPLAY_DEFAULT = "1-888-892-0457";
const PHONE_E164_DEFAULT = "+18888920457";

function isPlaceholderPhone(value?: string) {
  return !value || /x{2,}/i.test(value) || value.includes("XXX");
}

export const PHONE_DISPLAY = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_DISPLAY)
  ? PHONE_DISPLAY_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_DISPLAY!;
export const PHONE_E164 = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_E164)
  ? PHONE_E164_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_E164!;
export const SITE_NAME = "ElevatorRepair.com";

export function getPage(slug: string) {
  return PAGES.find((page) => page.slug === slug);
}

export function cleanTitle(title: string) {
  return title.split("|")[0].trim();
}

export function locationName(page: SeoPage) {
  if (page.area.startsWith("Canada")) return "Canada";
  return page.area.split(",")[0].trim();
}

export { pageLinkLabel as linkLabelFor } from "./link-labels";

export function blurbFor(page: SeoPage) {
  const place = locationName(page);

  if (page.kind === "city") {
    return `What we usually see in ${place}—condos, offices, clinics, and the odd home lift—and how we schedule visits.`;
  }
  if (page.kind === "province") {
    return `Coordinated elevator service across ${page.area}, from high-rises to low-rise buildings.`;
  }

  const blurbs: Record<string, string> = {
    "emergency-elevator-repair": "Stuck cars, entrapments, and sudden outages—call for priority dispatch.",
    "elevator-repair": "Troubleshooting, parts replacement, and return-to-service for all elevator types.",
    "home-elevator-repair": "Residential lifts and home elevators serviced with minimal disruption.",
    "elevator-drive-repair": "Motor, drive, and controller issues diagnosed and repaired.",
  };

  return blurbs[page.slug] ?? "Matched to your building, equipment, and timeline.";
}

export function eyebrowFor(page: SeoPage) {
  if (page.kind === "city" || page.kind === "province") return page.area;
  if (page.slug === "emergency-elevator-repair") return "24/7 response";
  if (page.kind === "specialty") return "Specialized service";
  return "Canada-wide";
}

export { introFor, faqsFor, faqHeadingFor, h1For } from "./seo-content";
export { internalLinksFor as relatedPages } from "./seo-content";

export function absoluteUrl(path = "") {
  const root = process.env.NEXT_PUBLIC_SITE_URL || "https://elevatorrepair.com";
  return `${root.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
