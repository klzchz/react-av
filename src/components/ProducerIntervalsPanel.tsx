import { useEffect, useState } from "react";
import type { MaxMinIntervalResponse } from "../api/movie";
import { fetchMaxMinWinIntervalForProducers } from "../api/movie";

export function ProducerIntervalsPanel() {
  const [intervals, setIntervals] = useState<MaxMinIntervalResponse | null>(
    null,
  );
  useEffect(() => {
    fetchMaxMinWinIntervalForProducers().then((res) => setIntervals(res.data));
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        Intervalo de prêmios dos produtores
      </h3>
      <h4 className="font-bold mt-4 mb-1">Máximo</h4>
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Produtor</th>
            <th className="px-4 py-2 text-left">Intervalo</th>
          </tr>
        </thead>
        <tbody>
          {intervals?.max.map((p) => (
            <tr key={p.producer} className="border-t border-gray-700">
              <td className="px-4 py-2">{p.producer}</td>
              <td className="px-4 py-2">{p.interval}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="font-bold mt-6 mb-1">Mínimo</h4>
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Produtor</th>
            <th className="px-4 py-2 text-left">Intervalo</th>
          </tr>
        </thead>
        <tbody>
          {intervals?.min.map((p) => (
            <tr key={p.producer} className="border-t border-gray-700">
              <td className="px-4 py-2">{p.producer}</td>
              <td className="px-4 py-2">{p.interval}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}