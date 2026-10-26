export const vehicleSizes = [
  { id: "compact", name: "Compact", example: "Hatchbacks & small cars" },
  { id: "sedan", name: "Sedan", example: "Standard saloons & coupes" },
  { id: "suv", name: "SUV / crossover", example: "Larger cabins & bodywork" },
  {
    id: "van",
    name: "Van / pickup",
    example: "Large vehicles & utility bodies",
  },
] as const;
export type VehicleSize = (typeof vehicleSizes)[number]["id"];
export const packages = [
  {
    id: "reset",
    name: "THE RESET",
    label: "EVERYDAY CARE",
    description: "A considered refresh for the car you drive every day.",
    duration: "2–3 hours",
    prices: { compact: 1500, sedan: 1800, suv: 2200, van: 2600 },
    features: [
      "Exterior hand-wash concept",
      "Wheels & tyre clean",
      "Interior vacuum & wipe-down",
      "Glass clean & finishing checks",
    ],
    detail:
      "An everyday-care service concept built around a clean exterior and a refreshed cabin. The technician confirms the appropriate scope after inspecting your vehicle.",
  },
  {
    id: "deep",
    name: "DEEP DETAIL",
    label: "INSIDE & OUT",
    description: "For the places everyday cleaning doesn’t quite reach.",
    duration: "1 day",
    prices: { compact: 5500, sedan: 6500, suv: 8000, van: 9500 },
    features: [
      "Detailed exterior clean",
      "Interior deep-clean assessment",
      "Trim, cabin & upholstery care",
      "Finishing inspection",
    ],
    detail:
      "A more involved cleaning concept for exterior surfaces and the cabin. Materials, existing damage, stains, and vehicle condition determine the final methods, scope, and quotation.",
  },
  {
    id: "paint",
    name: "PAINT REVIVAL",
    label: "SURFACE REFINEMENT",
    description: "A closer look at the finish. A more considered approach.",
    duration: "1–2 days",
    prices: { compact: 10000, sedan: 12000, suv: 15000, van: 18000 },
    features: [
      "Paint-condition assessment",
      "Surface preparation concept",
      "Machine-polishing assessment",
      "Finish review & care guidance",
    ],
    detail:
      "A paint-refinement service concept. A technician must inspect paint condition, previous repairs, and surface suitability before recommending any polishing process or expected result.",
  },
  {
    id: "ceramic",
    name: "CERAMIC SHIELD",
    label: "PREPARE. PROTECT. MAINTAIN.",
    description: "A coating service concept that starts with preparation.",
    duration: "2–3 days",
    prices: { compact: 18000, sedan: 22000, suv: 27000, van: 32000 },
    features: [
      "Paint & surface assessment",
      "Preparation scope agreed first",
      "Coating product consultation",
      "Application & aftercare plan",
    ],
    detail:
      "A coating-preparation and application concept. Product choice, preparation requirements, cure time, care instructions, durability, and any warranty must be confirmed in the approved quotation. No protection period is promised by this sample package.",
  },
];
export const extras = [
  { id: "headlights", name: "Headlight refresh", price: 1500 },
  { id: "engine", name: "Engine bay care", price: 1800 },
  { id: "glass", name: "Glass treatment", price: 2200 },
  { id: "wheels", name: "Wheel deep clean", price: 1200 },
];
export type Selection = {
  packageId: string;
  vehicleSize: VehicleSize;
  extras: string[];
};
export const defaultSelection: Selection = {
  packageId: "deep",
  vehicleSize: "sedan",
  extras: [],
};
export function estimate(selection: Selection) {
  const p = packages.find((p) => p.id === selection.packageId);
  if (!p) throw Error("Unknown service package.");
  const base = p.prices[selection.vehicleSize];
  if (!base) throw Error("Unknown vehicle size.");
  const additional = extras
    .filter((e) => selection.extras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  return { base, additional, total: base + additional };
}
export const money = (n: number) => "₱" + n.toLocaleString("en-PH");
export const transformations = [
  {
    id: "midnight",
    name: "MIDNIGHT, REFINED.",
    category: "Exterior",
    image: "/images/hero.jpg",
    images: ["/images/hero.jpg", "/images/finish.jpg"],
    service: "paint",
    subtitle: "Exterior finish concept",
    description:
      "A closer look at automotive lines, reflections, and surface finish. This gallery illustrates an exterior-care concept using stock vehicle photography.",
    details: [
      "Exterior finish inspiration",
      "Vehicle condition reviewed first",
      "Scope confirmed after assessment",
    ],
  },
  {
    id: "cabin",
    name: "THE INSIDE STORY.",
    category: "Interior",
    image: "/images/interior.jpg",
    images: ["/images/interior.jpg", "/images/interiorwork.jpg"],
    service: "deep",
    subtitle: "Interior care concept",
    description:
      "The surfaces you spend every journey with deserve attention too. A cabin-care concept centred on materials, touchpoints, and thoughtful cleaning.",
    details: [
      "Cabin material assessment",
      "Interior cleaning scope agreed",
      "Finishing checks",
    ],
  },
  {
    id: "surface",
    name: "IT’S IN THE FINISH.",
    category: "Paint & protection",
    image: "/images/polish.jpg",
    images: ["/images/polish.jpg", "/images/hands.jpg"],
    service: "paint",
    subtitle: "Paint refinement concept",
    description:
      "An illustrative view of hands-on paint care. Surface suitability, paint condition, and expectations need a professional assessment before work begins.",
    details: [
      "Paint condition assessment",
      "Process selected for the surface",
      "Finish inspected with the owner",
    ],
  },
  {
    id: "foam",
    name: "A BETTER START.",
    category: "Exterior",
    image: "/images/foam.jpg",
    images: ["/images/foam.jpg", "/images/wash.jpg"],
    service: "reset",
    subtitle: "Wash & preparation concept",
    description:
      "A cleaning-process concept, from the first preparation step to the final checks. Stock photography illustrates the workflow rather than a completed REFINE job.",
    details: [
      "Initial inspection",
      "Exterior cleaning plan",
      "Final walkthrough",
    ],
  },
  {
    id: "protect",
    name: "PREPARED FOR MORE.",
    category: "Paint & protection",
    image: "/images/finish.jpg",
    images: ["/images/finish.jpg", "/images/workshop.jpg"],
    service: "ceramic",
    subtitle: "Coating preparation concept",
    description:
      "A protection-service concept that begins with a conversation about your vehicle, its condition, and the care routine that follows.",
    details: [
      "Product & preparation discussion",
      "Approved scope before application",
      "Aftercare plan",
    ],
  },
  {
    id: "touch",
    name: "THE SMALL THINGS.",
    category: "Interior",
    image: "/images/interiorwork.jpg",
    images: ["/images/interiorwork.jpg", "/images/interior.jpg"],
    service: "deep",
    subtitle: "Cabin detail concept",
    description:
      "Thoughtful attention to the spaces you see and touch every day. This interior example uses stock photographs of different vehicles.",
    details: [
      "Touchpoint care concept",
      "Material-specific assessment",
      "Cabin finishing review",
    ],
  },
];
export type Transformation = (typeof transformations)[number];
export const comparisons = [
  {
    name: "Exterior",
    before: "/images/foam.jpg",
    after: "/images/finish.jpg",
    title: "FROM PREPARATION TO PRESENTATION.",
    caption:
      "Illustrative stock comparison of different vehicles. These are not matched before-and-after photos or a claimed shop result.",
  },
  {
    name: "Interior",
    before: "/images/interiorwork.jpg",
    after: "/images/interior.jpg",
    title: "A FRESH PERSPECTIVE, INSIDE.",
    caption:
      "Illustrative stock photos show a cleaning process and a different finished interior. Replace with matched photos from the same vehicle.",
  },
];
export function todayISO() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export function addDays(iso: string, n: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export function dateError(value: string, today = todayISO()) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(Date.parse(value + "T00:00:00Z")) ||
    new Date(value + "T00:00:00Z").toISOString().slice(0, 10) !== value
  )
    return "Choose a valid preferred visit date.";
  if (value < today) return "Choose today or a future visit date.";
  if (value > addDays(today, 180))
    return "Choose a visit date within the next six months.";
  return "";
}
