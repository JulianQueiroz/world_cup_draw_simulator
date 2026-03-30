export type Team = {
  id: string;
  name: string;
  code: string;
  flag: string;
  confederation: string;
};

export type Group = {
  id: string;
  name: string;
  teams: Team[];
};

export type Status = 'pending' | 'in-progress' | 'completed';