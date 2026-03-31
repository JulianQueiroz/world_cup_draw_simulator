import { Bracket } from '@/types/knockout';
import type { DrawMenuState, Group } from '../../types/draw';

export const drawRepository = {
  saveGroups: (groups: Group[]) =>
    localStorage.setItem('drawnGroups', JSON.stringify(groups)),

  loadGroups: (): Group[] => {
    const raw = localStorage.getItem('drawnGroups');
    return raw ? JSON.parse(raw) : [];
  },

  saveSettings: (settings: DrawMenuState) =>
    localStorage.setItem('drawSettings', JSON.stringify(settings)),

  loadSettings: (): DrawMenuState | null => {
    const raw = localStorage.getItem('drawSettings');
    return raw ? JSON.parse(raw) : null;
  },
  saveTournament: (tournament: Bracket) =>
    localStorage.setItem('drawnTournament', JSON.stringify(tournament)),

  loadTournament: (): Bracket | null => {
    const raw = localStorage.getItem('drawnTournament');
    return raw ? JSON.parse(raw) : null;
  },
  clear: () => {
    localStorage.removeItem('drawnGroups');
    localStorage.removeItem('drawSettings');
    localStorage.removeItem('drawnTournament');
  },
};
