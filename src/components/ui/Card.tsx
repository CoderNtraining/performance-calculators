import { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-slate-800 bg-panel p-4 shadow-lg ${className}`}>{children}</section>;
}
