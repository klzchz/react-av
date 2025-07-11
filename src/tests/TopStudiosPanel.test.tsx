import { render, screen, waitFor } from "@testing-library/react";
import { TopStudiosPanel } from "../components/TopStudiosPanel";
import * as movieApi from "../api/movie";


// Mock the API module
jest.mock("../api/movie");

const mockMovieApi = movieApi as jest.Mocked<typeof movieApi>;

describe("TopStudiosPanel", () => {
  it("should render top 3 studios after fetching", async () => {
    const mockStudios = {
      studios: [
        { name: "Columbia Pictures", winCount: 7 },
        { name: "Paramount Pictures", winCount: 6 },
        { name: "Warner Bros.", winCount: 5 },
        { name: "Universal Pictures", winCount: 4 },
        { name: "20th Century Fox", winCount: 3 },
      ],
    };

    mockMovieApi.fetchStudiosWithWinCount.mockResolvedValueOnce({
      data: mockStudios,
    } as any);

    render(<TopStudiosPanel />);

    await waitFor(() => {
      expect(screen.getByText("Top 3 estúdios")).toBeInTheDocument();
      expect(screen.getByText("Columbia Pictures")).toBeInTheDocument();
      expect(screen.getByText("7")).toBeInTheDocument();
      expect(screen.getByText("Paramount Pictures")).toBeInTheDocument();
      expect(screen.getByText("6")).toBeInTheDocument();
      expect(screen.getByText("Warner Bros.")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      
      // Verify that only top 3 are shown (Universal and 20th Century Fox should not be visible)
      expect(screen.queryByText("Universal Pictures")).not.toBeInTheDocument();
      expect(screen.queryByText("20th Century Fox")).not.toBeInTheDocument();
    });
  });

  it("should handle empty data", async () => {
    const mockStudios = {
      studios: [],
    };

    mockMovieApi.fetchStudiosWithWinCount.mockResolvedValueOnce({
      data: mockStudios,
    } as any);

    render(<TopStudiosPanel />);

    await waitFor(() => {
      expect(screen.getByText("Top 3 estúdios")).toBeInTheDocument();
      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByText("Vitórias")).toBeInTheDocument();
    });
  });

  it("should sort studios by win count in descending order", async () => {
    const mockStudios = {
      studios: [
        { name: "Warner Bros.", winCount: 5 },
        { name: "Columbia Pictures", winCount: 7 },
        { name: "Paramount Pictures", winCount: 6 },
      ],
    };

    mockMovieApi.fetchStudiosWithWinCount.mockResolvedValueOnce({
      data: mockStudios,
    } as any);

    render(<TopStudiosPanel />);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      // Skip header row (index 0)
      expect(rows[1]).toHaveTextContent("Columbia Pictures");
      expect(rows[1]).toHaveTextContent("7");
      expect(rows[2]).toHaveTextContent("Paramount Pictures");
      expect(rows[2]).toHaveTextContent("6");
      expect(rows[3]).toHaveTextContent("Warner Bros.");
      expect(rows[3]).toHaveTextContent("5");
    });
  });
});
