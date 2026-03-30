import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from './index';
import { useStore } from '@/lib/store';

vi.mock('@/lib/store', () => ({
  useStore: vi.fn(),
}));

describe('Menu — sorteio', () => {
  test('ao clicar em sortear, setGroups é chamado com os grupos preenchidos', () => {
    const setGroups = vi.fn();
    const setActiveTab = vi.fn();

    const mockedUseStore = vi.mocked(useStore);
    mockedUseStore.mockReturnValue({ setGroups } as any);

    render(<Menu setActiveTab={setActiveTab} />);

    const button = screen.getByText('Sortear grupos');
    fireEvent.click(button);

    expect(setGroups).toHaveBeenCalledOnce();

    const groups = setGroups.mock.calls[0][0];
    expect(groups.length).toBeGreaterThan(0);
  });
});