import { WarningItem } from '@/types/calculator';
import { Card } from '../ui/Card';

export function WarningList({ warnings }: { warnings: WarningItem[] }) {
  if (!warnings.length) return null;

  return (
    <Card variant="informational" style={{ borderColor: 'rgba(239, 68, 68, 0.24)' }}>
      <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">Build Notes</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
        {warnings.map((warning) => (
          <li key={warning.id}>{warning.message}</li>
        ))}
      </ul>
    </Card>
  );
}
