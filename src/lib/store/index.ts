import { create } from 'zustand';
import { createDrawSlice, type DrawSlice } from './drawSlice';
import { createKnockoutSlice, type KnockoutSlice } from './knockoutSlice';

type Store = DrawSlice & KnockoutSlice;

export const useStore = create<Store>((...args) => ({
  ...createDrawSlice(...args),
  ...createKnockoutSlice(...args),
}));