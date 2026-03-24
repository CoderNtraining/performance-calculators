import { useState } from 'react';
import { FuelCalculationResult } from '@/types/calculator';
import { formatNumber } from '@/lib/formatters';
import { ResultCard } from './ResultCard';

export function InjectorRecommendationCard({ fuelResult }: { fuelResult: FuelCalculationResult }) {
  const [showMore, setShowMore] = useState(false);
  const injector = fuelResult.injectorRecommendation;
  const requiredFlow = fuelResult.requiredInjectorCcMin;
  const isExactMatch = injector.cc >= requiredFlow;
  const ctaUrl = injector.affiliateUrl ?? injector.url;
  const ctaLabel = injector.affiliateUrl ? 'Shop Affiliate' : injector.url ? 'Shop' : 'Contact Sales';

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

        <div className="flex items-center justify-between pt-2 border-t border-slate-700">
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="text-xs text-slate-300 hover:text-white"
            aria-expanded={showMore}
          >
            {showMore ? 'Hide details' : 'View details'}
          </button>
          <span className="text-xs text-emerald-300">{isExactMatch ? 'Good headroom' : 'Near limit'}</span>
        </div>

        {showMore && (
          <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3 text-sm">
            <div>Required Flow: {formatNumber(requiredFlow)} cc/min</div>
            <div>Current Injector: {formatNumber(injector.cc)} cc/min ({formatNumber(injector.lbHr)} lb/hr)</div>
            <div>Fuels: {injector.fuels.join(', ')}</div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
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

        <p className="text-sm text-slate-400 pt-2 border-t border-slate-700">{injector.note}</p>
      </div>
    </ResultCard>
  );
}
