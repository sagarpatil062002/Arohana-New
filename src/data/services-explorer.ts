export interface CapabilityGroupDef {
  title: string;
  indexes: number[];
}

export const DIGITAL_GROUPS: CapabilityGroupDef[] = [
  { title: 'Strategy & Positioning', indexes: [0, 1] },
  { title: 'Content & Communication', indexes: [2, 3, 4] },
  { title: 'Creative & Production', indexes: [5, 6, 7, 8, 9] },
  { title: 'Performance & Growth', indexes: [10, 11, 12, 13] },
  { title: 'Digital Experiences', indexes: [14] },
];

export const HOSPITALITY_GROUPS: CapabilityGroupDef[] = [
  { title: 'Concept & Culinary', indexes: [0, 1, 2] },
  { title: 'Operations & Systems', indexes: [3, 4, 5] },
  { title: 'People & Service', indexes: [6, 7] },
  { title: 'Commercial & Digital Growth', indexes: [8, 9, 10, 11] },
  { title: 'Launch & Handover', indexes: [12] },
];

export const PRODUCTION_GROUPS: CapabilityGroupDef[] = [
  { title: 'Film & Content Types', indexes: [0, 1, 2, 3, 4, 5] },
  { title: 'Development', indexes: [6, 7] },
  { title: 'Production', indexes: [8] },
  { title: 'Post-Production', indexes: [9, 10] },
];

export interface ResolvedGroup {
  id: string;
  num: string;
  title: string;
  items: { num: string; name: string }[];
}

export function resolveGroups(
  defs: CapabilityGroupDef[],
  items: string[],
  key: string
): ResolvedGroup[] {
  const resolved = defs.map((group, gi) => ({
    id: `${key}-g${gi}`,
    num: String(gi + 1).padStart(2, '0'),
    title: group.title,
    items: group.indexes.map((idx) => ({
      num: String(idx + 1).padStart(2, '0'),
      name: items[idx],
    })),
  }));

  if (process.env.NODE_ENV !== 'production') {
    const covered = defs.flatMap((group) => group.indexes).sort((a, b) => a - b);
    const expected = items.map((_, i) => i);
    if (JSON.stringify(covered) !== JSON.stringify(expected)) {
      console.error(
        `[services] "${key}" group indexes do not cover all deliverables (${items.length}).`
      );
    }
  }

  return resolved;
}