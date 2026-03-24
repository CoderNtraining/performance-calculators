import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeadroomStatus } from '@/lib/calculators/shared';
import { getStatusStyles } from '@/lib/recommendationDisplay';
import { ProductSource } from '@/types/products';

interface ProductRecommendationCardProps {
  eyebrow: string;
  productName: string;
  brand: string;
  status: HeadroomStatus;
  specs: Array<{ label: string; value: string }>;
  confidence: string;
  ctaLabel: string;
  source: ProductSource;
  ctaUrl?: string;
  onCtaClick?: () => void;
  variant?: 'primary' | 'secondary';
  fitLabel?: string;
  fitDescription?: string;
}

export function ProductRecommendationCard({
  eyebrow,
  productName,
  brand,
  status,
  specs,
  confidence,
  ctaLabel,
  source,
  ctaUrl,
  onCtaClick,
  variant = 'primary',
  fitLabel,
  fitDescription,
}: ProductRecommendationCardProps) {
  const statusStyles = getStatusStyles(status);
  const isAffiliate = source === 'affiliate';
  const cardClassName = variant === 'primary'
    ? 'border-2 shadow-xl shadow-slate-950/40'
    : 'border border-slate-700/80 shadow-lg shadow-slate-950/20';
  const cardStyle = variant === 'primary'
    ? {
        borderColor: 'rgba(56, 189, 248, 0.22)',
        backgroundColor: '#08111f',
        backgroundImage: 'linear-gradient(135deg, rgba(8, 145, 178, 0.18), rgba(15, 23, 42, 0.82) 42%, rgba(15, 23, 42, 1) 100%)',
      }
    : {
        borderColor: 'rgba(100, 116, 139, 0.5)',
        backgroundColor: '#0b1220',
        backgroundImage: 'linear-gradient(180deg, rgba(148, 163, 184, 0.06), rgba(15, 23, 42, 0.95))',
      };

  const cta = ctaUrl && isAffiliate ? (
    <a
      href={ctaUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onCtaClick}
      className="block w-full rounded-lg bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
    >
      {ctaLabel}
    </a>
  ) : (
    <Button
      onClick={onCtaClick}
      className="w-full border-transparent bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
    >
      {ctaLabel}
    </Button>
  );

  return (
    <Card className={cardClassName} style={cardStyle}>
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-white">{productName}</h3>
                <p className="text-sm text-slate-300">{brand}</p>
              </div>
            </div>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles.badge}`}>
              {status}
            </span>
          </div>

          {fitLabel && (
            <div className="rounded-xl border border-slate-700/70 bg-slate-950/40 p-3">
              <p className="text-sm font-semibold text-slate-100">{fitLabel}</p>
              {fitDescription && <p className="mt-1 text-sm text-slate-300">{fitDescription}</p>}
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {specs.map((spec) => (
            <div key={`${spec.label}-${spec.value}`} className="rounded-xl border border-slate-800/80 bg-slate-950/35 p-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{spec.label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{spec.value}</p>
            </div>
          ))}
        </div>

        <p className={`text-sm ${statusStyles.text}`}>{confidence}</p>

        {isAffiliate && (
          <p className="text-xs text-slate-400">
            Partner option shown for comparison or fallback when a direct in-house match is limited.
          </p>
        )}

        <div>{cta}</div>
      </div>
    </Card>
  );
}
