import { describe, test, expect } from 'vitest';
import {
  validateDrawSelection,
  validateDuplicateTeams,
  validateGroupCompletion,
  validateMinimumTeams,
} from './validations';
import type { Team, Group } from '../types/draw';

const makeTeam = (id: string): Team => ({
  id, name: `Time ${id}`, code: id, iso: 'BR', confederation: 'CONMEBOL',
});

const makeGroup = (id: string, teams: Team[]): Group => ({
  id, name: `Grupo ${id}`, teams,
});

describe('validateDrawSelection', () => {
  test('retorna erro se não há seleções', () => {
    expect(validateDrawSelection([], 8)).toMatch(/ao menos/i);
  });

  test('retorna erro se quantidade é diferente do máximo', () => {
    expect(validateDrawSelection([makeTeam('A'), makeTeam('B')], 8)).toMatch(/exatamente 8/i);
  });

  test('retorna null se quantidade está correta', () => {
    const teams = Array.from({ length: 8 }, (_, i) => makeTeam(`T${i}`));
    expect(validateDrawSelection(teams, 8)).toBeNull();
  });
});

describe('validateDuplicateTeams', () => {
  test('retorna erro se há times duplicados', () => {
    const teams = [makeTeam('BRA'), makeTeam('BRA')];
    expect(validateDuplicateTeams(teams)).toMatch(/duplicadas/i);
  });

  test('retorna null se não há duplicatas', () => {
    const teams = [makeTeam('BRA'), makeTeam('ARG')];
    expect(validateDuplicateTeams(teams)).toBeNull();
  });
});

describe('validateGroupCompletion', () => {
  test('retorna erro se total de times nos grupos é diferente do esperado', () => {
    const groups = [
      makeGroup('group-1', [makeTeam('BRA'), makeTeam('ARG')]),
      makeGroup('group-2', [makeTeam('FRA')]),
    ];
    expect(validateGroupCompletion(groups, 4)).toMatch(/exatamente 4/i);
  });

  test('retorna null se total está correto', () => {
    const groups = [
      makeGroup('group-1', [makeTeam('BRA'), makeTeam('ARG')]),
      makeGroup('group-2', [makeTeam('FRA'), makeTeam('ESP')]),
    ];
    expect(validateGroupCompletion(groups, 4)).toBeNull();
  });
});

describe('validateMinimumTeams', () => {
  test('retorna erro se abaixo do mínimo', () => {
    expect(validateMinimumTeams([makeTeam('BRA')], 2)).toMatch(/ao menos 2/i);
  });

  test('retorna null se atinge o mínimo', () => {
    expect(validateMinimumTeams([makeTeam('BRA'), makeTeam('ARG')], 2)).toBeNull();
  });
});

describe('validateEqualGroupSizes', () => {
  test('retorna erro se um grupo tem times a mais após drag')
  test('retorna erro se um grupo tem times a menos após drag')
  test('retorna null se todos os grupos têm o mesmo tamanho')
})