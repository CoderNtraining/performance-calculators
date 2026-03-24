import { FuelSystemProduct } from '@/types/products';

export const FUEL_SYSTEMS: FuelSystemProduct[] = [
  {
    id: 'fs-450',
    brand: 'FuelTech Systems',
    name: 'Dual 255 LPH In-Tank Return System',
    maxHp: 600,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Ideal for mild boosted street combinations with reliable pressure control.',
  },
  {
    id: 'fs-700',
    brand: 'FuelTech Systems',
    name: 'Triple 274 LPH Return System',
    maxHp: 900,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Balanced street/strip setup with robust headroom and multiple fuel compatibility.',
  },
  {
    id: 'fs-1000',
    brand: 'FuelTech Systems',
    name: 'Brushless Dual Pump Return System',
    maxHp: 1250,
    compatibleFuels: ['pump_gas', 'e85'],
    note: 'Designed for aggressive boosted applications with stable high-pressure operation.',
  },
  {
    id: 'fs-1500',
    brand: 'FuelTech Systems',
    name: 'Triple Brushless Competition System',
    maxHp: 1800,
    compatibleFuels: ['e85'],
    note: 'Race-oriented system for major airflow combinations and extreme power levels.',
  },
];
