import { TurboFallbackSpecs } from '@/types/calculator';
import { formatNumber } from '@/lib/formatters';
import { ResultCard } from './ResultCard';

export function TurboSpecFallbackCard({ fallback }: { fallback: TurboFallbackSpecs }) {
  return (
    <ResultCard title="Minimum Required Turbo Specifications" accent="yellow">
      <div className="space-y-3">
        <div className="bg-amber-950/30 border border-amber-700/50 rounded-lg p-3">
          <div className="text-sm text-amber-200 font-medium">
            ⚠ No exact turbo match found in our catalog. These are the minimum specifications required for your build.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-slate-400">Required Airflow:</span>
            <div className="font-semibold text-amber-200">{formatNumber(fallback.requiredAirflowLbMin)} lb/min</div>
          </div>
          <div>
            <span className="text-slate-400">Compressor Inducer:</span>
            <div className="font-semibold text-slate-200">{fallback.compressorInducerRangeMm}</div>
          </div>
          <div>
            <span className="text-slate-400">Turbine Exducer:</span>
            <div className="font-semibold text-slate-200">{fallback.turbineExducerRangeMm}</div>
          </div>
          <div>
            <span className="text-slate-400">Recommended A/R:</span>
            <div className="font-semibold text-slate-200">{fallback.recommendedArRange}</div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <p className="text-sm text-slate-400">{fallback.note}</p>
        </div>
      </div>
    </ResultCard>
  );
}
