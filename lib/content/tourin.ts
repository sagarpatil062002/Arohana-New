import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "content", "tourin", "experiences.json");

export interface TourinData {
  experiences: import("./types").TourinExperience[];
  meta: {
    eyebrow: string;
    headline: string;
    body: string;
    stat: { value: string; label: string };
    why: string;
    whyBody: string;
    believe: string;
    believeBody: string;
    ladakh: string;
    ladakhBody: string;
    from: string;
    fromBody: string;
    next: string;
    nextBody: string;
    packagesHeading: string;
    packagesBody: string;
    cta: { label: string; href: string };
    closing: string;
  };
}

export function getTourinData(): TourinData {
  const raw = fs.readFileSync(FILE, "utf-8");
  const data = JSON.parse(raw);
  validateTourin(data);
  return data;
}

function validateTourin(data: any): void {
  if (!Array.isArray(data.experiences)) {
    throw new Error("tourin/experiences.json must contain an 'experiences' array.");
  }
  if (typeof data.meta !== "object") {
    throw new Error("tourin/experiences.json must contain a 'meta' object.");
  }
}