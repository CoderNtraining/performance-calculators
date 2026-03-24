import { ReactNode } from 'react';
import { Card } from '../ui/Card';

export function ResultCard({ title, accent = 'blue', children }: { title: string; accent?: 'blue' | 'green' | 'yellow'; children: ReactNode }) {
  const accents: Record<'blue' | 'green' | 'yellow', React.CSSProperties> = {
    blue: { borderColor: 'rgba(59, 130, 246, 0.24)' },
    green: { borderColor: 'rgba(34, 197, 94, 0.24)' },
    yellow: { borderColor: 'rgba(245, 158, 11, 0.24)' },
  };

  return (
    <Card variant="informational" style={accents[accent]}>
      <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      {children}
    </Card>
  );
}
