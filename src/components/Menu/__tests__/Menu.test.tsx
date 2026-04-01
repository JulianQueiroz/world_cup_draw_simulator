import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '../index';
import { useStore } from '../../../lib/store';

vi.mock('../../../lib/store', () => ({ useStore: vi.fn() }));
vi.mock('../../ui/card', () => ({ Card: ({ children }: any) => <div>{children}</div> }));
vi.mock('../../ui/button', () => ({ Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button> }));
vi.mock('../CompletedSelectionProgress', () => ({ default: () => <div /> }));
vi.mock('../Slider', () => ({
  default: ({ title, max }: any) => <div data-testid={title} data-max={max} />,
}));
vi.mock('../RadioGroup', () => ({
  default: ({ title, onChange, options }: any) => (
    <div data-testid={title}>
      {options.map((opt: number) => (
        <button key={opt} onClick={() => onChange(opt)}>
          {opt}
        </button>
      ))}
    </div>
  ),
}));
vi.mock('../TeamSelection', () => ({ default: () => <div /> }));
vi.mock('../../../data/team.json', () => ({
  default: {
    teams: Array.from({ length: 32 }, (_, i) => ({
      code: `T${i}`,
      name: `Time ${i}`,
      iso: 'BR',
      confederation: 'CONMEBOL',
    })),
  },
}));
vi.mock('../../../lib/repository/drawRepository', () => ({
  drawRepository: {
    loadSettings: vi.fn(() => null),
    saveSettings: vi.fn(),
    saveGroups: vi.fn(),
    saveTournament: vi.fn(),
  },
}));
vi.mock('../../../lib/knockout/knockout', () => ({
  generateTournamentFromGroups: vi.fn(() => ({ rounds: [] })),
}));
vi.mock('../../../lib/draw/groups', () => ({
  buildGroups: vi.fn((teams, totalGroups, teamsPerGroup) =>
    Array.from({ length: totalGroups }, (_, i) => ({
      id: `group-${i + 1}`,
      name: `Grupo ${String.fromCharCode(65 + i)}`,
      teams: teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup),
    }))
  ),
}));

describe('Menu', () => {
  let setGroups: ReturnType<typeof vi.fn>;
  let setActiveTab: (tab: string) => void;
  let setTournament: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setGroups = vi.fn();
    setTournament = vi.fn();
    setActiveTab = vi.fn();
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setGroups,
      setTournament,
      groups: [],
    });
  });

  test('não sorteia se não há seleções', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    fireEvent.click(screen.getByText('Sortear grupos'));
    expect(setGroups).not.toHaveBeenCalled();
    expect(screen.getByText(/Selecione ao menos/i)).toBeInTheDocument();
  });

  test('slider de times por grupo respeita max baseado em 32 times', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    const slider = screen.getByTestId('Times por grupo');
    expect(Number(slider.getAttribute('data-max'))).toBeLessThanOrEqual(32);
  });

  test('selecionar todos preenche até o limite de maxTeams', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    expect(screen.getByText(/Selecionar todos \(8\)/i)).toBeInTheDocument();
  });

  test('avançar para mata-mata sem grupos emite erro', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    fireEvent.click(screen.getByText('Avançar para Mata-Mata'));
    expect(setActiveTab).not.toHaveBeenCalled();
    expect(screen.getByText(/precisam ter exatamente/i)).toBeInTheDocument();
  });

  test('avançar para mata-mata com grupos corretos muda de aba', () => {
    const totalGroups = 2;
    const totalTeamsPerGroup = 4;
    const teams = Array.from({ length: 8 }, (_, i) => ({
      id: `T${i}`,
      name: `Time ${i}`,
      code: `T${i}`,
      iso: 'BR',
      confederation: 'CONMEBOL',
    }));
    const groups = Array.from({ length: totalGroups }, (_, i) => ({
      id: `group-${i + 1}`,
      name: `Grupo ${String.fromCharCode(65 + i)}`,
      teams: teams.slice(i * totalTeamsPerGroup, (i + 1) * totalTeamsPerGroup),
    }));

    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ setGroups, groups, setTournament });

    render(<Menu setActiveTab={setActiveTab} />);
    fireEvent.click(screen.getByText('Avançar para Mata-Mata'));
    expect(setActiveTab).toHaveBeenCalledWith('knockout');
  });

  test('drag entre grupos seguido de avançar emite erro de tamanho desigual', () => {
    const groups = [
      {
        id: 'group-1',
        name: 'Grupo A',
        teams: Array.from({ length: 5 }, (_, i) => ({
          id: `A${i}`,
          name: `Time A${i}`,
          code: `A${i}`,
          iso: 'BR',
          confederation: 'CONMEBOL',
        })),
      },
      {
        id: 'group-2',
        name: 'Grupo B',
        teams: Array.from({ length: 2 }, (_, i) => ({
          id: `B${i}`,
          name: `Time B${i}`,
          code: `B${i}`,
          iso: 'BR',
          confederation: 'CONMEBOL',
        })),
      },
    ];

    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ setGroups, setTournament, groups });

    render(<Menu setActiveTab={setActiveTab} />);
    fireEvent.click(screen.getByText('Avançar para Mata-Mata'));
    expect(setActiveTab).not.toHaveBeenCalled();
    expect(screen.getByText(/precisam ter exatamente/i)).toBeInTheDocument();
  });

  test('re-sortear chama setGroups e setTournament', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    fireEvent.click(screen.getByText(/Selecionar todos/i));
    fireEvent.click(screen.getByText('Re-sortear'));
    expect(setGroups).toHaveBeenCalled();
    expect(setTournament).toHaveBeenCalled();
  });

  test('selecionar opção no radio de grupos atualiza maxTeams', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    fireEvent.click(screen.getByText('4'));
    expect(screen.getByText(/Selecionar todos \(16\)/i)).toBeInTheDocument();
  });
});
