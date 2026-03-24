import { FuelSystemProduct } from '@/types/products';
import { brandingConfig } from '@/config/branding';

export const FUEL_SYSTEMS: FuelSystemProduct[] = [
  {
    id: 'fs-450',
    brand: brandingConfig.demoInHouseLabel,
    name: 'Dual 255 LPH In-Tank Return System',
    maxHp: 600,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Ideal for mild boosted street combinations with reliable pressure control.',
    source: 'customer',
    link: 'https://yourstore.com/product/dual-255-in-tank',
  },
  {
    id: 'fs-700',
    brand: 'Partner Fuel System',
    name: 'Triple 325 LPH Return System',
    maxHp: 900,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Balanced street/strip setup with robust headroom and multiple fuel compatibility.',
    source: 'affiliate',
    link: 'https://affiliate.example.com/?product=triple-325-return',
    affiliateProvider: 'custom',
  },
  {
    id: 'fs-1000',
    brand: brandingConfig.demoInHouseLabel,
    name: 'Brushless Dual Pump Return System',
    maxHp: 1250,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Designed for aggressive boosted applications with stable high-pressure operation.',
    source: 'customer',
    link: 'https://yourstore.com/product/brushless-dual-pump',
  },
  {
    id: 'fs-1500',
    brand: 'Partner Fuel System',
    name: 'Triple Brushless Competition System',
    maxHp: 1800,
    compatibleFuels: ['e85'],
    note: 'Race-oriented system for major airflow combinations and extreme power levels.',
    source: 'affiliate',
    link: 'https://affiliate.example.com/?product=triple-brushless-competition',
    affiliateProvider: 'custom',
  },
];
