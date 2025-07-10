import { useEffect, useState } from "react";
import type { StudioWin } from "../api/movie";
import { fetchStudiosWithWinCount } from "../api/movie";

export function TopStudiosPanel() {
  const [studios, setStudios] = useState<StudioWin[]>([]);
  useEffect(() => {
    fetchStudiosWithWinCount().then((res) => {
      const studiosData = res.data.studios || [];
      const topStudios = studiosData
        .sort((a, b) => b.winCount - a.winCount)
        .slice(0, 3);
      setStudios(topStudios);
    });
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Top 3 estúdios</h3>
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">Vitórias</th>
          </tr>
        </thead>
        <tbody>
          {studios.map((studio) => (
            <tr key={studio.name} className="border-t border-gray-700">
              <td className="px-4 py-2">{studio.name}</td>
              <td className="px-4 py-2">{studio.winCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}