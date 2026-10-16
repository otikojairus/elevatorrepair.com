import type { SeoPage } from "./pages";
import { locationName } from "./pages";

/** Short, human link text — avoid repeating the same keyword phrase on every anchor. */
export function pageLinkLabel(page: SeoPage) {
  if (page.kind === "city") return locationName(page);

  const labels: Record<string, string> = {
    "emergency-elevator-repair": "24/7 emergencies",
    "elevator-repair": "Repairs across Canada",
    "home-elevator-repair": "Home lifts",
    "elevator-drive-repair": "Motors & drives",
    "elevator-repair-ontario": "Ontario coverage",
  };
  return labels[page.slug] ?? locationName(page);
}

export function serviceTableTitle(page: SeoPage) {
  const titles: Record<string, string> = {
    "emergency-elevator-repair": "When someone is trapped or the car is unsafe",
    "elevator-repair": "Planned repairs & diagnostics",
    "home-elevator-repair": "Residential lifts",
    "elevator-drive-repair": "Drive and controller faults",
    "elevator-repair-ontario": "Province-wide (Ontario)",
  };
  return titles[page.slug] ?? pageLinkLabel(page);
}
