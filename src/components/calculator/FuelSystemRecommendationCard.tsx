import { FuelCalculationResult } from '@/types/calculator';
import { ResultCard } from './ResultCard';

export function FuelSystemRecommendationCard({ fuelResult }: { fuelResult: FuelCalculationResult }) {
  const fuelSystem = fuelResult.fuelSystemRecommendation;
  const estimatedHp = fuelResult.estimatedCrankHp;
  const isExactMatch = fuelSystem.maxHp >= estimatedHp;

  return (
    <ResultCard title="Fuel System Recommendation" accent="green">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-emerald-300">{fuelSystem.brand} - {fuelSystem.name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-slate-400">Max HP:</span>
            <div className="font-semibold text-emerald-200">{fuelSystem.maxHp} hp</div>
          </div>
          <div>
            <span className="text-slate-400">Compatible Fuels:</span>
            <div className="text-sm text-slate-200 mt-1 capitalize">{fuelSystem.compatibleFuels.join(', ')}</div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="text-xs text-emerald-300 font-medium">
            {isExactMatch
              ? `✓ Selected because estimated crank HP is ${estimatedHp} and this fuel system supports up to ${fuelSystem.maxHp} HP`
              : `⚠ Selected as best available option - estimated HP: ${estimatedHp}, system max: ${fuelSystem.maxHp} HP`
            }
          </div>
        </div>

        <p className="text-sm text-slate-400 pt-2 border-t border-slate-700">{fuelSystem.note}</p>
      </div>
    </ResultCard>
  );
}
