import { CalculationInput, CalculationResult, WarningItem } from '@/types/calculator';
import { calculateFuelSystem } from './calculators/fuel';
import { pushWarning } from './calculators/shared';
import { calculateTurboSizing } from './calculators/turbo';

export function calculateRecommendations(input: CalculationInput): CalculationResult {
  const warnings: WarningItem[] = [];
  const turbo = input.selectedModes.includes('turbo') ? calculateTurboSizing(input) : undefined;
  const fuel = input.selectedModes.includes('fuel') ? calculateFuelSystem(input) : undefined;

  if (turbo?.fallbackTurbo) {
    pushWarning(warnings, 'No turbo fully supports required airflow. Showing the closest available option.');
  }

  if (turbo?.fallbackSpecs) {
    pushWarning(warnings, 'No exact turbo match in catalog. Minimum turbo specs are provided as fallback guidance.');
  }

  if (fuel?.injectorAtLimit) {
    pushWarning(warnings, 'Selected injector is near max capacity for this power target.');
  }

  if (input.selectedModes.includes('fuel') && input.injectorDutyCycle > 90) {
    pushWarning(warnings, 'Injector duty cycle above 90% is generally unsafe for sustained operation.');
  }

  if (fuel?.fuelSystemNearLimit) {
    pushWarning(warnings, 'Recommended fuel system is near its capacity limit. Consider moving up one tier.');
  }

  if (fuel?.noExactInjectorMatch) {
    pushWarning(warnings, 'No exact injector match found. Returning largest available compatible injector.');
  }

  return {
    turbo: turbo ?? undefined,
    fuel: fuel ?? undefined,
    warnings,
  };
}
