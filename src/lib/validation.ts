import { CalculationInput } from '@/types/calculator';
import { parseEngineDisplacement } from './parsing';

export function validateInputs(input: CalculationInput): string[] {
  const errors: string[] = [];

  if (!parseEngineDisplacement(input.engineDisplacement)) {
    errors.push('Engine displacement must be a valid value such as 5.3L or 408ci.');
  }

  if (input.cylinderCount < 1) {
    errors.push('Cylinder count must be greater than 0.');
  }

  if (input.selectedModes.includes('turbo')) {
    if (input.boostPsi < 0) errors.push('Boost pressure cannot be negative.');
    if (input.maxRpm < 1000) errors.push('Max RPM should be at least 1000.');
    if (input.volumetricEfficiency <= 0 || input.volumetricEfficiency > 120) {
      errors.push('Volumetric efficiency must be between 1 and 120.');
    }
  }

  if (input.selectedModes.includes('fuel')) {
    if (input.horsepower <= 0) errors.push('Horsepower must be greater than 0.');
    if (input.baseFuelPressure <= 0) errors.push('Base fuel pressure must be greater than 0.');
    if (input.injectorDutyCycle <= 0 || input.injectorDutyCycle > 100) {
      errors.push('Injector duty cycle must be between 1 and 100.');
    }
  }

  if (input.selectedModes.length === 0) {
    errors.push('Select at least one calculator module.');
  }

  return errors;
}
