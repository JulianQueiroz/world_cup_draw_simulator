import { Group } from '@/types/draw';

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
