import { ReactNode } from 'react';

export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <section className={`rounded-xl border p-4 shadow-lg ${className}`} style={{ borderColor: 'var(--muted)', backgroundColor: 'var(--surface)', ...style }}>{children}</section>;
}
