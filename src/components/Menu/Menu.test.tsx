import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../node_modules/@testing-library/react';
import Menu from './index';
import { useStore } from '../../lib/store';

vi.mock('../../lib/store', () => ({ useStore: vi.fn() }));
vi.mock('../../components/ui/card', () => ({ Card: ({ children }: any) => <div>{children}</div> }));
vi.mock('../../components/ui/button', () => ({ Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button> }));
vi.mock('../CompletedSelectionProgress', () => ({ default: () => <div /> }));
vi.mock('../Slider', () => ({ default: ({ title, onChange, max }: any) => <div data-testid={title} data-max={max} /> }));
vi.mock('../TeamSelection', () => ({ default: () => <div /> }));
vi.mock('../../data/team.json', () => ({
  default: {
    teams: Array.from({ length: 32 }, (_, i) => ({
      code: `T${i}`,
      name: `Time ${i}`,
      iso: 'BR',
      confederation: 'CONMEBOL',
    })),
  },
}));

describe('Menu', () => {
  let setGroups: ReturnType<typeof vi.fn>;
  let setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  let setTournament: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setGroups = vi.fn();
    setTournament = vi.fn();
    setActiveTab = vi.fn() as unknown as React.Dispatch<React.SetStateAction<string>>;
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

  test('slider de grupos respeita max baseado em 32 times', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    const slider = screen.getByTestId('Número de grupos');
    expect(Number(slider.getAttribute('data-max'))).toBeLessThanOrEqual(32);
  });

  test('slider de times por grupo respeita max baseado em 32 times', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    const slider = screen.getByTestId('Times por grupo');
    expect(Number(slider.getAttribute('data-max'))).toBeLessThanOrEqual(32);
  });

  test('selecionar todos preenche até o limite de maxTeams', () => {
    render(<Menu setActiveTab={setActiveTab} />);
    fireEvent.click(screen.getByText(/Selecionar todos/i));
    // com 2 grupos x 4 times = 8 times selecionados
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
});
