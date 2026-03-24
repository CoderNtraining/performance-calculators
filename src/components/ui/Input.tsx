import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-0 ${props.className ?? ''}`}
      style={{
        borderColor: 'var(--border-strong)',
        backgroundColor: 'var(--bg-surface-muted)',
      }}
    />
  );
}
