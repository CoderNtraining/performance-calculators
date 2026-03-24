import { WarningItem } from '@/types/calculator';

export function pushWarning(warnings: WarningItem[], message: string): void {
  warnings.push({
    id: `${warnings.length + 1}-${message.slice(0, 20)}`,
    message,
  });
}
