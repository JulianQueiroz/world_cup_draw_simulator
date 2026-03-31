import type { StateCreator } from 'zustand';
import type { Group } from '@/types/draw';
import { drawRepository } from '@/lib/repository/drawRepository';

export type DrawSlice = {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
};

export const createDrawSlice: StateCreator<DrawSlice> = (set) => ({
  groups: [],
  setGroups: (groups) => {
    drawRepository.saveGroups(groups);
    set({ groups });
  },
});