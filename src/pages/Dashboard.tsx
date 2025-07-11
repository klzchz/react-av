import { ProducerIntervalsPanel } from "../components/ProducerIntervalsPanel";
import { TopStudiosPanel } from "../components/TopStudiosPanel";
import { WinnersByYearPanel } from "../components/WinnersByYearPanel";
import { YearsWithMultipleWinnersPanel } from "../components/YearsWithMultipleWinnersPanel";

export default function Dashboard() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <YearsWithMultipleWinnersPanel />
        <ProducerIntervalsPanel />
        <TopStudiosPanel />
        <WinnersByYearPanel />
      </div>
    </div>
  );
}