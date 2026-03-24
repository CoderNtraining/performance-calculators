import { TURBOS } from '@/data/turbos';
import { CalculationInput, TurboBoostRow, TurboCalculationResult, TurboFallbackSpecs } from '@/types/calculator';
import { TurboProduct } from '@/types/products';
import { parseEngineDisplacement } from '../parsing';

function getArRangeFromHorsepower(crankHp: number): string {
  if (crankHp < 500) return '0.63-0.82 (quick spool)';
  if (crankHp < 800) return '0.68-0.96 (balanced)';
  if (crankHp < 1200) return '0.81-1.10 (high power)';
  return '0.96-1.25+ (race)';
}

function buildFallbackSpecs(requiredAirflowLbMin: number, estimatedCrankHp: number): TurboFallbackSpecs {
  const compressorMin = Math.max(66, Math.round(requiredAirflowLbMin * 0.58));
  const compressorMax = Math.max(compressorMin + 8, Math.round(requiredAirflowLbMin * 0.67));
  const turbineMin = Math.max(74, Math.round(requiredAirflowLbMin * 0.68));
  const turbineMax = Math.max(turbineMin + 8, Math.round(requiredAirflowLbMin * 0.76));

  return {
    requiredAirflowLbMin,
    compressorInducerRangeMm: `${Math.min(compressorMin, 85)}-${Math.max(Math.min(compressorMax, 92), 85)} mm`,
    turbineExducerRangeMm: `${Math.min(turbineMin, 96)}-${Math.max(Math.min(turbineMax, 103), 102)} mm`,
    recommendedArRange: getArRangeFromHorsepower(estimatedCrankHp),
    note: 'No exact turbo in current catalog fully meets airflow; these minimum specs are suggested for custom selection.',
  };
}

function getEstimatedCrankHp(cubicInches: number, rpm: number, ve: number, pressureRatio: number, airflowCap: number): number {
  const naCfm = (cubicInches * rpm * ve) / 3456;
  const boostedCfm = naCfm * pressureRatio;
  const airflowLbMin = boostedCfm * 0.076;
  return Math.min(airflowLbMin * 10, airflowCap * 10);
}

function buildBoostRows(input: CalculationInput, selectedTurbo?: TurboProduct): TurboBoostRow[] {
  const parsed = parseEngineDisplacement(input.engineDisplacement);
  if (!parsed) return [];

  const cap = selectedTurbo?.airflowLbMin ?? Number.POSITIVE_INFINITY;
  const levels = Array.from({ length: 31 }, (_, i) => 5 + i);

  return levels.map((boostPsi) => {
    const pressureRatio = (boostPsi + 14.7) / 14.7;
    const estimatedCrankHp = getEstimatedCrankHp(
      parsed.cubicInches,
      input.maxRpm,
      input.volumetricEfficiency / 100,
      pressureRatio,
      cap,
    );

    return {
      boostPsi,
      pressureRatio,
      estimatedCrankHp,
    };
  });
}

export function calculateTurboSizing(input: CalculationInput): TurboCalculationResult | null {
  const parsed = parseEngineDisplacement(input.engineDisplacement);
  if (!parsed) return null;

  const pressureRatio = (input.boostPsi + 14.7) / 14.7;
  const naCfm = (parsed.cubicInches * input.maxRpm * (input.volumetricEfficiency / 100)) / 3456;
  const boostedCfm = naCfm * pressureRatio;
  const requiredAirflowLbMin = boostedCfm * 0.076;
  const estimatedCrankHp = requiredAirflowLbMin * 10;

  const sorted = [...TURBOS].sort((a, b) => a.airflowLbMin - b.airflowLbMin);
  const matches = sorted.filter((turbo) => turbo.airflowLbMin >= requiredAirflowLbMin).slice(0, 2);
  const selectedTurbo = matches.length > 0 ? matches[0] : sorted[sorted.length - 1];

  if (matches.length === 0) {
    const largest = sorted[sorted.length - 1];
    return {
      requiredAirflowLbMin,
      pressureRatio,
      recommendedTurbos: [largest],
      fallbackTurbo: largest,
      fallbackSpecs: buildFallbackSpecs(requiredAirflowLbMin, estimatedCrankHp),
      boostEstimateRows: buildBoostRows(input, selectedTurbo),
    };
  }

  return {
    requiredAirflowLbMin,
    pressureRatio,
    recommendedTurbos: matches,
    boostEstimateRows: buildBoostRows(input, selectedTurbo),
  };
}
