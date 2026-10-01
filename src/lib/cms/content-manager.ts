import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DRAFTS_DIR = path.join(CONTENT_DIR, 'drafts');

// Ensure content and draft directories exist
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}
if (!fs.existsSync(DRAFTS_DIR)) {
  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
}

// In-memory active draft storage for fast, responsive multi-step editing & preview
const draftsInMemory: Record<string, any> = {};

export function readContentFile<T = any>(filename: string): T | null {
  try {
    const filePath = path.join(CONTENT_DIR, filename.endsWith('.json') ? filename : `${filename}.json`);
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return null;
  }
}

export function writeContentFile(filename: string, content: any): boolean {
  try {
    const filePath = path.join(CONTENT_DIR, filename.endsWith('.json') ? filename : `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    const key = filename.replace('.json', '');
    delete draftsInMemory[key];
    // Remove persistent draft file once published
    const draftPath = path.join(DRAFTS_DIR, `${key}.json`);
    if (fs.existsSync(draftPath)) {
      try {
        fs.unlinkSync(draftPath);
      } catch (e) {}
    }
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

export function readDraftFile<T = any>(sectionKey: string): T | null {
  try {
    const filePath = path.join(DRAFTS_DIR, `${sectionKey}.json`);
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (err) {
    return null;
  }
}

export function getSectionContent<T = any>(sectionKey: string, includeDraft = true): T | null {
  if (includeDraft) {
    if (draftsInMemory[sectionKey] !== undefined) {
      return draftsInMemory[sectionKey] as T;
    }
    const draftFromFile = readDraftFile<T>(sectionKey);
    if (draftFromFile) {
      draftsInMemory[sectionKey] = draftFromFile;
      return draftFromFile;
    }
  }
  return readContentFile<T>(`${sectionKey}.json`);
}

export function saveSectionDraft(sectionKey: string, draftData: any): void {
  draftsInMemory[sectionKey] = draftData;
  try {
    if (!fs.existsSync(DRAFTS_DIR)) {
      fs.mkdirSync(DRAFTS_DIR, { recursive: true });
    }
    const filePath = path.join(DRAFTS_DIR, `${sectionKey}.json`);
    fs.writeFileSync(filePath, JSON.stringify(draftData, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing draft for ${sectionKey}:`, err);
  }
}

export function getPendingChangesSummary(): {
  hasChanges: boolean;
  sectionsModified: string[];
  totalChangesCount: number;
} {
  const sectionsModified = new Set<string>(Object.keys(draftsInMemory));
  try {
    if (fs.existsSync(DRAFTS_DIR)) {
      const files = fs.readdirSync(DRAFTS_DIR);
      files.forEach((f) => {
        if (f.endsWith('.json')) sectionsModified.add(f.replace('.json', ''));
      });
    }
  } catch (e) {}

  let totalChangesCount = 0;
  const list = Array.from(sectionsModified);

  for (const key of list) {
    const original = readContentFile(`${key}.json`);
    const draft = draftsInMemory[key] || readDraftFile(key);
    if (draft && JSON.stringify(original) !== JSON.stringify(draft)) {
      totalChangesCount += 1;
    }
  }

  return {
    hasChanges: totalChangesCount > 0,
    sectionsModified: list,
    totalChangesCount,
  };
}

export function publishAllDrafts(): { success: boolean; publishedSections: string[] } {
  const published: string[] = [];
  const keys = new Set<string>(Object.keys(draftsInMemory));

  try {
    if (fs.existsSync(DRAFTS_DIR)) {
      const files = fs.readdirSync(DRAFTS_DIR);
      files.forEach((f) => {
        if (f.endsWith('.json')) keys.add(f.replace('.json', ''));
      });
    }
  } catch (e) {}

  for (const key of Array.from(keys)) {
    const draftData = draftsInMemory[key] || readDraftFile(key);
    if (draftData) {
      const success = writeContentFile(`${key}.json`, draftData);
      if (success) {
        published.push(key);
      }
    }
  }

  return {
    success: true,
    publishedSections: published,
  };
}

