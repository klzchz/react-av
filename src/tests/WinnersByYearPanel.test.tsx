import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WinnersByYearPanel } from '../components/WinnersByYearPanel';
import { fetchMovieWinnersByYear } from '../api/movie';
import type { Movie } from '../api/movie';

jest.mock('../api/movie');

const mockedFetchMovieWinnersByYear = fetchMovieWinnersByYear as jest.Mock;

describe('WinnersByYearPanel', () => {
  it('should fetch and display movie winners when searching by year', async () => {
    const mockWinners: Movie[] = [
      { id: 1, year: 1986, title: 'Howard the Duck', studios: [], producers: [], winner: true },
      { id: 2, year: 1986, title: 'Under the Cherry Moon', studios: [], producers: [], winner: true },
    ];

    mockedFetchMovieWinnersByYear.mockResolvedValue({ data: mockWinners });

    render(<WinnersByYearPanel />);

    const yearInput = screen.getByPlaceholderText('Buscar por ano');
    const searchButton = screen.getByRole('button', { name: /Buscar/i });

    fireEvent.change(yearInput, { target: { value: '1986' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Howard the Duck')).toBeInTheDocument();
    });

    expect(screen.getByText('Under the Cherry Moon')).toBeInTheDocument();
    expect(mockedFetchMovieWinnersByYear).toHaveBeenCalledWith(1986);
  });
});
