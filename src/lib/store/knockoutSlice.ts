import type { StateCreator } from 'zustand';
import type { Bracket } from '@/types/knockout';

export type KnockoutSlice = {
  tournament: Bracket | null;
  setTournament: (tournament: Bracket | null) => void;
};

export const createKnockoutSlice: StateCreator<KnockoutSlice> = (set) => ({
  tournament: null,
  setTournament: (tournament) => set({ tournament }),
});