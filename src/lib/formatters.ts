import { parseEngineDisplacement } from './parsing';

export function formatNumber(value: number, decimals = 1): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatDisplacementInput(raw: string): string {
  const parsed = parseEngineDisplacement(raw);
  if (!parsed) return raw;

  if (parsed.unit === 'L') {
    return `${formatNumber(parsed.liters, 2)}L`;
  }

  return `${Math.round(parsed.cubicInches)}ci`;
}
