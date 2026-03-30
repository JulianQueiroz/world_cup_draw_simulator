import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import Home from './page';
import { useStore } from '@/lib/store';

vi.mock('@/lib/store', () => ({
  useStore: vi.fn(),
}));

const mockGroups = [
  {
    id: 'group-1',
    name: 'Grupo A',
    teams: [
      { id: 'br', name: 'Brasil', code: 'BRA', flag: '🇧🇷', confederation: 'CONMEBOL' },
    ],
  },
];

describe('Home — persistência', () => {
  beforeEach(() => {
    localStorage.clear();

    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      groups: [],
      setGroups: vi.fn(),
      tournament: null,
      setTournament: vi.fn(),
    });
  });

  test('ao recarregar com dados no localStorage, setGroups é chamado com os grupos salvos', () => {
    localStorage.setItem('drawnGroups', JSON.stringify(mockGroups));

    const setGroups = vi.fn();

    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      groups: [],
      setGroups,
      tournament: null,
      setTournament: vi.fn(),
    });

    render(<Home />);

    expect(setGroups).toHaveBeenCalledWith(mockGroups);
  });

  test('sem dados no localStorage, setGroups não é chamado', () => {
    const setGroups = vi.fn();

    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      groups: [],
      setGroups,
      tournament: null,
      setTournament: vi.fn(),
    });

    render(<Home />);

    expect(setGroups).not.toHaveBeenCalled();
  });
});
