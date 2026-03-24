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

  let boostPsi: number;
  let requiredAirflowLbMin: number;
  let pressureRatio: number;
  let estimatedCrankHp: number;

  if (input.sizingMode === 'hp') {
    boostPsi = 15; // default estimate
    pressureRatio = (boostPsi + 14.7) / 14.7;
    const naCfm = (parsed.cubicInches * input.maxRpm * (input.volumetricEfficiency / 100)) / 3456;
    const boostedCfm = naCfm * pressureRatio;
    requiredAirflowLbMin = boostedCfm * 0.076;
    estimatedCrankHp = input.horsepower;
  } else {
    boostPsi = input.boostPsi;
    pressureRatio = (boostPsi + 14.7) / 14.7;
    const naCfm = (parsed.cubicInches * input.maxRpm * (input.volumetricEfficiency / 100)) / 3456;
    const boostedCfm = naCfm * pressureRatio;
    requiredAirflowLbMin = boostedCfm * 0.076;
    estimatedCrankHp = requiredAirflowLbMin * 10;
  }

  const customerTurbos = TURBOS.filter(t => t.source === 'customer');
  const affiliateTurbos = TURBOS.filter(t => t.source === 'affiliate');

  let primaryMatches: TurboProduct[] = [];
  let alternativeMatches: TurboProduct[] = [];

  if (input.sizingMode === 'hp') {
    const hp = input.horsepower;
    const customerHpMatches = customerTurbos.filter(t => t.airflowLbMin >= requiredAirflowLbMin && t.horsepowerRangeMin <= hp && hp <= t.horsepowerRangeMax)
      .sort((a, b) => a.airflowLbMin - b.airflowLbMin);
    const affiliateHpMatches = affiliateTurbos.filter(t => t.airflowLbMin >= requiredAirflowLbMin && t.horsepowerRangeMin <= hp && hp <= t.horsepowerRangeMax)
      .sort((a, b) => a.airflowLbMin - b.airflowLbMin);

    if (customerHpMatches.length > 0) {
      primaryMatches = customerHpMatches.slice(0, 2);
      alternativeMatches = affiliateHpMatches.slice(0, 2);
    } else {
      primaryMatches = affiliateHpMatches.slice(0, 2);
    }
  } else {
    const customerAirflowMatches = customerTurbos.filter(t => t.airflowLbMin >= requiredAirflowLbMin)
      .sort((a, b) => a.airflowLbMin - b.airflowLbMin);
    const affiliateAirflowMatches = affiliateTurbos.filter(t => t.airflowLbMin >= requiredAirflowLbMin)
      .sort((a, b) => a.airflowLbMin - b.airflowLbMin);

    if (customerAirflowMatches.length > 0) {
      primaryMatches = customerAirflowMatches.slice(0, 2);
      alternativeMatches = affiliateAirflowMatches.slice(0, 2);
    } else {
      primaryMatches = affiliateAirflowMatches.slice(0, 2);
    }
  }

  const selectedTurbo = primaryMatches.length > 0 ? primaryMatches[0] : TURBOS.sort((a, b) => b.airflowLbMin - a.airflowLbMin)[0];

  if (primaryMatches.length === 0) {
    return {
      requiredAirflowLbMin,
      pressureRatio,
      recommendedTurbos: [selectedTurbo],
      fallbackTurbo: selectedTurbo,
      fallbackSpecs: buildFallbackSpecs(requiredAirflowLbMin, estimatedCrankHp),
      boostEstimateRows: buildBoostRows(input, selectedTurbo),
    };
  }

  return {
    requiredAirflowLbMin,
    pressureRatio,
    recommendedTurbos: primaryMatches,
    alternativeTurbos: alternativeMatches.length > 0 ? alternativeMatches : undefined,
    boostEstimateRows: buildBoostRows(input, selectedTurbo),
  };
}
