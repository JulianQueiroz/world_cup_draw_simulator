import { Group } from '@/types/draw';
import { describe, test, expect } from 'vitest';
import { findGroupByTeamId, findTeamById } from '../draw/groups';

const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Grupo A',
    teams: [
      { id: 'BRA', name: 'Brasil', code: 'BRA', iso: 'BR', confederation: 'CONMEBOL' },
      { id: 'ARG', name: 'Argentina', code: 'ARG', iso: 'AR', confederation: 'CONMEBOL' },
    ],
  },
  {
    id: 'group-2',
    name: 'Grupo B',
    teams: [
      { id: 'FRA', name: 'França', code: 'FRA', iso: 'FR', confederation: 'UEFA' },
    ],
  },
];

describe('findGroupByTeamId', () => {
  test('retorna o grupo correto dado um teamId', () => {
    expect(findGroupByTeamId(mockGroups, 'BRA')?.id).toBe('group-1');
  });

  test('retorna undefined se o time não existe', () => {
    expect(findGroupByTeamId(mockGroups, 'XXX')).toBeUndefined();
  });
});

describe('findTeamById', () => {
  test('retorna o time correto dado um teamId', () => {
    expect(findTeamById(mockGroups, 'FRA')?.name).toBe('França');
  });

  test('retorna null se o time não existe', () => {
    expect(findTeamById(mockGroups, 'XXX')).toBeNull();
  });
});

describe('buildGroups', () => {
  test('gera a quantidade correta de grupos')
  test('distribui os times corretamente entre os grupos')
  test('nomeia os grupos como Grupo A, Grupo B...')
  test('último grupo recebe os times restantes corretamente')
})