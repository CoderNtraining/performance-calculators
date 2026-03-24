import { FuelSystemProduct } from '@/types/products';

export const FUEL_SYSTEMS: FuelSystemProduct[] = [
  {
    id: 'fs-450',
    brand: "Your Company's Fuel System",
    name: 'Dual 255 LPH In-Tank Return System',
    maxHp: 600,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Ideal for mild boosted street combinations with reliable pressure control.',
    url: 'https://yourstore.com/product/dual-255-in-tank',
    affiliateUrl: 'https://affiliate.example.com/?product=dual-255-in-tank',
  },
  {
    id: 'fs-700',
    brand: "Your Company's Fuel System",
    name: 'Triple 325 LPH Return System',
    maxHp: 900,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Balanced street/strip setup with robust headroom and multiple fuel compatibility.',
  },
  {
    id: 'fs-1000',
    brand: "Your Company's Fuel System",
    name: 'Brushless Dual Pump Return System',
    maxHp: 1250,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Designed for aggressive boosted applications with stable high-pressure operation.',
  },
  {
    id: 'fs-1500',
    brand: "Your Company's Fuel System",
    name: 'Triple Brushless Competition System',
    maxHp: 1800,
    compatibleFuels: ['e85'],
    note: 'Race-oriented system for major airflow combinations and extreme power levels.',
  },
];
