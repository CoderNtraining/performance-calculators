import { ReactNode } from 'react';

type BadgeVariant =
  | 'fit-excellent'
  | 'fit-good'
  | 'fit-warning'
  | 'fit-danger'
  | 'source-in-house'
  | 'source-partner'
  | 'alternative'
  | 'future-proof'
  | 'tighter'
  | 'info';

const badgeStyles: Record<BadgeVariant, React.CSSProperties> = {
  'fit-excellent': {
    backgroundColor: 'rgba(34, 197, 94, 0.14)',
    borderColor: 'rgba(34, 197, 94, 0.24)',
    color: 'var(--success)',
  },
  'fit-good': {
    backgroundColor: 'rgba(59, 130, 246, 0.14)',
    borderColor: 'rgba(59, 130, 246, 0.24)',
    color: 'var(--brand-primary)',
  },
  'fit-warning': {
    backgroundColor: 'rgba(245, 158, 11, 0.14)',
    borderColor: 'rgba(245, 158, 11, 0.24)',
    color: 'var(--warning)',
  },
  'fit-danger': {
    backgroundColor: 'rgba(239, 68, 68, 0.14)',
    borderColor: 'rgba(239, 68, 68, 0.24)',
    color: 'var(--danger)',
  },
  'source-in-house': {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.22)',
    color: 'var(--text-primary)',
  },
  'source-partner': {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.22)',
    color: 'var(--text-primary)',
  },
  alternative: {
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.22)',
    color: 'var(--text-secondary)',
  },
  'future-proof': {
    backgroundColor: 'rgba(59, 130, 246, 0.14)',
    borderColor: 'rgba(59, 130, 246, 0.22)',
    color: 'var(--info)',
  },
  tighter: {
    backgroundColor: 'rgba(245, 158, 11, 0.14)',
    borderColor: 'rgba(245, 158, 11, 0.22)',
    color: 'var(--warning)',
  },
  info: {
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.2)',
    color: 'var(--text-secondary)',
  },
};

export function Badge({
  children,
  variant,
  className = '',
}: {
  children: ReactNode;
  variant: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${className}`}
      style={badgeStyles[variant]}
    >
      {children}
    </span>
  );
}
