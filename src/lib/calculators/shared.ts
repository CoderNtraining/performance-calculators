import { WarningItem } from '@/types/calculator';
import { formatNumber } from '@/lib/formatters';

export function pushWarning(warnings: WarningItem[], message: string): void {
  warnings.push({
    id: `${warnings.length + 1}-${message.slice(0, 20)}`,
    message,
  });
}

export type HeadroomStatus = 'Excellent Fit' | 'Good Fit' | 'Near Limit' | 'Undersized';

export function calculateHeadroomStatus(headroomPercent: number): HeadroomStatus {
  if (headroomPercent >= 25) return 'Excellent Fit';
  if (headroomPercent >= 10) return 'Good Fit';
  if (headroomPercent >= 0) return 'Near Limit';
  return 'Undersized';
}

export function formatHeadroomPercent(headroomPercent: number): string {
  return `${Math.round(headroomPercent)}%`;
}

export function formatTargetHp(hp: number): string {
  // Round to nearest 25 or 50 for cleaner display
  const rounded = Math.round(hp / 25) * 25;
  return formatNumber(rounded);
}

export function formatInjectorCc(cc: number): string {
  // Round to nearest 50 for cleaner display
  const rounded = Math.round(cc / 50) * 50;
  return `${rounded}cc`;
}
