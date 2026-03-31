import type { Group } from '@/types/draw';

const GROUPS_KEY = 'drawnGroups';

export function saveDrawnGroups(groups: Group[]) {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
}

export function loadDrawnGroups(): Group[] {
  const raw = localStorage.getItem(GROUPS_KEY);
  return raw ? JSON.parse(raw) : [];
}
