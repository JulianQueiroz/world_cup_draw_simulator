import { describe, test, expect } from 'vitest';
import { findGroupByTeamId, findTeamById } from './groups';
import type { Group } from '@/types/draw';

const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Grupo A',
    teams: [
      { id: 'br', name: 'Brasil', code: 'BRA', flag: '🇧🇷', confederation: 'CONMEBOL' },
      { id: 'ar', name: 'Argentina', code: 'ARG', flag: '🇦🇷', confederation: 'CONMEBOL' },
    ],
  },
  {
    id: 'group-2',
    name: 'Grupo B',
    teams: [
      { id: 'fr', name: 'França', code: 'FRA', flag: '🇫🇷', confederation: 'UEFA' },
    ],
  },
];

describe('findGroupByTeamId', () => {
  test('retorna o grupo correto dado um teamId', () => {
    const group = findGroupByTeamId(mockGroups, 'br');
    expect(group?.id).toBe('group-1');
  });

  test('retorna undefined se o time não existe', () => {
    const group = findGroupByTeamId(mockGroups, 'xx');
    expect(group).toBeUndefined();
  });
});

describe('findTeamById', () => {
  test('retorna o time correto dado um teamId', () => {
    const team = findTeamById(mockGroups, 'fr');
    expect(team?.name).toBe('França');
  });

  test('retorna null se o time não existe', () => {
    const team = findTeamById(mockGroups, 'xx');
    expect(team).toBeNull();
  });
});