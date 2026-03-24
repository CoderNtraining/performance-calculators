import { TurboFallbackSpecs } from '@/types/calculator';
import { ResultCard } from './ResultCard';

export function TurboSpecFallbackCard({ fallback }: { fallback: TurboFallbackSpecs }) {
  return (
    <ResultCard title="Custom Sizing Guidance" accent="yellow">
      <div className="space-y-3">
        <div className="rounded-xl border p-3" style={{ borderColor: 'rgba(245, 158, 11, 0.24)', backgroundColor: 'rgba(245, 158, 11, 0.08)' }}>
          <div className="text-sm font-medium text-[var(--text-primary)]">
            No exact in-catalog turbo was a confident fit, so here are the minimum specs to keep your build on track.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-[var(--text-muted)]">Required Airflow:</span>
            <div className="font-semibold text-[var(--warning)]">{Math.round(fallback.requiredAirflowLbMin)} lb/min</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Compressor Inducer:</span>
            <div className="font-semibold text-[var(--text-primary)]">{fallback.compressorInducerRangeMm}</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Turbine Exducer:</span>
            <div className="font-semibold text-[var(--text-primary)]">{fallback.turbineExducerRangeMm}</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Recommended A/R:</span>
            <div className="font-semibold text-[var(--text-primary)]">{fallback.recommendedArRange}</div>
          </div>
        </div>

        <div className="border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-sm text-[var(--text-muted)]">Share these specs with your sales or tuning contact to confirm the right custom option.</p>
        </div>
      </div>
    </ResultCard>
  );
}
