import { CalculationInput, CalculationResult } from '@/types/calculator';
import { calculateHeadroomStatus, formatHeadroomPercent, formatInjectorCc, formatTargetHp } from '@/lib/calculators/shared';
import { getHeadroomPercent, getStatusStyles, getSummaryConfidence } from '@/lib/recommendationDisplay';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface BuildSummaryCardProps {
  input: CalculationInput;
  result: CalculationResult;
  onAddToQuote?: () => void;
  onTalkToExpert?: () => void;
}

export function BuildSummaryCard({ input, result, onAddToQuote, onTalkToExpert }: BuildSummaryCardProps) {
  const targetPower = `${formatTargetHp(input.horsepower)} ${input.horsepowerType === 'crank' ? 'Crank HP' : 'Wheel HP'}`;
  const fuelType = input.fuelType === 'pump_gas' ? 'Pump Gas' : 'E85';
  const activeMode = input.selectedModes[0];

  let overallStatus = calculateHeadroomStatus(0);
  let headroomPercent = 0;
  let bestFitLabel = 'Best-Fit Product';
  let bestFitValue = 'Custom sizing review';

  if (result.turbo?.recommendedTurbos.length && result.turbo.requiredAirflowLbMin > 0) {
    const turbo = result.turbo.recommendedTurbos[0];
    const headroom = getHeadroomPercent(turbo.airflowLbMin, result.turbo.requiredAirflowLbMin);
    headroomPercent = headroom;
    overallStatus = calculateHeadroomStatus(headroom);
    bestFitLabel = 'Best-Fit Turbo';
    bestFitValue = turbo.name;
  } else if (result.fuel && result.fuel.requiredInjectorCcMin > 0) {
    const injector = result.fuel.injectorRecommendation;
    const headroom = getHeadroomPercent(injector.cc, result.fuel.requiredInjectorCcMin);
    headroomPercent = headroom;
    overallStatus = calculateHeadroomStatus(headroom);
    bestFitLabel = activeMode === 'fuel' ? 'Best-Fit Injector' : 'Best-Fit Product';
    bestFitValue = formatInjectorCc(injector.cc);
  }

  const statusStyles = getStatusStyles(overallStatus);

  return (
    <Card
      className="border-2 shadow-2xl shadow-slate-950/45"
      style={{
        borderColor: 'rgba(34, 211, 238, 0.32)',
        backgroundColor: '#07111d',
        backgroundImage: 'linear-gradient(135deg, rgba(8, 145, 178, 0.28), rgba(15, 23, 42, 0.88) 38%, rgba(15, 23, 42, 1) 100%)',
      }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">Build Summary</p>
          <h2 className="text-2xl font-bold text-white">Best-fit direction for this build</h2>
          <p className={`text-sm ${statusStyles.text}`}>{getSummaryConfidence(overallStatus)}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Target Power</p>
            <p className="mt-2 text-lg font-semibold text-white">{targetPower}</p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Fuel Type</p>
            <p className="mt-2 text-lg font-semibold text-white">{fuelType}</p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Recommendation Status</p>
            <p className={`mt-2 text-lg font-semibold ${statusStyles.text}`}>{overallStatus}</p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Headroom</p>
            <p className="mt-2 text-lg font-semibold text-white">{formatHeadroomPercent(headroomPercent)}</p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{bestFitLabel}</p>
            <p className="mt-2 text-lg font-semibold text-white">{bestFitValue}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row">
          <Button
            onClick={onAddToQuote}
            className="flex-1 border-transparent bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Add to Quote
          </Button>
          <Button
            onClick={onTalkToExpert}
            className="flex-1 border-slate-600 bg-slate-900/70 py-3 font-semibold text-slate-100 hover:bg-slate-800"
          >
            Talk to an Expert
          </Button>
        </div>
      </div>
    </Card>
  );
}
