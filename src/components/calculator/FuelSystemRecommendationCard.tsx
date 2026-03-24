import { FuelCalculationResult } from '@/types/calculator';
import { calculateHeadroomStatus, formatHeadroomPercent, formatTargetHp } from '@/lib/calculators/shared';
import { ProductRecommendationCard } from './ProductRecommendationCard';
import { getAlternativeMessage, getHeadroomPercent, getPrimaryConfidence } from '@/lib/recommendationDisplay';

interface FuelSystemRecommendationCardProps {
  fuelResult: FuelCalculationResult;
  onProductClick?: (productId: string) => void;
  onAffiliateClick?: (productId: string) => void;
  eyebrow: string;
  variant?: 'primary' | 'secondary';
  comparisonHeadroomPercent?: number;
}

export function FuelSystemRecommendationCard({
  fuelResult,
  onProductClick,
  onAffiliateClick,
  eyebrow,
  variant = 'primary',
  comparisonHeadroomPercent,
}: FuelSystemRecommendationCardProps) {
  const fuelSystem = fuelResult.fuelSystemRecommendation;
  const estimatedHp = fuelResult.estimatedCrankHp;
  const headroomPercent = getHeadroomPercent(fuelSystem.maxHp, estimatedHp);
  const headroomStatus = calculateHeadroomStatus(headroomPercent);
  const ctaUrl = fuelSystem.link;
  const ctaLabel = fuelSystem.source === 'customer' ? 'Add to Quote' : 'View Product';
  const alternativeMessage = comparisonHeadroomPercent === undefined
    ? undefined
    : getAlternativeMessage(comparisonHeadroomPercent, headroomPercent);

  const handleCtaClick = () => {
    if (fuelSystem.source === 'customer') {
      onProductClick?.(fuelSystem.id);
    } else {
      onAffiliateClick?.(fuelSystem.id);
    }
  };

  return (
    <ProductRecommendationCard
      eyebrow={eyebrow}
      productName={fuelSystem.name}
      brand={fuelSystem.brand}
      status={headroomStatus}
      specs={[
        { label: 'Support', value: `${formatTargetHp(fuelSystem.maxHp)} HP` },
        { label: 'Fuel', value: fuelSystem.compatibleFuels.map((fuel) => fuel === 'pump_gas' ? 'Pump Gas' : 'E85').join(' / ') },
        { label: 'Headroom', value: formatHeadroomPercent(headroomPercent) },
      ]}
      confidence={alternativeMessage?.description ?? getPrimaryConfidence('fuelSystem', headroomStatus, headroomPercent)}
      ctaLabel={ctaLabel}
      ctaUrl={ctaUrl}
      source={fuelSystem.source}
      onCtaClick={handleCtaClick}
      variant={variant}
      fitLabel={alternativeMessage?.label}
      fitDescription={alternativeMessage ? undefined : fuelSystem.note}
    />
  );
}
