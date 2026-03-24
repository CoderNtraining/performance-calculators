import { SelectHTMLAttributes } from 'react';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-0 ${props.className ?? ''}`}
      style={{
        borderColor: 'var(--border-strong)',
        backgroundColor: 'var(--bg-surface-muted)',
      }}
    />
  );
}
