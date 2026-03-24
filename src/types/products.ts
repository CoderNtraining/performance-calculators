export type ProductSource = 'customer' | 'affiliate';
export type AffiliateProvider = 'amazon' | 'summit' | 'jegs' | 'custom';

export interface TurboProduct {
  id: string;
  brand: string;
  name: string;
  compressorInducerMm: number;
  compressorExducerMm?: number;
  turbineWheelOdMm?: number;
  turbineExducerMm?: number;
  airflowLbMin: number;
  horsepowerRangeMin: number;
  horsepowerRangeMax: number;
  arOptions: string[];
  note: string;
  recommendedUse: string;
  sourceFamily?: string;
  source: ProductSource;
  link: string;
  affiliateProvider?: AffiliateProvider;
}

export interface InjectorProduct {
  id: string;
  brand: string;
  name: string;
  cc: number;
  lbHr: number;
  fuels: Array<'pump_gas' | 'e85'>;
  note: string;
  source: ProductSource;
  link: string;
  affiliateProvider?: AffiliateProvider;
}

export interface FuelSystemProduct {
  id: string;
  brand: string;
  name: string;
  maxHp: number;
  compatibleFuels: Array<'pump_gas' | 'e85'>;
  note: string;
  source: ProductSource;
  link: string;
  affiliateProvider?: AffiliateProvider;
}
