import type { Status } from './draw';

export type KnockoutTeam = {
  id: string | null;
  name: string;
  seed?: number | null;
  iso?: string;
};

export type Match = {
  id: string;
  matchNumber: number;
  status: Status;
  team1: KnockoutTeam;
  team2: KnockoutTeam;
  winner: string | null;
  nextMatchId?: string;
  nextMatchSlot?: 'team1' | 'team2';
};

export type Round = {
  id: string;
  name: string;
  number: number;
  matches: Match[];
};

export type Tournament = {
  id: string;
  name: string;
  description: string;
  status: Status;
  rounds: Round[];
};