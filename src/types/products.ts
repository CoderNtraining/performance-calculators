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
  url?: string;
  affiliateUrl?: string;
}

export interface InjectorProduct {
  id: string;
  brand: string;
  name: string;
  cc: number;
  lbHr: number;
  fuels: Array<'pump_gas' | 'e85'>;
  note: string;
  url?: string;
  affiliateUrl?: string;
}

export interface FuelSystemProduct {
  id: string;
  brand: string;
  name: string;
  maxHp: number;
  compatibleFuels: Array<'pump_gas' | 'e85'>;
  note: string;
  url?: string;
  affiliateUrl?: string;
}
