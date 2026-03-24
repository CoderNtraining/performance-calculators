import { TurboProduct } from '@/types/products';
import { calculateHeadroomStatus, formatHeadroomPercent, formatTargetHp } from '@/lib/calculators/shared';
import { ProductRecommendationCard } from './ProductRecommendationCard';
import { getAlternativeMessage, getHeadroomPercent, getPrimaryConfidence } from '@/lib/recommendationDisplay';

interface TurboRecommendationCardProps {
  turbo: TurboProduct;
  requiredAirflow?: number;
  onProductClick?: (productId: string) => void;
  onAffiliateClick?: (productId: string) => void;
  eyebrow: string;
  variant?: 'primary' | 'secondary';
  comparisonHeadroomPercent?: number;
}

export function TurboRecommendationCard({
  turbo,
  requiredAirflow,
  onProductClick,
  onAffiliateClick,
  eyebrow,
  variant = 'primary',
  comparisonHeadroomPercent,
}: TurboRecommendationCardProps) {
  const headroomPercent = requiredAirflow ? getHeadroomPercent(turbo.airflowLbMin, requiredAirflow) : 0;
  const headroomStatus = calculateHeadroomStatus(headroomPercent);
  const ctaUrl = turbo.link;
  const ctaLabel = turbo.source === 'customer' ? 'Add to Quote' : 'View Product';
  const alternativeMessage = comparisonHeadroomPercent === undefined
    ? undefined
    : getAlternativeMessage(comparisonHeadroomPercent, headroomPercent);

  const handleCtaClick = () => {
    if (turbo.source === 'customer') {
      onProductClick?.(turbo.id);
    } else {
      onAffiliateClick?.(turbo.id);
    }
  };

  return (
    <ProductRecommendationCard
      eyebrow={eyebrow}
      productName={turbo.name}
      brand={turbo.brand}
      status={headroomStatus}
      specs={[
        { label: 'Airflow', value: `${Math.round(turbo.airflowLbMin)} lb/min` },
        { label: 'Power Range', value: `${formatTargetHp(turbo.horsepowerRangeMin)}-${formatTargetHp(turbo.horsepowerRangeMax)} HP` },
        { label: 'Headroom', value: formatHeadroomPercent(headroomPercent) },
      ]}
      confidence={alternativeMessage?.description ?? getPrimaryConfidence('turbo', headroomStatus, headroomPercent)}
      ctaLabel={ctaLabel}
      ctaUrl={ctaUrl}
      source={turbo.source}
      onCtaClick={handleCtaClick}
      variant={variant}
      fitLabel={alternativeMessage?.label}
    />
  );
}
