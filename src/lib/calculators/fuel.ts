import { FUEL_SYSTEMS } from '@/data/fuelSystems';
import { INJECTORS } from '@/data/injectors';
import { CalculationInput, FuelCalculationResult } from '@/types/calculator';

const DRIVETRAIN_LOSS = {
  manual: 0.15,
  auto: 0.18,
} as const;

const BSFC_BY_FUEL = {
  pump_gas: 0.5,
  e85: 0.7,
} as const;

export function calculateFuelSystem(input: CalculationInput): FuelCalculationResult | null {
  const drivetrainLoss = DRIVETRAIN_LOSS[input.drivetrain];
  const bsfc = BSFC_BY_FUEL[input.fuelType];

  const estimatedCrankHp = input.horsepowerType === 'rwhp' ? input.horsepower / (1 - drivetrainLoss) : input.horsepower;

  const dutyCycleDecimal = input.injectorDutyCycle / 100;
  const baseInjectorLbHr = (estimatedCrankHp * bsfc) / (input.cylinderCount * dutyCycleDecimal);
  const injectorNeededCcMin = baseInjectorLbHr * 10.5;
  const pressureRatio = Math.sqrt(input.baseFuelPressure / 43.5);
  const injectorNeededCcMinAdjusted = injectorNeededCcMin / pressureRatio;
  const requiredWithMargin = injectorNeededCcMinAdjusted * 1.1;

  const compatibleInjectors = INJECTORS.filter((injector) => injector.fuels.includes(input.fuelType)).sort(
    (a, b) => a.cc - b.cc,
  );

  const matchedInjector = compatibleInjectors.find((injector) => injector.cc >= requiredWithMargin);
  const injectorRecommendation = matchedInjector ?? compatibleInjectors[compatibleInjectors.length - 1];

  const fuelSystems = [...FUEL_SYSTEMS].sort((a, b) => a.maxHp - b.maxHp);
  const fuelSystemRecommendation =
    fuelSystems.find((system) => system.maxHp >= estimatedCrankHp) ?? fuelSystems[fuelSystems.length - 1];

  return {
    estimatedCrankHp,
    requiredInjectorCcMin: requiredWithMargin,
    injectorRecommendation,
    injectorAtLimit: injectorRecommendation.cc < requiredWithMargin * 1.05,
    noExactInjectorMatch: !matchedInjector,
    fuelSystemRecommendation,
    fuelSystemNearLimit: estimatedCrankHp >= fuelSystemRecommendation.maxHp * 0.92,
  };
}
