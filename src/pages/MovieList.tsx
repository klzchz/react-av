import { useEffect, useState } from "react";
import type { Movie } from "../api/movie";
import { fetchMovies } from "../api/movie";

const PAGE_SIZE = 15;

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterYear, setFilterYear] = useState<string>("");
  const [filterWinner, setFilterWinner] = useState<string>("");

  const loadMovies = (page: number) => {
    const year = filterYear ? parseInt(filterYear, 10) : undefined;
    const winner = filterWinner === "" ? undefined : filterWinner === "true";

    fetchMovies({ page, size: PAGE_SIZE, year, winner }).then((res) => {
      setMovies(res.data.content);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.number);
    });
  };

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    loadMovies(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Filmes</h2>
      <div className="flex items-center gap-4 mb-4 p-4 bg-gray-800 rounded">
        <input
          type="number"
          placeholder="Filtrar por ano"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
        <select
          value={filterWinner}
          onChange={(e) => setFilterWinner(e.target.value)}
          className="p-2 rounded bg-gray-700"
        >
          <option value="">Vencedor? (Todos)</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
        <button onClick={handleSearch} className="p-2 bg-blue-600 rounded">
          Buscar
        </button>
      </div>
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Ano</th>
            <th className="px-4 py-2 text-left">Título</th>
            <th className="px-4 py-2 text-left">Vencedor?</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{movie.id}</td>
              <td className="px-4 py-2">{movie.year}</td>
              <td className="px-4 py-2">{movie.title}</td>
              <td className="px-4 py-2">{movie.winner ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <span>
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}