import { useState } from "react";
import type { Movie } from "../api/movie";
import { fetchMovieWinnersByYear } from "../api/movie";

export function WinnersByYearPanel() {
  const [year, setYear] = useState<string>("");
  const [winners, setWinners] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!year) return;
    setLoading(true);
    try {
      const response = await fetchMovieWinnersByYear(parseInt(year));
      setWinners(response.data);
      console.log(response.data)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Vencedores por ano</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Buscar por ano"
          className="p-2 rounded bg-gray-700 text-white flex-grow"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="p-2 bg-blue-600 rounded text-white"
        >
          Buscar
        </button>
      </div>
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Título</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(winners) && winners.map((movie) => (
            <tr key={movie.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{movie.id}</td>
              <td className="px-4 py-2">{movie.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}