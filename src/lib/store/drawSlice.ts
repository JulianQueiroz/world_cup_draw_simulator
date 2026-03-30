import type { StateCreator } from 'zustand';
import type { Group, Team } from '@/types/draw';

export type DrawSlice = {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
};

export const createDrawSlice: StateCreator<DrawSlice> = (set) => ({
  groups: [],
  setGroups: (groups) => set({ groups }),
});