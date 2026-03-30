import type { StateCreator } from 'zustand';
import type { Tournament } from '@/types/knockout';

export type KnockoutSlice = {
  tournament: Tournament | null;
  setTournament: (tournament: Tournament | null) => void;
};

export const createKnockoutSlice: StateCreator<KnockoutSlice> = (set) => ({
  tournament: null,
  setTournament: (tournament) => set({ tournament }),
});