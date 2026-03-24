import { Card } from '@/components/ui/Card';

interface WhyRecommendedProps {
  lines: string[];
}

export function WhyRecommended({ lines }: WhyRecommendedProps) {
  if (!lines.length) return null;

  return (
    <Card variant="informational">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl text-sm font-semibold text-[var(--text-primary)]">
          <span>Why this was recommended</span>
          <span className="text-[var(--text-muted)] transition group-open:rotate-45">+</span>
        </summary>
        <div className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </details>
    </Card>
  );
}
