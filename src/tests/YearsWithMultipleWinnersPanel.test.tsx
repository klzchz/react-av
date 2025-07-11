import { render, screen, waitFor } from '@testing-library/react';
import { YearsWithMultipleWinnersPanel } from '../components/YearsWithMultipleWinnersPanel';
import { fetchYearsWithMultipleWinners } from '../api/movie';
import type { YearWithMultipleWinners } from '../api/movie';

jest.mock('../api/movie');

const mockedFetchYearsWithMultipleWinners = fetchYearsWithMultipleWinners as jest.Mock;

describe('YearsWithMultipleWinnersPanel', () => {
  it('should fetch and display years with multiple winners', async () => {
    const mockData: YearWithMultipleWinners[] = [
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 2 },
      { year: 2015, winnerCount: 2 },
    ];

    mockedFetchYearsWithMultipleWinners.mockResolvedValue({ data: { years: mockData } });

    render(<YearsWithMultipleWinnersPanel />);

    await waitFor(() => {
      expect(screen.getByText('1986')).toBeInTheDocument();
    });

    expect(screen.getByText('1990')).toBeInTheDocument();
    expect(screen.getByText('2015')).toBeInTheDocument();

    const winCounts = screen.getAllByText('2');
    expect(winCounts).toHaveLength(3);

    expect(mockedFetchYearsWithMultipleWinners).toHaveBeenCalledTimes(1);
  });
});
