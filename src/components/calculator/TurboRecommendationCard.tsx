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
  const isExactMatch = requiredAirflow && turbo.airflowLbMin >= requiredAirflow;
  const hpInRange = estimatedHp && estimatedHp >= turbo.horsepowerRangeMin && estimatedHp <= turbo.horsepowerRangeMax;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(turbo)}
      className={`w-full text-left ${isSelected ? 'ring-2 ring-cyan-300' : ''} rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
    >
      <ResultCard title={`${turbo.brand} - ${turbo.name}`} accent="blue">
        <div className="space-y-3">
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
        </div>
      </ResultCard>
    </button>
  );
}
