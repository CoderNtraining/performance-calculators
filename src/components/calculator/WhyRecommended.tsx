import { Card } from '@/components/ui/Card';

interface WhyRecommendedProps {
  lines: string[];
}

export function WhyRecommended({ lines }: WhyRecommendedProps) {
  if (!lines.length) return null;

  return (
    <Card
      className="border border-slate-700/80"
      style={{
        borderColor: 'rgba(100, 116, 139, 0.45)',
        backgroundColor: '#09111d',
      }}
    >
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-100">
          <span>Why this was recommended</span>
          <span className="text-slate-400 transition group-open:rotate-45">+</span>
        </summary>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </details>
    </Card>
  );
}
