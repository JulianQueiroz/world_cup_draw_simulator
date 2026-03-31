import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from  '../../../node_modules/@testing-library/react'
import Home from './page';
import { useStore } from '../../lib/store';

vi.mock('../../lib/store', () => ({ useStore: vi.fn() }));
vi.mock('../../components/SwitchTabs', () => ({ default: () => <div /> }));
vi.mock('../../components/Menu', () => ({ default: () => <div /> }));
vi.mock('../../components/Groups', () => ({ default: () => <div /> }));
vi.mock('../../components/TournamentBracket', () => ({ TournamentBracket: () => <div /> }));
vi.mock('./style', () => ({
  Main: ({ children }: any) => <div>{children}</div>,
  ContentWrapper: ({ children }: any) => <div>{children}</div>,
  GroupsLayout: ({ children }: any) => <div>{children}</div>,
}));
vi.mock('../../lib/knockout', () => ({ generateTournamentFromGroups: vi.fn(() => ({ rounds: [] })) }));

const mockGroups = [
  { id: 'group-1', name: 'Grupo A', teams: [{ id: 'BRA', name: 'Brasil', code: 'BRA', iso: 'BR', confederation: 'CONMEBOL' }] },
];

describe('Home — persistência', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('ao recarregar com dados no localStorage, setGroups é chamado', () => {
    localStorage.setItem('drawnGroups', JSON.stringify(mockGroups));
    const setGroups = vi.fn();

    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      groups: [], setGroups, tournament: null, setTournament: vi.fn(),
    });

    render(<Home />);
    expect(setGroups).toHaveBeenCalledWith(mockGroups);
  });

  test('sem dados no localStorage, setGroups não é chamado', () => {
    const setGroups = vi.fn();

    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      groups: [], setGroups, tournament: null, setTournament: vi.fn(),
    });

    render(<Home />);
    expect(setGroups).not.toHaveBeenCalled();
  });
});
