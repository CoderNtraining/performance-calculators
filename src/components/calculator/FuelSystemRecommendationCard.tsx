import { useState } from 'react';
import { FuelCalculationResult } from '@/types/calculator';
import { ResultCard } from './ResultCard';

export function FuelSystemRecommendationCard({ fuelResult }: { fuelResult: FuelCalculationResult }) {
  const [showMore, setShowMore] = useState(false);
  const fuelSystem = fuelResult.fuelSystemRecommendation;
  const estimatedHp = fuelResult.estimatedCrankHp;
  const isExactMatch = fuelSystem.maxHp >= estimatedHp;
  const ctaUrl = fuelSystem.affiliateUrl ?? fuelSystem.url;
  const ctaLabel = fuelSystem.affiliateUrl ? 'Shop Affiliate' : fuelSystem.url ? 'Shop' : 'Contact Sales';

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

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="text-xs text-slate-300 hover:text-white"
            aria-expanded={showMore}
          >
            {showMore ? 'Hide details' : 'View details'}
          </button>
          <span className="text-xs text-slate-400">{fuelSystem.maxHp >= estimatedHp ? 'Good headroom' : 'Consider next tier'}</span>
        </div>

        {showMore && (
          <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3 text-sm">
            <div>Max HP capacity: {fuelSystem.maxHp} HP</div>
            <div>Compatible Fuels: {fuelSystem.compatibleFuels.join(', ')}</div>
            <div>Note: {fuelSystem.note}</div>
          </div>
        )}

        <div className="pt-2 flex flex-wrap gap-2">
          {ctaUrl ? (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              {ctaLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => window.alert('Contact sales to get a custom quote.')}
              className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
            >
              Contact Sales
            </button>
          )}
          <button
            type="button"
            onClick={() => window.alert('Added to quote request (demo).')}
            className="rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-medium hover:bg-slate-700"
          >
            Add to quote
          </button>
        </div>

        <p className="text-sm text-slate-400 pt-2 border-t border-slate-700">{fuelSystem.note}</p>
      </div>
    </ResultCard>
  );
}
