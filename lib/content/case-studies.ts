import fs from "fs";
import path from "path";

const CASES_DIR = path.join(process.cwd(), "content", "case-studies");

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASES_DIR)) return [];
  return fs.readdirSync(CASES_DIR).filter((f) => f.endsWith(".json"));
}

export function getCaseStudies(): Record<string, import("./types").CaseStudy> {
  const slugs = getCaseStudySlugs();
  const studies: Record<string, import("./types").CaseStudy> = {};
  for (const slugFile of slugs) {
    const slug = slugFile.replace(/\.json$/, "");
    const filePath = path.join(CASES_DIR, slugFile);
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    validateCaseStudy(data, slug);
    studies[slug] = data;
  }
  return studies;
}

export function getCaseStudy(slug: string): import("./types").CaseStudy | null {
  const filePath = path.join(CASES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  validateCaseStudy(data, slug);
  return data;
}

function validateCaseStudy(data: any, slug: string): void {
  const required: (keyof import("./types").CaseStudy)[] = [
    "slug",
    "client",
    "headline",
    "sector",
    "location",
    "engagement",
    "duration",
    "situation",
    "challenge",
    "thinking",
    "workstreams",
    "proof",
    "gallery",
    "hero",
    "video",
  ];
  const missing = required.filter((key) => !(key in data));
  if (missing.length > 0) {
    throw new Error(`Case study "${slug}" is missing required fields: ${missing.join(", ")}`);
  }
  if (!Array.isArray(data.workstreams) || data.workstreams.length === 0) {
    throw new Error(`Case study "${slug}" must have at least one workstream.`);
  }
  if (!Array.isArray(data.gallery) || data.gallery.length === 0) {
    throw new Error(`Case study "${slug}" must have at least one gallery item.`);
  }
}