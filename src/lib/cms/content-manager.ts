import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DRAFTS_DIR = path.join(CONTENT_DIR, 'drafts');
const TMP_CONTENT_DIR = path.join('/tmp', 'arohana_content');
const TMP_DRAFTS_DIR = path.join(TMP_CONTENT_DIR, 'drafts');

// Try creating local or fallback directories
try {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }
} catch (e) {
  // If process.cwd() is read-only, ensure /tmp directories exist
  try {
    if (!fs.existsSync(TMP_CONTENT_DIR)) fs.mkdirSync(TMP_CONTENT_DIR, { recursive: true });
    if (!fs.existsSync(TMP_DRAFTS_DIR)) fs.mkdirSync(TMP_DRAFTS_DIR, { recursive: true });
  } catch (err) {}
}

// In-memory active storage for fast, responsive multi-step editing & preview
const draftsInMemory: Record<string, any> = {};
const publishedInMemory: Record<string, any> = {};

export function readContentFile<T = any>(filename: string): T | null {
  const cleanName = filename.endsWith('.json') ? filename : `${filename}.json`;
  const key = cleanName.replace('.json', '');

  if (publishedInMemory[key] !== undefined) {
    return publishedInMemory[key] as T;
  }

  // 1. Check /tmp fallback first if present
  try {
    const tmpPath = path.join(TMP_CONTENT_DIR, cleanName);
    if (fs.existsSync(tmpPath)) {
      const data = fs.readFileSync(tmpPath, 'utf-8');
      const parsed = JSON.parse(data) as T;
      publishedInMemory[key] = parsed;
      return parsed;
    }
  } catch (e) {}

  // 2. Check main CONTENT_DIR
  try {
    const filePath = path.join(CONTENT_DIR, cleanName);
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data) as T;
    publishedInMemory[key] = parsed;
    return parsed;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return null;
  }
}

export function writeContentFile(filename: string, content: any): boolean {
  const cleanName = filename.endsWith('.json') ? filename : `${filename}.json`;
  const key = cleanName.replace('.json', '');
  publishedInMemory[key] = content;
  delete draftsInMemory[key];

  let written = false;

  // Try writing to primary CONTENT_DIR
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }
    const filePath = path.join(CONTENT_DIR, cleanName);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    written = true;

    // Remove persistent draft file once published
    const draftPath = path.join(DRAFTS_DIR, `${key}.json`);
    if (fs.existsSync(draftPath)) {
      try {
        fs.unlinkSync(draftPath);
      } catch (e) {}
    }
  } catch (err) {
    // If primary is read-only (e.g. AWS Lambda / Vercel), write to /tmp fallback
    try {
      if (!fs.existsSync(TMP_CONTENT_DIR)) {
        fs.mkdirSync(TMP_CONTENT_DIR, { recursive: true });
      }
      const tmpFilePath = path.join(TMP_CONTENT_DIR, cleanName);
      fs.writeFileSync(tmpFilePath, JSON.stringify(content, null, 2), 'utf-8');
      written = true;

      const tmpDraftPath = path.join(TMP_DRAFTS_DIR, `${key}.json`);
      if (fs.existsSync(tmpDraftPath)) {
        try {
          fs.unlinkSync(tmpDraftPath);
        } catch (e) {}
      }
    } catch (tmpErr) {
      console.error(`Error writing ${filename} to /tmp:`, tmpErr);
    }
  }

  return written;
}

export function readDraftFile<T = any>(sectionKey: string): T | null {
  try {
    const tmpPath = path.join(TMP_DRAFTS_DIR, `${sectionKey}.json`);
    if (fs.existsSync(tmpPath)) {
      const data = fs.readFileSync(tmpPath, 'utf-8');
      return JSON.parse(data) as T;
    }
  } catch (e) {}

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
    try {
      if (!fs.existsSync(TMP_DRAFTS_DIR)) {
        fs.mkdirSync(TMP_DRAFTS_DIR, { recursive: true });
      }
      const tmpFilePath = path.join(TMP_DRAFTS_DIR, `${sectionKey}.json`);
      fs.writeFileSync(tmpFilePath, JSON.stringify(draftData, null, 2), 'utf-8');
    } catch (tmpErr) {
      console.error(`Error writing draft for ${sectionKey} to /tmp:`, tmpErr);
    }
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

