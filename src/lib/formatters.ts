import { parseEngineDisplacement } from './parsing';

export function formatNumber(value: number, decimals = 0): string {
  const rounded = decimals === 0 ? Math.round(value) : value;
  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
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
