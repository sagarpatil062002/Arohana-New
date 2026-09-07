import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Ensure content directory exists
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
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
    // Clear draft once published
    const key = filename.replace('.json', '');
    delete draftsInMemory[key];
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

export function getSectionContent<T = any>(sectionKey: string, includeDraft = true): T | null {
  if (includeDraft && draftsInMemory[sectionKey] !== undefined) {
    return draftsInMemory[sectionKey] as T;
  }
  return readContentFile<T>(`${sectionKey}.json`);
}

export function saveSectionDraft(sectionKey: string, draftData: any): void {
  draftsInMemory[sectionKey] = draftData;
}

export function getPendingChangesSummary(): {
  hasChanges: boolean;
  sectionsModified: string[];
  totalChangesCount: number;
} {
  const sectionsModified = Object.keys(draftsInMemory);
  let totalChangesCount = 0;

  for (const key of sectionsModified) {
    const original = readContentFile(`${key}.json`);
    const draft = draftsInMemory[key];
    if (JSON.stringify(original) !== JSON.stringify(draft)) {
      totalChangesCount += 1;
    }
  }

  return {
    hasChanges: totalChangesCount > 0,
    sectionsModified,
    totalChangesCount,
  };
}

export function publishAllDrafts(): { success: boolean; publishedSections: string[] } {
  const published: string[] = [];
  const keys = Object.keys(draftsInMemory);

  for (const key of keys) {
    const success = writeContentFile(`${key}.json`, draftsInMemory[key]);
    if (success) {
      published.push(key);
    }
  }

  return {
    success: true,
    publishedSections: published,
  };
}
