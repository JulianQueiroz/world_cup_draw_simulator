type Team = {
  id: string;
  name: string;
  code: string;
  flag: string;
  confederation: string;
};

type Group = {
  id: string;
  name: string;
  teams: Team[];
};