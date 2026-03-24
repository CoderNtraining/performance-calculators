import { HeadroomStatus } from '@/lib/calculators/shared';

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
        badge: 'bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/25',
        text: 'text-emerald-300',
      };
    case 'Good Fit':
      return {
        badge: 'bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/25',
        text: 'text-sky-300',
      };
    case 'Near Limit':
      return {
        badge: 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/25',
        text: 'text-amber-300',
      };
    case 'Undersized':
      return {
        badge: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/25',
        text: 'text-rose-300',
      };
  }
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
