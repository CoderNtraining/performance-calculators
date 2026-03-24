import { ReactNode } from 'react';

type CardVariant =
  | 'default'
  | 'summary'
  | 'recommendation-primary'
  | 'recommendation-secondary'
  | 'lead-capture'
  | 'informational';

const cardClasses: Record<CardVariant, string> = {
  default: 'bg-[var(--bg-surface)] border-[var(--border-subtle)]',
  summary:
    'border-[color:rgba(59,130,246,0.26)] bg-[linear-gradient(145deg,rgba(59,130,246,0.18),rgba(23,32,51,0.96)_38%,rgba(17,24,39,1)_100%)]',
  'recommendation-primary':
    'border-[color:rgba(56,189,248,0.22)] bg-[linear-gradient(180deg,rgba(59,130,246,0.1),rgba(23,32,51,0.97)_28%,rgba(17,24,39,1)_100%)]',
  'recommendation-secondary':
    'border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(148,163,184,0.04),rgba(17,24,39,0.98))]',
  'lead-capture':
    'border-[color:rgba(34,197,94,0.22)] bg-[linear-gradient(180deg,rgba(56,189,248,0.04),rgba(23,32,51,0.96))]',
  informational: 'border-[var(--border-subtle)] bg-[color:rgba(15,23,42,0.82)]',
};

const cardShadows: Record<CardVariant, string> = {
  default: 'var(--shadow-soft)',
  summary: 'var(--shadow-elevated)',
  'recommendation-primary': 'var(--shadow-elevated)',
  'recommendation-secondary': 'var(--shadow-soft)',
  'lead-capture': 'var(--shadow-soft)',
  informational: 'var(--shadow-soft)',
};

export function Card({
  children,
  className = '',
  style,
  variant = 'default',
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: CardVariant;
}) {
  return (
    <section
      className={`rounded-[26px] border p-5 md:p-6 ${cardClasses[variant]} ${className}`}
      style={{ boxShadow: cardShadows[variant], ...style }}
    >
      {children}
    </section>
  );
}
