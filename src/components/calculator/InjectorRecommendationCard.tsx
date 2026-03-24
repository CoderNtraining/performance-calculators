import { FuelCalculationResult } from '@/types/calculator';
import { calculateHeadroomStatus, formatHeadroomPercent, formatInjectorCc } from '@/lib/calculators/shared';
import { ProductRecommendationCard } from './ProductRecommendationCard';
import { getAlternativeMessage, getHeadroomPercent, getPrimaryConfidence } from '@/lib/recommendationDisplay';

interface InjectorRecommendationCardProps {
  fuelResult: FuelCalculationResult;
  onProductClick?: (productId: string) => void;
  onAffiliateClick?: (productId: string) => void;
  eyebrow: string;
  variant?: 'primary' | 'secondary';
  comparisonHeadroomPercent?: number;
}

export function InjectorRecommendationCard({
  fuelResult,
  onProductClick,
  onAffiliateClick,
  eyebrow,
  variant = 'primary',
  comparisonHeadroomPercent,
}: InjectorRecommendationCardProps) {
  const injector = fuelResult.injectorRecommendation;
  const requiredCc = fuelResult.requiredInjectorCcMin;
  const headroomPercent = getHeadroomPercent(injector.cc, requiredCc);
  const headroomStatus = calculateHeadroomStatus(headroomPercent);
  const ctaUrl = injector.link;
  const ctaLabel = injector.source === 'customer' ? 'Add to Quote' : 'View Product';
  const alternativeMessage = comparisonHeadroomPercent === undefined
    ? undefined
    : getAlternativeMessage(comparisonHeadroomPercent, headroomPercent);

  const handleCtaClick = () => {
    if (injector.source === 'customer') {
      onProductClick?.(injector.id);
    } else {
      onAffiliateClick?.(injector.id);
    }
  };

  return (
    <ProductRecommendationCard
      eyebrow={eyebrow}
      productName={injector.name}
      brand={injector.brand}
      status={headroomStatus}
      specs={[
        { label: 'Size', value: formatInjectorCc(injector.cc) },
        { label: 'Fuel', value: injector.fuels.map((fuel) => fuel === 'pump_gas' ? 'Pump Gas' : 'E85').join(' / ') },
        { label: 'Headroom', value: formatHeadroomPercent(headroomPercent) },
      ]}
      confidence={alternativeMessage?.description ?? getPrimaryConfidence('injector', headroomStatus, headroomPercent)}
      ctaLabel={ctaLabel}
      ctaUrl={ctaUrl}
      source={injector.source}
      onCtaClick={handleCtaClick}
      variant={variant}
      fitLabel={alternativeMessage?.label}
    />
  );
}
