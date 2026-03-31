import type { StateCreator } from 'zustand';
import type { Bracket } from '@/types/knockout';
import type { Group } from '@/types/draw';
import { drawRepository } from '@/lib/repository/drawRepository';
import { generateTournamentFromGroups } from '@/lib/knockout';

export type KnockoutSlice = {
  tournament: Bracket | null;
  setTournament: (tournament: Bracket | null) => void;
  hydrate: () => void;
};

type WithGroups = KnockoutSlice & { groups: Group[] };

export const createKnockoutSlice: StateCreator<WithGroups, [], [], KnockoutSlice> = (set, get) => ({
  tournament: null,
  setTournament: (tournament) => {
    if (tournament) drawRepository.saveTournament(tournament);
    set({ tournament });
  },
  hydrate: () => {
    const groups = drawRepository.loadGroups();
    const saved = drawRepository.loadTournament();
    const tournament = saved ?? (groups.length > 0 ? generateTournamentFromGroups(groups, 2) : null);
    set({ groups, tournament } as any);
  },
});