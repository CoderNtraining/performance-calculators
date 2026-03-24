import { FUEL_SYSTEMS } from '@/data/fuelSystems';
import { INJECTORS } from '@/data/injectors';
import { CalculationInput, FuelCalculationResult, InjectorProduct, FuelSystemProduct } from '@/types/calculator';

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

  const compatibleInjectors = INJECTORS.filter((injector) => injector.fuels.includes(input.fuelType));
  const customerInjectors = compatibleInjectors.filter(i => i.source === 'customer').sort((a, b) => a.cc - b.cc);
  const affiliateInjectors = compatibleInjectors.filter(i => i.source === 'affiliate').sort((a, b) => a.cc - b.cc);

  let injectorRecommendation: InjectorProduct;
  let alternativeInjector: InjectorProduct | undefined;

  const customerMatched = customerInjectors.find((injector) => injector.cc >= requiredWithMargin);
  const affiliateMatched = affiliateInjectors.find((injector) => injector.cc >= requiredWithMargin);

  if (customerMatched) {
    injectorRecommendation = customerMatched;
    alternativeInjector = affiliateMatched;
  } else if (affiliateMatched) {
    injectorRecommendation = affiliateMatched;
  } else {
    // fallback to largest
    injectorRecommendation = compatibleInjectors.sort((a, b) => b.cc - a.cc)[0];
  }

  const fuelSystems = FUEL_SYSTEMS.filter(s => s.compatibleFuels.includes(input.fuelType));
  const customerFuelSystems = fuelSystems.filter(s => s.source === 'customer').sort((a, b) => a.maxHp - b.maxHp);
  const affiliateFuelSystems = fuelSystems.filter(s => s.source === 'affiliate').sort((a, b) => a.maxHp - b.maxHp);

  let fuelSystemRecommendation: FuelSystemProduct;
  let alternativeFuelSystem: FuelSystemProduct | undefined;

  const customerFuelMatched = customerFuelSystems.find((system) => system.maxHp >= estimatedCrankHp);
  const affiliateFuelMatched = affiliateFuelSystems.find((system) => system.maxHp >= estimatedCrankHp);

  if (customerFuelMatched) {
    fuelSystemRecommendation = customerFuelMatched;
    alternativeFuelSystem = affiliateFuelMatched;
  } else if (affiliateFuelMatched) {
    fuelSystemRecommendation = affiliateFuelMatched;
  } else {
    // fallback
    fuelSystemRecommendation = fuelSystems.sort((a, b) => b.maxHp - a.maxHp)[0];
  }

  return {
    estimatedCrankHp,
    requiredInjectorCcMin: requiredWithMargin,
    injectorRecommendation,
    alternativeInjector,
    injectorAtLimit: injectorRecommendation.cc < requiredWithMargin * 1.05,
    noExactInjectorMatch: !customerMatched && !affiliateMatched,
    fuelSystemRecommendation,
    alternativeFuelSystem,
    fuelSystemNearLimit: estimatedCrankHp >= fuelSystemRecommendation.maxHp * 0.92,
  };
}
