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
    if (input.boostPsi > 45) errors.push('Boost pressure above 45 PSI is uncommon for street setups.');
    if (input.maxRpm < 1000) errors.push('Max RPM should be at least 1000.');
    if (input.maxRpm > 12000) errors.push('Max RPM above 12000 is likely out of practical limits.');
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
    if (input.injectorDutyCycle > 95) {
      errors.push('Injector duty cycle above 95% may cause reliability issues.');
    }
  }

  if (input.selectedModes.length === 0) {
    errors.push('Select at least one calculator module.');
  }

  // Sizing mode validation
  if (input.sizingMode === 'hp' && input.horsepower <= 0) {
    errors.push('Horsepower goal is required when sizing by HP.');
  }
  if (input.sizingMode === 'boost' && input.boostPsi <= 0) {
    errors.push('Boost PSI goal is required when sizing by Boost.');
  }

  return errors;
}
