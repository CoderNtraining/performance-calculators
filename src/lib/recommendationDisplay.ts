import { HeadroomStatus } from '@/lib/calculators/shared';
import { ProductSource } from '@/types/products';

export type RecommendationKind = 'turbo' | 'injector' | 'fuelSystem';

export interface AlternativeMessage {
  label: 'Future-Proof Option' | 'Tighter Fit';
  description: string;
}

export function getHeadroomPercent(capacity: number, required: number): number {
  if (required <= 0) return 0;
  return ((capacity - required) / required) * 100;
}

export function getStatusStyles(status: HeadroomStatus) {
  switch (status) {
    case 'Excellent Fit':
      return {
        text: 'text-[var(--success)]',
      };
    case 'Good Fit':
      return {
        text: 'text-[var(--brand-primary)]',
      };
    case 'Near Limit':
      return {
        text: 'text-[var(--warning)]',
      };
    case 'Undersized':
      return {
        text: 'text-[var(--danger)]',
      };
  }
}

export function getProductSourceLabel(source: ProductSource) {
  return source === 'customer' ? 'In-House Product' : 'Partner Product';
}

export function getSummaryConfidence(status: HeadroomStatus): string {
  switch (status) {
    case 'Excellent Fit':
      return 'This recommendation is a strong match for your goal with extra room to grow.';
    case 'Good Fit':
      return 'This recommendation is a strong match for your stated goal with room to grow.';
    case 'Near Limit':
      return 'This recommendation can work for your goal, but leaves less tuning margin.';
    case 'Undersized':
      return 'This recommendation is below your target, so a larger option is the safer path.';
  }
}

export function getPrimaryConfidence(kind: RecommendationKind, status: HeadroomStatus, headroomPercent: number): string {
  if (status === 'Excellent Fit') {
    return kind === 'turbo'
      ? 'Extra headroom for future upgrades without giving up confidence today.'
      : 'Extra headroom for future upgrades with a safe operating margin.';
  }

  if (status === 'Good Fit') {
    return kind === 'turbo'
      ? 'Best match for your current power target.'
      : 'Good choice for a safe, reliable setup.';
  }

  if (status === 'Near Limit') {
    return headroomPercent >= 0
      ? 'This can support your goal, but leaves less tuning margin.'
      : 'This setup is too close to the limit for a confident recommendation.';
  }

  return kind === 'turbo'
    ? 'This option is undersized for the goal you entered.'
    : 'This option falls short of the fuel support your setup needs.';
}

export function getAlternativeMessage(primaryHeadroomPercent: number, alternativeHeadroomPercent: number): AlternativeMessage {
  if (alternativeHeadroomPercent > primaryHeadroomPercent) {
    return {
      label: 'Future-Proof Option',
      description: 'Planning to grow later? This option provides more headroom.',
    };
  }

  return {
    label: 'Tighter Fit',
    description: 'This option can work for your goal, but leaves less tuning margin.',
  };
}
