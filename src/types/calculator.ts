import { FuelSystemProduct, InjectorProduct, TurboProduct } from './products';

export type CalculatorMode = 'turbo' | 'fuel';
export type SizingMode = 'hp' | 'boost';

export interface WarningItem {
  id: string;
  message: string;
}

export interface CalculationInput {
  selectedModes: CalculatorMode[];
  sizingMode: SizingMode;
  engineDisplacement: string;
  cylinderCount: number;
  boostPsi: number;
  maxRpm: number;
  volumetricEfficiency: number;
  horsepowerType: 'crank' | 'rwhp';
  horsepower: number;
  drivetrain: 'manual' | 'auto';
  fuelType: 'pump_gas' | 'e85';
  baseFuelPressure: number;
  injectorDutyCycle: number;
}

export interface TurboFallbackSpecs {
  requiredAirflowLbMin: number;
  compressorInducerRangeMm: string;
  turbineExducerRangeMm: string;
  recommendedArRange: string;
  note: string;
}

export interface TurboBoostRow {
  boostPsi: number;
  pressureRatio: number;
  estimatedCrankHp: number;
}

export interface TurboCalculationResult {
  requiredAirflowLbMin: number;
  pressureRatio: number;
  recommendedTurbos: TurboProduct[];
  fallbackTurbo?: TurboProduct;
  fallbackSpecs?: TurboFallbackSpecs;
  boostEstimateRows: TurboBoostRow[];
}

export interface FuelCalculationResult {
  estimatedCrankHp: number;
  requiredInjectorCcMin: number;
  injectorRecommendation: InjectorProduct;
  injectorAtLimit: boolean;
  noExactInjectorMatch: boolean;
  fuelSystemRecommendation: FuelSystemProduct;
  fuelSystemNearLimit: boolean;
}

export interface CalculationResult {
  turbo?: TurboCalculationResult;
  fuel?: FuelCalculationResult;
  warnings: WarningItem[];
}
