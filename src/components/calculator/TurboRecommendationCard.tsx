import { useState } from 'react';
import { TurboProduct } from '@/types/products';
import { formatNumber } from '@/lib/formatters';
import { ResultCard } from './ResultCard';

interface TurboRecommendationCardProps {
  turbo: TurboProduct;
  isSelected?: boolean;
  onSelect?: (turbo: TurboProduct) => void;
  requiredAirflow?: number;
  estimatedHp?: number;
}

export function TurboRecommendationCard({
  turbo,
  isSelected = false,
  onSelect,
  requiredAirflow,
  estimatedHp
}: TurboRecommendationCardProps) {
  const [showMore, setShowMore] = useState(false);
  const isExactMatch = requiredAirflow && turbo.airflowLbMin >= requiredAirflow;
  const hpInRange = estimatedHp && estimatedHp >= turbo.horsepowerRangeMin && estimatedHp <= turbo.horsepowerRangeMax;
  const ctaUrl = turbo.affiliateUrl ?? turbo.url;
  const ctaLabel = turbo.affiliateUrl ? 'Shop Affiliate' : turbo.url ? 'Shop' : 'Contact Sales';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(turbo)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect?.(turbo);
        }
      }}
      className={`w-full text-left ${isSelected ? 'ring-2 ring-cyan-300' : ''} rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer`}
    >
      <ResultCard title={`${turbo.brand} - ${turbo.name}`} accent="blue">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-cyan-200">{turbo.recommendedUse}</span>
            <button
              type="button"
              className="text-xs text-slate-300 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setShowMore((prev) => !prev); }}
              aria-expanded={showMore}
            >
              {showMore ? 'Hide details' : 'View details'}
            </button>
          </div>
          {showMore && (
            <div className="space-y-2 p-3 rounded-lg bg-slate-900/60 border border-slate-700 text-sm">
              <div>Airflow: {formatNumber(turbo.airflowLbMin)} lb/min</div>
              <div>HP Range: {turbo.horsepowerRangeMin}-{turbo.horsepowerRangeMax} hp</div>
              <div>Compressor: {turbo.compressorInducerMm}mm inducer{turbo.compressorExducerMm ? ` / ${turbo.compressorExducerMm}mm exducer` : ''}</div>
              <div>Turbine: {turbo.turbineWheelOdMm ? `${turbo.turbineWheelOdMm}mm wheel OD` : turbo.turbineExducerMm ? `${turbo.turbineExducerMm}mm exducer` : 'N/A'}</div>
              <div>AR Options: {turbo.arOptions.join(', ')}</div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div>
              <span className="text-slate-400">Airflow:</span>
              <div className="font-semibold text-cyan-200">{formatNumber(turbo.airflowLbMin)} lb/min</div>
            </div>
            <div>
              <span className="text-slate-400">HP Range:</span>
              <div className="font-semibold text-cyan-200">{turbo.horsepowerRangeMin}-{turbo.horsepowerRangeMax} hp</div>
            </div>
            <div>
              <span className="text-slate-400">Compressor:</span>
              <div className="font-semibold text-slate-200">
                {turbo.compressorInducerMm}mm inducer
                {turbo.compressorExducerMm && ` / ${turbo.compressorExducerMm}mm exducer`}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Turbine:</span>
              <div className="font-semibold text-slate-200">
                {turbo.turbineWheelOdMm
                  ? `${turbo.turbineWheelOdMm}mm wheel OD`
                  : turbo.turbineExducerMm
                  ? `${turbo.turbineExducerMm}mm exducer`
                  : 'N/A'
                }
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-sm">A/R Options:</span>
            <div className="text-sm text-slate-200 mt-1">{turbo.arOptions.join(', ')}</div>
          </div>

          <div className="text-sm text-slate-300 italic">
            {turbo.recommendedUse}
          </div>

          {requiredAirflow && (
            <div className="pt-2 border-t border-slate-700">
              <div className="text-xs text-emerald-300 font-medium">
                {isExactMatch
                  ? `✓ Selected because required airflow is ${formatNumber(requiredAirflow)} lb/min and this turbo supports ${formatNumber(turbo.airflowLbMin)} lb/min`
                  : `⚠ Closest match - required airflow: ${formatNumber(requiredAirflow)} lb/min, this turbo: ${formatNumber(turbo.airflowLbMin)} lb/min`
                }
              </div>
            </div>
          )}

          <p className="text-sm text-slate-400 pt-2 border-t border-slate-700">{turbo.note}</p>
          {turbo.sourceFamily && (
            <p className="text-xs text-slate-500 pt-1">Source: {turbo.sourceFamily}</p>
          )}

          <div className="flex flex-wrap gap-2 pt-3">
            {ctaUrl ? (
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              >
                {ctaLabel}
              </a>
            ) : (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); window.alert('Contact sales to get a custom quote.'); }}
                className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
              >
                Contact Sales
              </button>
            )}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); window.alert('Added to quote request (demo).'); }}
              className="rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-medium hover:bg-slate-700"
            >
              Add to quote
            </button>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}
