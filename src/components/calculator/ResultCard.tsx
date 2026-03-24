import { ReactNode } from 'react';
import { Card } from '../ui/Card';

export function ResultCard({ title, accent = 'blue', children }: { title: string; accent?: 'blue' | 'green' | 'yellow'; children: ReactNode }) {
  const accents = {
    blue: 'border-blue-700/60',
    green: 'border-emerald-700/60',
    yellow: 'border-amber-600/60',
  };

  return (
    <Card className={accents[accent]}>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </Card>
  );
}
