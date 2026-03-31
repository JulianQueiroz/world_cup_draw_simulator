import type { Group, Team } from '../types/draw';

export function validateDrawSelection(selectedTeams: Team[], maxTeams: number): string | null {
  if (selectedTeams.length === 0) return 'Selecione ao menos uma seleção antes de sortear.';
  if (selectedTeams.length !== maxTeams) return `Selecione exatamente ${maxTeams} seleções para sortear.`;
  return null;
}

export function validateDuplicateTeams(teams: Team[]): string | null {
  const ids = teams.map((t) => t.id);
  const unique = new Set(ids);
  if (unique.size !== ids.length) return 'Há seleções duplicadas.';
  return null;
}

export function validateGroupCompletion(groups: Group[], expectedTotal: number): string | null {
  const total = groups.reduce((acc, g) => acc + g.teams.length, 0);
  if (total !== expectedTotal) return `Os grupos precisam ter exatamente ${expectedTotal} seleções no total para avançar.`;
  return null;
}

export function validateMinimumTeams(selectedTeams: Team[], min: number): string | null {
  if (selectedTeams.length < min) return `Selecione ao menos ${min} seleção.`;
  return null;
}