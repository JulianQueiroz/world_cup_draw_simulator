import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import Home from '../page';
import { useStore } from '../../../lib/store';

vi.mock('../../../lib/store', () => ({ useStore: vi.fn() }));
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

const mockGroups = [{ id: 'group-1', name: 'Grupo A', teams: [{ id: 'BRA', name: 'Brasil', code: 'BRA', iso: 'BR', confederation: 'CONMEBOL' }] }];

describe('Home — hidratação', () => {
  let hydrate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    hydrate = vi.fn();
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      groups: [],
      tournament: null,
      hydrate,
    });
  });

  test('chama hydrate ao montar', () => {
    render(<Home />);
    expect(hydrate).toHaveBeenCalledOnce();
  });

  test('não chama hydrate mais de uma vez', () => {
    render(<Home />);
    expect(hydrate).toHaveBeenCalledTimes(1);
  });
});
