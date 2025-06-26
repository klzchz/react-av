import { useEffect, useState } from "react";
import type { YearWithMultipleWinners } from "../api/movie";
import { fetchYearsWithMultipleWinners } from "../api/movie";

export function YearsWithMultipleWinnersPanel() {
  const [years, setYears] = useState<YearWithMultipleWinners[]>([]);
  useEffect(() => {
    fetchYearsWithMultipleWinners().then((res) => setYears(res.data.years));
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        Anos com múltiplos vencedores
      </h3>
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Ano</th>
            <th className="px-4 py-2 text-left">Vitórias</th>
          </tr>
        </thead>
        <tbody>
          {years.map((item) => (
            <tr key={item.year} className="border-t border-gray-700">
              <td className="px-4 py-2">{item.year}</td>
              <td className="px-4 py-2">{item.winnerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}