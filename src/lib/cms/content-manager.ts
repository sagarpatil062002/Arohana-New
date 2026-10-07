import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DRAFTS_DIR = path.join(CONTENT_DIR, 'drafts');
const TMP_CONTENT_DIR = path.join('/tmp', 'arohana_content');
const TMP_DRAFTS_DIR = path.join(TMP_CONTENT_DIR, 'drafts');

export const CMS_SECTIONS = [
  'home',
  'about',
  'work',
  'services',
  'tourin',
  'army-projects',
  'partners',
  'contact',
  'footer',
  'settings',
] as const;

// Ensure directories exist
try {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }
} catch (e) {
  try {
    if (!fs.existsSync(TMP_CONTENT_DIR)) fs.mkdirSync(TMP_CONTENT_DIR, { recursive: true });
    if (!fs.existsSync(TMP_DRAFTS_DIR)) fs.mkdirSync(TMP_DRAFTS_DIR, { recursive: true });
  } catch (err) {}
}

// In-memory caches to prevent repeated disk hits while maintaining speed
const draftsInMemory: Record<string, any> = {};
const publishedInMemory: Record<string, any> = {};

/**
 * Deep clone utility to guarantee completely isolated, non-shared mutable references
 * between Editor state, Draft state, and Published state.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Read published content file.
 * NEVER returns draft data.
 */
export function readContentFile<T = any>(filename: string): T | null {
  const cleanName = filename.endsWith('.json') ? filename : `${filename}.json`;
  const key = cleanName.replace('.json', '');

  if (publishedInMemory[key] !== undefined) {
    return deepClone(publishedInMemory[key]) as T;
  }

  const tmpPath = path.join(TMP_CONTENT_DIR, cleanName);
  const primaryPath = path.join(CONTENT_DIR, cleanName);

  const hasTmp = fs.existsSync(tmpPath);
  const hasPrimary = fs.existsSync(primaryPath);

  // Compare timestamps: runtime writes in TMP take precedence over build-time files in CONTENT_DIR
  if (hasTmp && hasPrimary) {
    try {
      const tmpStat = fs.statSync(tmpPath);
      const primaryStat = fs.statSync(primaryPath);
      if (tmpStat.mtimeMs >= primaryStat.mtimeMs) {
        const data = fs.readFileSync(tmpPath, 'utf-8');
        const parsed = JSON.parse(data) as T;
        publishedInMemory[key] = deepClone(parsed);
        return deepClone(parsed);
      } else {
        const data = fs.readFileSync(primaryPath, 'utf-8');
        const parsed = JSON.parse(data) as T;
        publishedInMemory[key] = deepClone(parsed);
        return deepClone(parsed);
      }
    } catch (err) {
      console.error(`Error comparing/reading content for ${filename}:`, err);
    }
  } else if (hasTmp) {
    try {
      const data = fs.readFileSync(tmpPath, 'utf-8');
      const parsed = JSON.parse(data) as T;
      publishedInMemory[key] = deepClone(parsed);
      return deepClone(parsed);
    } catch (e) {}
  } else if (hasPrimary) {
    try {
      const data = fs.readFileSync(primaryPath, 'utf-8');
      const parsed = JSON.parse(data) as T;
      publishedInMemory[key] = deepClone(parsed);
      return deepClone(parsed);
    } catch (err) {
      console.error(`Error reading ${filename} from CONTENT_DIR:`, err);
    }
  }

  return null;
}

/**
 * Write published content file.
 * Commits changes to the live published dataset and cleans up any section draft.
 */
export function writeContentFile(filename: string, content: any): boolean {
  const cleanName = filename.endsWith('.json') ? filename : `${filename}.json`;
  const key = cleanName.replace('.json', '');
  
  // Clone to prevent external mutations from affecting cached published data
  publishedInMemory[key] = deepClone(content);
  // Clear any draft from memory once published
  delete draftsInMemory[key];

  let written = false;

  // 1. Always write to TMP_CONTENT_DIR (guaranteed writable in serverless/container runtimes)
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

  // 2. Also write to primary CONTENT_DIR if filesystem is writable
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
    // Expected on read-only environments (e.g. Vercel serverless)
  }

  return written;
}

/**
 * Read draft file from persistent storage if exists.
 */
export function readDraftFile<T = any>(sectionKey: string): T | null {
  // Check memory first
  if (draftsInMemory[sectionKey] !== undefined) {
    return deepClone(draftsInMemory[sectionKey]) as T;
  }

  const primaryDraftPath = path.join(DRAFTS_DIR, `${sectionKey}.json`);
  const tmpDraftPath = path.join(TMP_DRAFTS_DIR, `${sectionKey}.json`);

  const hasTmp = fs.existsSync(tmpDraftPath);
  const hasPrimary = fs.existsSync(primaryDraftPath);

  if (hasTmp && hasPrimary) {
    try {
      const tmpStat = fs.statSync(tmpDraftPath);
      const primaryStat = fs.statSync(primaryDraftPath);
      if (tmpStat.mtimeMs >= primaryStat.mtimeMs) {
        const data = fs.readFileSync(tmpDraftPath, 'utf-8');
        const parsed = JSON.parse(data) as T;
        draftsInMemory[sectionKey] = deepClone(parsed);
        return deepClone(parsed);
      } else {
        const data = fs.readFileSync(primaryDraftPath, 'utf-8');
        const parsed = JSON.parse(data) as T;
        draftsInMemory[sectionKey] = deepClone(parsed);
        return deepClone(parsed);
      }
    } catch (e) {}
  } else if (hasTmp) {
    try {
      const data = fs.readFileSync(tmpDraftPath, 'utf-8');
      const parsed = JSON.parse(data) as T;
      draftsInMemory[sectionKey] = deepClone(parsed);
      return deepClone(parsed);
    } catch (e) {}
  } else if (hasPrimary) {
    try {
      const data = fs.readFileSync(primaryDraftPath, 'utf-8');
      const parsed = JSON.parse(data) as T;
      draftsInMemory[sectionKey] = deepClone(parsed);
      return deepClone(parsed);
    } catch (err) {}
  }

  return null;
}

/**
 * Get section content.
 * When includeDraft = true: returns Draft if available, else falls back to Published.
 * When includeDraft = false: STRICTLY returns Published content.
 */
export function getSectionContent<T = any>(sectionKey: string, includeDraft = false): T | null {
  if (includeDraft) {
    const draft = readDraftFile<T>(sectionKey);
    if (draft !== null && draft !== undefined) {
      return deepClone(draft);
    }
  }
  return readContentFile<T>(`${sectionKey}.json`);
}

/**
 * Save draft for a single section into the centralized CRM Draft Store.
 * NEVER writes to published content and NEVER affects the live website.
 */
export function saveSectionDraft(sectionKey: string, draftData: any): void {
  const cloned = deepClone(draftData);
  draftsInMemory[sectionKey] = cloned;

  // 1. Always write to TMP_DRAFTS_DIR (guaranteed writable)
  try {
    if (!fs.existsSync(TMP_DRAFTS_DIR)) {
      fs.mkdirSync(TMP_DRAFTS_DIR, { recursive: true });
    }
    const tmpFilePath = path.join(TMP_DRAFTS_DIR, `${sectionKey}.json`);
    fs.writeFileSync(tmpFilePath, JSON.stringify(cloned, null, 2), 'utf-8');
  } catch (tmpErr) {
    console.error(`Error writing draft for ${sectionKey} to /tmp:`, tmpErr);
  }

  // 2. Also write to DRAFTS_DIR if writable
  try {
    if (!fs.existsSync(DRAFTS_DIR)) {
      fs.mkdirSync(DRAFTS_DIR, { recursive: true });
    }
    const filePath = path.join(DRAFTS_DIR, `${sectionKey}.json`);
    fs.writeFileSync(filePath, JSON.stringify(cloned, null, 2), 'utf-8');
  } catch (err) {}
}

/**
 * Discard draft for a single section and revert it to published.
 */
export function discardSectionDraft(sectionKey: string): void {
  delete draftsInMemory[sectionKey];
  try {
    const draftPath = path.join(DRAFTS_DIR, `${sectionKey}.json`);
    if (fs.existsSync(draftPath)) {
      fs.unlinkSync(draftPath);
    }
    const tmpDraftPath = path.join(TMP_DRAFTS_DIR, `${sectionKey}.json`);
    if (fs.existsSync(tmpDraftPath)) {
      fs.unlinkSync(tmpDraftPath);
    }
  } catch (e) {}
}

/**
 * Publish a SINGLE section to live.
 * Only the specified section becomes published; all other sections' drafts remain untouched.
 */
export function publishSectionContent(sectionKey: string, specificData?: any): { success: boolean; section: string } {
  const dataToPublish = specificData !== undefined
    ? specificData
    : (draftsInMemory[sectionKey] || readDraftFile(sectionKey) || readContentFile(`${sectionKey}.json`));

  if (!dataToPublish) {
    return { success: false, section: sectionKey };
  }

  const written = writeContentFile(`${sectionKey}.json`, deepClone(dataToPublish));
  // Clean up draft file for this section
  delete draftsInMemory[sectionKey];
  try {
    const draftPath = path.join(DRAFTS_DIR, `${sectionKey}.json`);
    if (fs.existsSync(draftPath)) {
      fs.unlinkSync(draftPath);
    }
    const tmpDraftPath = path.join(TMP_DRAFTS_DIR, `${sectionKey}.json`);
    if (fs.existsSync(tmpDraftPath)) {
      fs.unlinkSync(tmpDraftPath);
    }
  } catch (e) {}

  return { success: written, section: sectionKey };
}

/**
 * Returns summary of all pending draft changes across the website.
 */
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
    if (fs.existsSync(TMP_DRAFTS_DIR)) {
      const files = fs.readdirSync(TMP_DRAFTS_DIR);
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

/**
 * Publish ALL saved draft changes across the entire CMS.
 * Unchanged pages remain completely untouched and intact.
 */
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
    if (fs.existsSync(TMP_DRAFTS_DIR)) {
      const files = fs.readdirSync(TMP_DRAFTS_DIR);
      files.forEach((f) => {
        if (f.endsWith('.json')) keys.add(f.replace('.json', ''));
      });
    }
  } catch (e) {}

  for (const key of Array.from(keys)) {
    const draftData = draftsInMemory[key] || readDraftFile(key);
    if (draftData) {
      const success = writeContentFile(`${key}.json`, deepClone(draftData));
      if (success) {
        published.push(key);
        // Clean up draft from memory and disk upon publishing
        delete draftsInMemory[key];
        try {
          const draftPath = path.join(DRAFTS_DIR, `${key}.json`);
          if (fs.existsSync(draftPath)) fs.unlinkSync(draftPath);
          const tmpDraftPath = path.join(TMP_DRAFTS_DIR, `${key}.json`);
          if (fs.existsSync(tmpDraftPath)) fs.unlinkSync(tmpDraftPath);
        } catch (e) {}
      }
    }
  }

  return {
    success: true,
    publishedSections: published,
  };
}

/**
 * Returns complete published state of the website.
 * Used exclusively by the Live Website.
 */
export function getPublishedSiteData(): Record<string, any> {
  const result: Record<string, any> = {};
  for (const sec of CMS_SECTIONS) {
    const val = readContentFile(`${sec}.json`);
    if (val) result[sec] = deepClone(val);
  }
  return result;
}

/**
 * Returns complete draft state of the website (drafts merged over published).
 * Used exclusively by the Admin CRM & Preview.
 */
export function getDraftSiteData(): Record<string, any> {
  const result: Record<string, any> = {};
  for (const sec of CMS_SECTIONS) {
    const val = getSectionContent(sec, true);
    if (val) result[sec] = deepClone(val);
  }
  return result;
}
