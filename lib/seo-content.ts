import { CITY_FACTS } from "./city-facts";
import { CITY_NARRATIVES } from "./city-narratives";
import { pageLinkLabel } from "./link-labels";
import { metaDescriptionFor, metaTitleFor } from "./seo-meta";
import {
  CITY_PAGES,
  type SeoPage,
  PAGES,
  PHONE_DISPLAY,
  locationName,
  getPage,
} from "./pages";

export type FaqItem = { q: string; a: string };
export type ContentSection = { h2: string; paragraphs: string[] };
export type InternalLink = { href: string; anchor: string };

export const PILLAR_SLUG = "elevator-repair";
export const EMERGENCY_SLUG = "emergency-elevator-repair";

export function h1For(page: SeoPage) {
  const place = locationName(page);
  switch (page.slug) {
    case EMERGENCY_SLUG:
      return "Need help right now?";
    case PILLAR_SLUG:
      return "Repairs anywhere in Canada";
    case "home-elevator-repair":
      return "Problems with a home lift?";
    case "elevator-drive-repair":
      return "Motor or drive acting up?";
    case "elevator-repair-ontario":
      return "Ontario buildings we support";
    default:
      if (page.kind === "city") return `Elevator trouble in ${place}?`;
      return `Help in ${place}`;
  }
}

function citiesInProvince(code: string) {
  return CITY_PAGES.filter((p) => p.area.endsWith(`, ${code}`));
}

export function internalLinksFor(page: SeoPage): InternalLink[] {
  const pillar = getPage(PILLAR_SLUG)!;
  const emergency = getPage(EMERGENCY_SLUG)!;
  const home = getPage("home-elevator-repair")!;
  const drive = getPage("elevator-drive-repair")!;
  const ontario = getPage("elevator-repair-ontario")!;
  const links: InternalLink[] = [];
  const seen = new Set<string>();

  const add = (target: SeoPage | { slug: string; kind?: SeoPage["kind"]; area?: string }, anchor?: string) => {
    const slug = target.slug;
    const href = `/${slug}`;
    if (href === `/${page.slug}` || seen.has(href)) return;
    seen.add(href);
    const label = anchor ?? pageLinkLabel(target as SeoPage);
    links.push({ href, anchor: label });
  };

  if (page.slug === PILLAR_SLUG) {
    add(emergency);
    add(home);
    add(drive);
    add(ontario);
    for (const city of CITY_PAGES) add(city);
    return links;
  }

  if (page.slug === EMERGENCY_SLUG) {
    add(pillar, "Non-urgent repairs");
    add(home);
    const priority = CITY_PAGES.filter((c) => c.priority === "Top Priority" || c.priority === "High").slice(0, 5);
    for (const city of priority) add(city);
    return links;
  }

  if (page.slug === "home-elevator-repair" || page.slug === "elevator-drive-repair") {
    add(pillar);
    add(emergency, "If someone is trapped");
    for (const city of ["elevator-repair-toronto", "elevator-repair-vancouver", "elevator-repair-calgary"]) {
      const c = getPage(city);
      if (c) add(c);
    }
    return links;
  }

  if (page.slug === "elevator-repair-ontario") {
    add(pillar);
    add(emergency, "Urgent situations");
    for (const city of citiesInProvince("ON")) add(city);
    return links;
  }

  if (page.kind === "city") {
    add(pillar, "Canada-wide overview");
    add(emergency, "Someone is stuck");
    add(home, "Home lifts");
    add(drive, "Motors & drives");
    const code = page.area.split(", ")[1];
    if (code === "ON") add(ontario);
    const neighbours = CITY_PAGES.filter((c) => c.area.endsWith(`, ${code}`) && c.slug !== page.slug).slice(0, 3);
    for (const n of neighbours) add(n);
    return links;
  }

  add(pillar);
  add(emergency);
  return links;
}

function cityIntro(page: SeoPage): string {
  const place = locationName(page);
  const narrative = CITY_NARRATIVES[page.slug];
  if (narrative) {
    return `${narrative} When you are ready, call ${PHONE_DISPLAY}.`;
  }
  const facts = CITY_FACTS[page.slug];
  return `If your car will not level, the doors keep reopening, or the panel is flashing codes, you are not alone—managers in ${place} call us with the same problems. Tell us your address, what you are seeing, and whether anyone is stuck; we will line up a technician and give you a straight ETA. ${facts ? `Buildings near ${facts.landmark} and ${facts.neighbourhood} are part of our regular routes, and ${facts.climate.toLowerCase()} often shows up in the symptoms we hear about.` : ""} Reach us at ${PHONE_DISPLAY}.`;
}

function citySections(page: SeoPage): ContentSection[] {
  const place = locationName(page);
  const facts = CITY_FACTS[page.slug];
  const hood = facts?.neighbourhood ?? `core districts of ${place}`;
  const climate = facts?.climate ?? "seasonal temperature swings in the region";
  const landmark = facts?.landmark ?? place;
  return [
    {
      h2: "What happens when you call",
      paragraphs: [
        `We will ask which car failed, whether fire service is affected, and if passengers are involved. Near ${hood}, parking and security rules can shape arrival time—tell us up front so we are not waiting at the loading dock.`,
        `You do not need perfect technical words. Noises, smells, and whatever the panel shows are enough for us to start.`,
      ],
    },
    {
      h2: "Weather and wear where you are",
      paragraphs: [
        `${place} has newer machine-room-less installs and older hydraulics that still run every day. Around ${landmark}, heavy use is normal. ${climate.charAt(0).toUpperCase()}${climate.slice(1)}—so we may ask about door heaters, the pit sump, and machine-room temperature when symptoms track with the season.`,
        `A photo of the controller display helps when it is safe to take one. If not, describe what you see from the landing and we will work with that.`,
      ],
    },
    {
      h2: "Before the technician arrives",
      paragraphs: [
        `Have keys, machine room access, and someone on site who answers the phone. Visits near ${landmark} sometimes need an escort after hours—share building rules when you call.`,
        `Before the car goes back into service, it should be run on several floors with doors and safeties checked—not just cleared and left.`,
      ],
    },
    {
      h2: "Where to go next",
      paragraphs: [
        `If anyone is trapped or something feels unsafe, use the emergency line—do not wait. For a Canada-wide overview or another city near you, use the links at the bottom of this page.`,
        `If you manage more than one property in the area, mention them on the call; we may be able to combine visits.`,
      ],
    },
  ];
}

function cityFaqs(page: SeoPage): FaqItem[] {
  const place = locationName(page);
  const facts = CITY_FACTS[page.slug];
  const hood = facts?.neighbourhood ?? `central ${place}`;
  return [
    {
      q: `How fast can you get to my building in ${place}?`,
      a: `It depends on time of day, traffic near ${hood}, and whether anyone is trapped. Entrapments go to the front of the queue. Call ${PHONE_DISPLAY} with your address and we will give you our best estimate—not a vague “someone will call you back.”`,
    },
    {
      q: `Do you work on both office towers and smaller buildings?`,
      a: `Yes. ${place} has high-rise condos, clinics, retail, and homes with private lifts—especially around ${facts?.neighbourhood ?? "the urban core"}. Tell us what type of unit you have, even if you are not sure of the brand.`,
    },
    {
      q: `Can weather in ${place} really affect my elevator?`,
      a: `Often, yes. ${facts?.climate ?? "Local seasons"} change how doors close, how hydraulics behave, and how warm a machine room gets. Mention recent weather when symptoms started—we will know what to check first.`,
    },
    {
      q: "Is this a different line than the main site?",
      a: `No—it is the same team at ${PHONE_DISPLAY}. This page adds local context for ${place}; the overview page is there if you want the big picture.`,
    },
  ];
}

function emergencyIntro(): string {
  return `If someone is stuck, if the car is moving in a way that scares people, or if you smell burning from the machine room, treat it as an emergency. This line is answered around the clock across Canada. We will stay on the phone while you make the landing safe, post “out of service” signs, and coordinate with firefighters if they are already on scene. We need the address, which elevator it is, what floor the car is near, and whether anyone needs medical help. Our job is to get a qualified technician moving without cutting corners on door locks or safety circuits—shortcuts create real liability. Sometimes the car must stay offline until parts arrive; we will say that clearly so you can tell tenants what to expect. For odd noises or minor leveling issues with no one at risk, you can still call, but our regular repair line may be a better fit. Save ${PHONE_DISPLAY} in your machine room and at the front desk.`;
}

function emergencySections(): ContentSection[] {
  return [
    {
      h2: "What counts as an elevator emergency",
      paragraphs: [
        "Entrapments with people inside always qualify. So do situations where the car moves unpredictably, smells of burning insulation, or runs with doors bypassed. Smoke in the machine room, loss of firefighter service during an active alarm, or a hydraulic leak into a pit also require immediate isolation.",
        "If you are unsure, treat it as an emergency until a qualified technician confirms the car is safe to park and lock out. Never force doors or rescue passengers without training—wait for professional support while keeping occupants calm.",
      ],
    },
    {
      h2: "Information our emergency desk collects",
      paragraphs: [
        "Address, elevator number, and floor of the car. Number of passengers and any medical needs. Whether firefighters are on scene. Photos of the controller display help when staff can safely take them.",
        "Property contacts with keys to machine rooms, MR closets, and electrical disconnects save minutes. If multiple cars share a bank, tell us which unit failed so we do not dispatch for the wrong controller.",
      ],
    },
    {
      h2: "After the urgent visit",
      paragraphs: [
        "Technicians test safeties, door circuits, and leveling before returning a car to service. You should receive a verbal summary of root cause and any follow-up parts required. Schedule preventive maintenance if the failure exposed overdue wear.",
        "For non-urgent quotes and maintenance planning, open the city guide closest to your building—Toronto, Vancouver, Calgary, Montreal, and others each have their own page.",
      ],
    },
  ];
}

function emergencyFaqs(): FaqItem[] {
  return [
    {
      q: "Should I call 911 or the elevator emergency line first?",
      a: "If anyone is injured or in immediate medical danger, call 911 first. For entrapments without injury, call " + PHONE_DISPLAY + " while keeping passengers calm and the landing secured.",
    },
    {
      q: "Can you free passengers remotely?",
      a: "Some modern controllers support remote reset, but many entrapments require an on-site technician with proper training and lockout tools. We dispatch based on what you describe—not guesses.",
    },
    {
      q: "Will the elevator be tagged out of service after an emergency visit?",
      a: "If safeties cannot be verified, the car may remain offline until parts arrive. We explain timelines and interim signage so building managers can communicate with tenants clearly.",
    },
    {
      q: "Is this different from your regular repair line?",
      a: "Emergency is for active risk and entrapments. Planned diagnostics, drive work, and home lift tune-ups usually start on the Canada-wide overview page, which links to city guides.",
    },
  ];
}

function pillarIntro(): string {
  return `You should not have to dig through ten websites when an elevator fails. This is our Canada-wide repair line for property managers, facility teams, and owners who want one clear phone number and straight answers. We work on traction and hydraulic systems, newer machine-room-less designs, and many residential lifts. On the first call we ask practical questions—what the car is doing, whether anyone is trapped, how to get into the machine room—so the right technician shows up with the right mindset. Repairs are done with lockout and testing: doors, brakes, leveling on multiple floors, not a quick reset that fails an hour later. Whether your building is a Toronto tower, a Vancouver condo, a Calgary campus, or a ski-town hotel, the same team answers and keeps notes for the next time. Browse your city below for local notes, or call ${PHONE_DISPLAY} if you need help now.`;
}

function pillarSections(): ContentSection[] {
  return [
    {
      h2: "Building types we repair nationally",
      paragraphs: [
        "High-rise residential and office towers with high cycle counts. Hospitals and clinics where uptime affects patient flow. Hotels and conference centres with heavy luggage traffic. Mixed-use podiums with separate freight and passenger banks. Low-rise commercial and institutional buildings with single hydraulic cars.",
        "Home elevators and accessibility lifts appear in private residences—especially where aging in place is a priority. Drive packages and controllers receive dedicated troubleshooting when faults are intermittent or heat-related.",
      ],
    },
    {
      h2: "Typical repair paths",
      paragraphs: [
        "Door operator and clutch adjustments when reopening or slamming is reported. Controller faults presenting as error codes or unexplained shutdowns. Hydraulic leaks, tank heaters, and valve issues affecting leveling. Traction issues including rope wear indicators and brake lining concerns.",
        "Each path starts with isolation and measurement, not part swapping. You receive a plain-language summary suitable for owner reports and insurer questions when applicable.",
      ],
    },
    {
      h2: "Maintenance alongside break/fix",
      paragraphs: [
        "Many outages trace to deferred maintenance—accumulated door track debris, dried hydraulic packing, or outdated software parameters. After a repair stabilizes the car, ask about scheduled visits aligned to manufacturer intervals and your local authority expectations.",
        "Pairing maintenance with on-call repair reduces entrapment risk and extends component life, especially in climates with wide temperature swings.",
      ],
    },
    {
      h2: "Where we publish local guides",
      paragraphs: [
        "Pick your city for notes on neighbourhoods, climate wear, and landmarks we hear about on calls. Each guide links back here and to the emergency line when safety is in question.",
        "If your city is not listed, call anyway—routing expands based on technician availability and partner coverage.",
      ],
    },
    {
      h2: "Documentation owners expect",
      paragraphs: [
        "Boards and asset managers increasingly ask what was tested after a shutdown. We describe door circuit verification, brake engagement checks, and whether any parameters were changed in the drive or controller.",
        "That narrative supports insurance questionnaires and helps you compare third-party maintenance quotes without conflicting stories about the same fault.",
      ],
    },
    {
      h2: "When to escalate to emergency routing",
      paragraphs: [
        "Any entrapment, smell of burning, uncontrolled movement, or loss of firefighter service during an active alarm should go to the emergency line immediately.",
        "For planned modernizations or recurring nuisance trips without safety impact, stay on this line so coordinators can schedule visits that align with tenant notices and inspection calendars.",
      ],
    },
  ];
}

function pillarFaqs(): FaqItem[] {
  return [
    {
      q: "Is this page different from the city guides?",
      a: "Yes. This one explains how dispatch works nationwide, safety standards, and equipment types. City pages add landmarks, climate notes, and neighbourhood context—you still reach the same team.",
    },
    {
      q: "Do you replace entire controllers or only components?",
      a: "Scope depends on age, parts availability, and authority requirements. We discuss repair versus modernization after diagnosis—no blanket upsell on the first call.",
    },
    {
      q: "Can strata councils and condo boards use this line?",
      a: "Absolutely. We document entrapment history and recurring faults so boards can compare contractor recommendations with an independent intake record.",
    },
    {
      q: "When should I use the emergency line instead?",
      a: "Any entrapment, burning smell, uncontrolled movement, or fire service loss during an alarm warrants the emergency line at " + PHONE_DISPLAY + " instead of waiting for scheduled service.",
    },
  ];
}

function specialtyIntro(page: SeoPage): string {
  if (page.slug === "home-elevator-repair") {
    return `A home elevator stops being convenient the moment it stops moving. We take calls from homeowners, caregivers, and family members across Canada who need someone respectful of finished floors and tight stair landings. Tell us the make and age if you know them, whether the cab is stuck with someone inside, and how the lift is used day to day. Technicians check the basics that matter at home—door edges, phone in the cab, battery lowering if equipped—before chasing bigger repairs. Parts sometimes ship from the manufacturer; we will be upfront about timing and cost. If the lift has been failing repeatedly, we will also talk honestly about whether repair still makes sense versus replacement. Call ${PHONE_DISPLAY} and mention it is a residential unit.`;
  }
  return `When a drive overheats, trips on a fault, or causes the car to hunt between floors, you need electrical expertise—not just a mechanical tune-up. We help building teams across Canada sort drive and motor problems on traction units and modern MRL gear. Error codes, hot smells from the cabinet, and faults that only appear after a long run are all useful clues. Share them when you call. We send technicians who can work safely inside the controller and drive, test under load, and leave you with a plain summary of what failed. We do not endorse bypassing safeties to “keep the building running.” If passengers are trapped, call the emergency line at ${PHONE_DISPLAY} instead.`;
}

function specialtySections(page: SeoPage): ContentSection[] {
  if (page.slug === "home-elevator-repair") {
    return [
      {
        h2: "Why homeowners call us directly",
        paragraphs: [
          "Residential lifts fail quietly until a caregiver cannot reach a bedroom level. That urgency is different from a downtown office bank with a spare car.",
          "This line records household-specific details—narrow stair landings, finished cab interiors, and pets—so technicians arrive with appropriate protection and tools.",
        ],
      },
      {
        h2: "Residential equipment we see most often",
        paragraphs: [
          "Through-floor lifts tucked beside staircases. Small traction home elevators with custom cab finishes. Wheelchair platform lifts in garages and porches. Each has different safeties and maintenance intervals.",
          "We ask about pets, children, and caregivers who rely on the lift daily so ETA expectations are realistic.",
        ],
      },
      {
        h2: "Privacy and access at home",
        paragraphs: [
          "Technicians work with shoe covers and drop cloths when requested. If the car is stuck between floors, we coordinate with you before power cycles that could affect adjacent rooms.",
          "Remote rural properties may need longer travel allowances—share gate codes and driveway notes during intake.",
        ],
      },
    ];
  }
  return [
    {
      h2: "Why drive faults need a specialist desk",
      paragraphs: [
        "Drives interact with encoders, motor windings, and software limits. A mechanical-only visit may replace unrelated parts while heat damage continues in the cabinet.",
        "This desk exists so your building gets electrical troubleshooting first, then mechanical follow-up if rollers or guides contributed to the symptom.",
      ],
    },
    {
      h2: "Drive symptoms worth documenting",
      paragraphs: [
        "Error codes referencing inverter, OL, or DC bus. Hot smells from the drive cabinet. Intermittent faults only after long runs. Noise changes that coincide with acceleration.",
        "Photos of nameplates and ventilation filters help us bring compatible spares on the first visit when possible.",
      ],
    },
    {
      h2: "Testing after drive repair",
      paragraphs: [
        "Load tests across the travel height, not only one floor. Verification that regenerative energy is handled without nuisance trips. Confirmation that door interlocks still open only when permitted.",
        "We log parameters changed so future contractors understand the baseline.",
      ],
    },
  ];
}

function specialtyFaqs(page: SeoPage): FaqItem[] {
  if (page.slug === "home-elevator-repair") {
    return [
      {
        q: "Can you service a home elevator originally installed by another company?",
        a: "Yes, if parts and documentation exist. Share any manual or prior invoice; we still help when records are missing by identifying the controller and drive on site.",
      },
      {
        q: "Is home elevator repair covered by warranty?",
        a: "Warranty depends on OEM and installer contracts—we do not promise coverage on the phone, but we document findings for your claim.",
      },
      {
        q: "How is residential routing different from a commercial tower?",
        a: "Residential calls emphasize household access windows and smaller footprints. High-rises usually go through the Canada-wide desk with a city guide for local notes.",
      },
    ];
  }
  return [
    {
      q: "Is drive repair always cheaper than replacement?",
      a: "Not always. When capacitors, heat sinks, or boards are obsolete, we explain modernization options with rough timelines before you commit.",
    },
    {
      q: "Can a mechanical technician fix my drive?",
      a: "Drive faults require electrical qualifications. We match skill set during dispatch rather than sending the nearest mechanical-only resource.",
    },
    {
      q: "Will drive work require an outage for the whole building?",
      a: "Often one bank can be isolated, but fire service and egress plans matter. We discuss tenant communication before lockout.",
    },
  ];
}

function ontarioIntro(): string {
  return `Ontario has everything from Toronto’s supertall cores to single hydraulic cars in small-town clinics—and the rules and access issues change block by block. We answer calls province-wide, including Ottawa’s bilingual buildings, Hamilton hospitals on the escarpment, and busy 401-corridor warehouses in Mississauga and Markham. Tell us if TSSA or your maintenance contractor is already involved, whether fire service is affected, and which city you are in. Winter freeze-thaw and humid summers both show up as door and hydraulic problems; we will ask about heaters and machine-room temperature when it matters. Pick your city below for neighbourhood notes, or call ${PHONE_DISPLAY} for help anywhere in the province.`;
}

function ontarioSections(): ContentSection[] {
  return [
    {
      h2: "Ontario building mix",
      paragraphs: [
        "Downtown financial towers with high traffic peaks. Suburban mid-rises near GO Transit hubs. University residences with heavy move-in weeks. Rural clinics with single hydraulic cars.",
        "Each scenario changes spare parts strategy and acceptable outage windows.",
      ],
    },
    {
      h2: "Coordinating with maintenance contractors",
      paragraphs: [
        "Many Ontario buildings retain primary maintenance agreements while using our line for overflow, entrapments, or second opinions. We document findings in plain language suitable for board packets.",
        "If TSSA orders are active, mention them during intake so timelines respect regulatory holds.",
      ],
    },
  ];
}

function ontarioFaqs(): FaqItem[] {
  return [
    {
      q: "How is this different from the Canada-wide overview?",
      a: "The overview explains dispatch nationwide. This page adds Ontario-specific context and links to every Ontario city we publish.",
    },
    {
      q: "Can you cover both Toronto and smaller Ontario markets in one contract discussion?",
      a: "Dispatch can note multiple addresses on a call. Formal contracts are discussed after the first repair stabilizes each site.",
    },
    {
      q: "What should Ottawa bilingual buildings know?",
      a: "Share language needs for on-site staff and tenant notices—we note it for the technician briefing.",
    },
  ];
}

export function introFor(page: SeoPage): string {
  switch (page.slug) {
    case EMERGENCY_SLUG:
      return emergencyIntro();
    case PILLAR_SLUG:
      return pillarIntro();
    case "elevator-repair-ontario":
      return ontarioIntro();
    case "home-elevator-repair":
    case "elevator-drive-repair":
      return specialtyIntro(page);
    default:
      if (page.kind === "city") return cityIntro(page);
      return pillarIntro();
  }
}

export function sectionsFor(page: SeoPage): ContentSection[] {
  switch (page.slug) {
    case EMERGENCY_SLUG:
      return emergencySections();
    case PILLAR_SLUG:
      return pillarSections();
    case "elevator-repair-ontario":
      return ontarioSections();
    case "home-elevator-repair":
    case "elevator-drive-repair":
      return specialtySections(page);
    default:
      if (page.kind === "city") return citySections(page);
      return pillarSections();
  }
}

export function faqsFor(page: SeoPage): FaqItem[] {
  switch (page.slug) {
    case EMERGENCY_SLUG:
      return emergencyFaqs();
    case PILLAR_SLUG:
      return pillarFaqs();
    case "elevator-repair-ontario":
      return ontarioFaqs();
    case "home-elevator-repair":
    case "elevator-drive-repair":
      return specialtyFaqs(page);
    default:
      if (page.kind === "city") return cityFaqs(page);
      return pillarFaqs();
  }
}

export function faqHeadingFor(page: SeoPage) {
  const place = locationName(page);
  if (page.slug === EMERGENCY_SLUG) return "Questions during an emergency";
  if (page.slug === PILLAR_SLUG) return "Questions from building managers";
  if (page.kind === "city") return `Questions we hear in ${place}`;
  if (page.slug === "elevator-repair-ontario") return "Questions across Ontario";
  return `Common questions — ${place}`;
}

export function heroLeadFor(page: SeoPage, maxWords = 42) {
  const words = introFor(page).split(/\s+/);
  const slice = words.slice(0, maxWords).join(" ");
  return words.length > maxWords ? `${slice}…` : slice;
}

export function pageSeoMeta(page: SeoPage) {
  const intro = introFor(page);
  return {
    title: metaTitleFor(page),
    description: metaDescriptionFor(page, intro, PHONE_DISPLAY),
  };
}

/** Pages that should appear in sitemap with link equity checks */
export function allSlugsLinkedFromPillar() {
  return PAGES.map((p) => p.slug);
}
