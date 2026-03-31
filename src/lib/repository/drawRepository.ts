import type { Group } from '../../types/draw';
import type { DrawSettings } from '../../types/draw';

export const drawRepository = {
  saveGroups: (groups: Group[]) =>
    localStorage.setItem('drawnGroups', JSON.stringify(groups)),

  loadGroups: (): Group[] => {
    const raw = localStorage.getItem('drawnGroups');
    return raw ? JSON.parse(raw) : [];
  },

  saveSettings: (settings: DrawSettings) =>
    localStorage.setItem('drawSettings', JSON.stringify(settings)),

  loadSettings: (): DrawSettings | null => {
    const raw = localStorage.getItem('drawSettings');
    return raw ? JSON.parse(raw) : null;
  },

  clear: () => {
    localStorage.removeItem('drawnGroups');
    localStorage.removeItem('drawSettings');
  },
};