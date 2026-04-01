export type Team = {
  id: string;
  name: string;
  code: string;
  iso: string;
  confederation: string;
};

export type Group = {
  id: string;
  name: string;
  teams: Team[];
};

export type Status = 'pending' | 'in-progress' | 'completed';

export type DrawMenuState = {
  totalGroups: number;
  teamsPerGroup: number;
  maxTeams: number;
  selectedTeams: Team[];
};