import { FuelCalculationResult } from '@/types/calculator';
import { formatNumber } from '@/lib/formatters';
import { ResultCard } from './ResultCard';

export function InjectorRecommendationCard({ fuelResult }: { fuelResult: FuelCalculationResult }) {
  const injector = fuelResult.injectorRecommendation;
  const requiredFlow = fuelResult.requiredInjectorCcMin;
  const isExactMatch = injector.cc >= requiredFlow;

  return (
    <ResultCard title="Injector Recommendation" accent="green">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-emerald-300">{injector.brand} - {injector.name}</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div>
            <span className="text-slate-400">Flow Rate:</span>
            <div className="font-semibold text-emerald-200">{formatNumber(injector.cc)} cc/min</div>
            <div className="text-xs text-slate-400">({formatNumber(injector.lbHr)} lb/hr max)</div>
          </div>
        </div>

        <div>
          <span className="text-slate-400 text-sm">Compatible Fuels:</span>
          <div className="text-sm text-slate-200 mt-1 capitalize">{injector.fuels.join(', ')}</div>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="text-xs text-emerald-300 font-medium">
            {isExactMatch
              ? `✓ Selected because required injector size is ${formatNumber(requiredFlow)} cc/min and this injector provides ${formatNumber(injector.cc)} cc/min`
              : `⚠ Largest available injector - required: ${formatNumber(requiredFlow)} cc/min, this injector: ${formatNumber(injector.cc)} cc/min`
            }
          </div>
        </div>

        <p className="text-sm text-slate-400 pt-2 border-t border-slate-700">{injector.note}</p>
      </div>
    </ResultCard>
  );
}
