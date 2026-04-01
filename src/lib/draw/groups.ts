import { Group, Team } from '@/types/draw';

export function findGroupByTeamId(groups: Group[], teamId: string) {
  return groups.find((group) => group.teams.some((team) => team.id === teamId));
}

export function findTeamById(groups: Group[], teamId: string) {
  for (const group of groups) {
    const team = group.teams.find((team) => team.id === teamId);
    if (team) return team;
  }
  return null;
}

export function buildGroups(teams: Team[], totalGroups: number, teamsPerGroup: number): Group[] {
  return Array.from({ length: totalGroups }, (_, i) => ({
    id: `group-${i + 1}`,
    name: `Grupo ${String.fromCharCode(65 + i)}`,
    teams: teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup),
  }));
}
