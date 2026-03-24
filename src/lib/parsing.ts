const LITER_TO_CID = 61.0237;

export interface ParsedDisplacement {
  liters: number;
  cubicInches: number;
  unit: 'L' | 'ci';
}

export function parseEngineDisplacement(raw: string): ParsedDisplacement | null {
  const value = raw.trim().toLowerCase();
  if (!value) return null;

  const match = value.match(/^([0-9]*\.?[0-9]+)\s*(l|liter|liters|ci|cid)?$/);
  if (!match) return null;

  const numeric = Number(match[1]);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;

  const unit = match[2];
  if (unit === 'l' || unit === 'liter' || unit === 'liters') {
    return { liters: numeric, cubicInches: numeric * LITER_TO_CID, unit: 'L' };
  }

  if (unit === 'ci' || unit === 'cid') {
    return { liters: numeric / LITER_TO_CID, cubicInches: numeric, unit: 'ci' };
  }

  if (numeric < 20) {
    return { liters: numeric, cubicInches: numeric * LITER_TO_CID, unit: 'L' };
  }

  return { liters: numeric / LITER_TO_CID, cubicInches: numeric, unit: 'ci' };
}
