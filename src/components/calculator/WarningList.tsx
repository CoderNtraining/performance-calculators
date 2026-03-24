import { WarningItem } from '@/types/calculator';
import { Card } from '../ui/Card';

export function WarningList({ warnings }: { warnings: WarningItem[] }) {
  if (!warnings.length) return null;

  return (
    <Card className="border-red-700/70">
      <h3 className="mb-2 text-lg font-semibold text-red-300">Warnings</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-red-200">
        {warnings.map((warning) => (
          <li key={warning.id}>{warning.message}</li>
        ))}
      </ul>
    </Card>
  );
}
