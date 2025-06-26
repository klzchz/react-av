import { ProducerIntervalsPanel } from "../components/ProducerIntervalsPanel";
import { TopStudiosPanel } from "../components/TopStudiosPanel";
import { WinnersByYearPanel } from "../components/WinnersByYearPanel";
import { YearsWithMultipleWinnersPanel } from "../components/YearsWithMultipleWinnersPanel";

export default function Dashboard() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <YearsWithMultipleWinnersPanel />
          <ProducerIntervalsPanel />
        </div>
        <div className="flex flex-col gap-6">
          <TopStudiosPanel />
          <WinnersByYearPanel />
        </div>
      </div>
    </div>
  );
}