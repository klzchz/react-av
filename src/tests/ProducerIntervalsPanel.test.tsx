import { render, screen, waitFor } from "@testing-library/react";
import { ProducerIntervalsPanel } from "../components/ProducerIntervalsPanel";
import * as movieApi from "../api/movie";
import type { MaxMinIntervalResponse } from "../api/movie";

// Mock the API module
jest.mock("../api/movie");

const mockMovieApi = movieApi as jest.Mocked<typeof movieApi>;

describe("ProducerIntervalsPanel", () => {
  it("should render loading state initially", async () => {
    // Create a delayed promise to test loading state
    const delayedPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { max: [], min: [] },
        });
      }, 100);
    });

    mockMovieApi.fetchMaxMinWinIntervalForProducers.mockReturnValueOnce(delayedPromise as any);
    
    render(<ProducerIntervalsPanel />);
    
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    
    // Wait for the component to update
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("should render producer intervals after fetching", async () => {
    const mockIntervals: MaxMinIntervalResponse = {
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
    };

    mockMovieApi.fetchMaxMinWinIntervalForProducers.mockResolvedValueOnce({
      data: mockIntervals,
    } as any);

    render(<ProducerIntervalsPanel />);

    await waitFor(() => {
      // Check for Max table
      expect(screen.getByText("Máximo")).toBeInTheDocument();
      expect(screen.getByText("Matthew Vaughn")).toBeInTheDocument();
      expect(screen.getByText("13")).toBeInTheDocument();

      // Check for Min table
      expect(screen.getByText("Mínimo")).toBeInTheDocument();
      expect(screen.getByText("Joel Silver")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });

  it("should handle empty data", async () => {
    const mockIntervals: MaxMinIntervalResponse = {
      max: [],
      min: [],
    };

    mockMovieApi.fetchMaxMinWinIntervalForProducers.mockResolvedValueOnce({
      data: mockIntervals,
    } as any);

    render(<ProducerIntervalsPanel />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.getByText("Máximo")).toBeInTheDocument();
      expect(screen.getByText("Mínimo")).toBeInTheDocument();
    });
  });
});
