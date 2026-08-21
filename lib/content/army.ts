import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "content", "army", "projects.json");

export interface ArmyData {
  projects: import("./types").ArmyProject[];
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
  };
  closing: {
    statement: string;
    cta: { label: string; href: string };
  };
}

export function getArmyProjects(): ArmyData {
  const raw = fs.readFileSync(FILE, "utf-8");
  const data = JSON.parse(raw);
  validateArmy(data);
  return data;
}

function validateArmy(data: any): void {
  if (!Array.isArray(data.projects)) {
    throw new Error("army/projects.json must contain a 'projects' array.");
  }
  if (!data.hero || typeof data.hero.headline !== "string") {
    throw new Error("army/projects.json must contain a 'hero' object with 'headline'.");
  }
}