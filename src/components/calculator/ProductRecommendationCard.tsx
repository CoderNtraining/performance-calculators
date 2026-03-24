import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { HeadroomStatus } from '@/lib/calculators/shared';
import { getProductSourceLabel, getStatusStyles } from '@/lib/recommendationDisplay';
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
}: ProductRecommendationCardProps) {
  const statusStyles = getStatusStyles(status);
  const isAffiliate = source === 'affiliate';
  const statusBadgeVariant = status === 'Excellent Fit'
    ? 'fit-excellent'
    : status === 'Good Fit'
      ? 'fit-good'
      : status === 'Near Limit'
        ? 'fit-warning'
        : 'fit-danger';

  const cta = ctaUrl && isAffiliate ? (
    <a
      href={ctaUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onCtaClick}
      className="block w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold transition duration-150 hover:-translate-y-px"
      style={{
        borderColor: 'var(--border-strong)',
        backgroundColor: 'var(--bg-surface-muted)',
        color: 'var(--text-primary)',
      }}
    >
      {ctaLabel}
    </a>
  ) : (
    <Button
      onClick={onCtaClick}
      variant={variant === 'primary' ? 'primary' : 'secondary'}
      className="w-full py-3 font-semibold"
    >
      {ctaLabel}
    </Button>
  );

  return (
    <Card variant={variant === 'primary' ? 'recommendation-primary' : 'recommendation-secondary'}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusBadgeVariant}>{status}</Badge>
          <Badge variant={isAffiliate ? 'source-partner' : 'source-in-house'}>{getProductSourceLabel(source)}</Badge>
          {variant === 'secondary' && <Badge variant="alternative">Alternative Option</Badge>}
          {fitLabel === 'Future-Proof Option' && <Badge variant="future-proof">{fitLabel}</Badge>}
          {fitLabel === 'Tighter Fit' && <Badge variant="tighter">{fitLabel}</Badge>}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{eyebrow}</p>
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{productName}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{brand}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {specs.map((spec) => (
            <div
              key={`${spec.label}-${spec.value}`}
              className="rounded-2xl border p-3"
              style={{
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'rgba(11, 16, 32, 0.45)',
              }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">{spec.label}</p>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{spec.value}</p>
            </div>
          ))}
        </div>

        <p className="text-sm leading-6 text-[var(--text-secondary)]">{confidence}</p>

        <div>{cta}</div>
      </div>
    </Card>
  );
}
