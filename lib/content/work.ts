import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "content", "work", "projects.json");

export interface WorkProjectWithMeta {
  projects: import("./types").WorkProject[];
  sectors: string[];
  sectorProjects: Record<string, string[]>;
  brands: string[];
}

export function getWorkProjects(): WorkProjectWithMeta {
  const raw = fs.readFileSync(FILE, "utf-8");
  const data = JSON.parse(raw);
  validateWorkProjects(data);
  return data;
}

export function getFeaturedWork(): import("./types").WorkProject[] {
  return getWorkProjects().projects.filter((p) => p.featured);
}

function validateWorkProjects(data: any): void {
  if (!Array.isArray(data.projects)) {
    throw new Error("work/projects.json must contain a 'projects' array.");
  }
  if (!Array.isArray(data.sectors)) {
    throw new Error("work/projects.json must contain a 'sectors' array.");
  }
  if (typeof data.sectorProjects !== "object") {
    throw new Error("work/projects.json must contain a 'sectorProjects' object.");
  }
}