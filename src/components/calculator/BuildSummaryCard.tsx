import { CalculationInput, CalculationResult } from '@/types/calculator';
import { calculateHeadroomStatus, formatHeadroomPercent, formatInjectorCc, formatTargetHp } from '@/lib/calculators/shared';
import { getHeadroomPercent, getStatusStyles } from '@/lib/recommendationDisplay';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

function getSummaryStatement({
  status,
  weakestKey,
  headroomPercent,
}: {
  status: ReturnType<typeof calculateHeadroomStatus>;
  weakestKey: 'turbo' | 'injector' | 'fuelSystem';
  headroomPercent: number;
}) {
  if (status === 'Excellent Fit') return 'Future-proof setup with extra headroom.';
  if (status === 'Good Fit') return 'Strong overall match for your current goal.';

  if (status === 'Near Limit') {
    if (weakestKey === 'fuelSystem') return 'Good fit overall, but your fuel system leaves limited growth margin.';
    if (weakestKey === 'injector') return 'Good fit overall, but injector headroom is tight for future growth.';
    return headroomPercent >= 0
      ? 'Good fit overall, but your turbo leaves limited growth margin.'
      : 'Your turbo selection falls short of the target you entered.';
  }

  if (weakestKey === 'fuelSystem') return 'Your fuel system is undersized for this goal and needs more support.';
  if (weakestKey === 'injector') return 'Your injector recommendation is undersized for a confident setup.';
  return 'Your turbo recommendation is undersized for this power target.';
}

interface BuildSummaryCardProps {
  input: CalculationInput;
  result: CalculationResult;
  onAddToQuote?: () => void;
  onTalkToExpert?: () => void;
}

export function BuildSummaryCard({ input, result, onAddToQuote, onTalkToExpert }: BuildSummaryCardProps) {
  const targetPower = `${formatTargetHp(input.horsepower)} ${input.horsepowerType === 'crank' ? 'Crank HP' : 'Wheel HP'}`;
  const fuelType = input.fuelType === 'pump_gas' ? 'Pump Gas' : 'E85';
  const components: Array<{
    key: 'turbo' | 'injector' | 'fuelSystem';
    label: string;
    value: string;
    headroom: number;
  }> = [];

  if (result.turbo?.recommendedTurbos.length && result.turbo.requiredAirflowLbMin > 0) {
    components.push({
      key: 'turbo',
      label: 'Best-Fit Turbo',
      value: result.turbo.recommendedTurbos[0].name,
      headroom: getHeadroomPercent(result.turbo.recommendedTurbos[0].airflowLbMin, result.turbo.requiredAirflowLbMin),
    });
  }

  if (result.fuel && result.fuel.requiredInjectorCcMin > 0) {
    components.push({
      key: 'injector',
      label: 'Best-Fit Injector',
      value: formatInjectorCc(result.fuel.injectorRecommendation.cc),
      headroom: getHeadroomPercent(result.fuel.injectorRecommendation.cc, result.fuel.requiredInjectorCcMin),
    });
    components.push({
      key: 'fuelSystem',
      label: 'Best-Fit Fuel System',
      value: result.fuel.fuelSystemRecommendation.name,
      headroom: getHeadroomPercent(result.fuel.fuelSystemRecommendation.maxHp, result.fuel.estimatedCrankHp),
    });
  }

  const weakestComponent = [...components].sort((a, b) => a.headroom - b.headroom)[0] ?? {
    key: 'turbo' as const,
    label: 'Best-Fit Product',
    value: 'Custom sizing review',
    headroom: 0,
  };
  const overallStatus = calculateHeadroomStatus(weakestComponent.headroom);
  const headroomPercent = weakestComponent.headroom;
  const bestFitLabel = weakestComponent.label;
  const bestFitValue = weakestComponent.value;

  const statusStyles = getStatusStyles(overallStatus);
  const statusBadgeVariant = overallStatus === 'Excellent Fit'
    ? 'fit-excellent'
    : overallStatus === 'Good Fit'
      ? 'fit-good'
      : overallStatus === 'Near Limit'
        ? 'fit-warning'
        : 'fit-danger';

  return (
    <Card variant="summary">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusBadgeVariant}>{overallStatus}</Badge>
          <Badge variant="info">Build Summary</Badge>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Best-fit direction for this build</h2>
          <p className={`text-sm leading-6 ${statusStyles.text}`}>
            {getSummaryStatement({ status: overallStatus, weakestKey: weakestComponent.key, headroomPercent })}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(11, 16, 32, 0.26)' }}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">Target Power</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{targetPower}</p>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(11, 16, 32, 0.26)' }}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">Fuel Type</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{fuelType}</p>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(11, 16, 32, 0.26)' }}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">Recommendation Status</p>
            <p className={`mt-2 text-lg font-semibold ${statusStyles.text}`}>{overallStatus}</p>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(11, 16, 32, 0.26)' }}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">Headroom</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{formatHeadroomPercent(headroomPercent)}</p>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(11, 16, 32, 0.26)' }}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">{bestFitLabel}</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{bestFitValue}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Button onClick={onAddToQuote} variant="primary" className="flex-1 py-3 font-semibold">
            Add to Quote
          </Button>
          <Button onClick={onTalkToExpert} variant="secondary" className="flex-1 py-3 font-semibold">
            Talk to an Expert
          </Button>
        </div>
      </div>
    </Card>
  );
}
