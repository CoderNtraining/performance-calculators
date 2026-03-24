import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const buttonClasses: Record<ButtonVariant, string> = {
  primary:
    'border-[color:rgba(59,130,246,0.35)] bg-[var(--brand-primary)] text-[var(--text-primary)] shadow-[0_18px_30px_rgba(37,99,235,0.22)] hover:bg-[var(--brand-primary-hover)] active:translate-y-0 active:scale-[0.99]',
  secondary:
    'border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:border-[color:rgba(96,165,250,0.35)] hover:bg-[color:rgba(23,32,51,0.92)] active:translate-y-0 active:scale-[0.99]',
  ghost:
    'border-[color:rgba(148,163,184,0.16)] bg-[color:rgba(15,23,42,0.45)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[color:rgba(15,23,42,0.75)] hover:text-[var(--text-primary)] active:translate-y-0',
};

export function Button({
  children,
  className = '',
  variant = 'secondary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      className={`rounded-xl border px-4 py-2.5 font-medium transition duration-150 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:border-[color:rgba(148,163,184,0.16)] disabled:bg-[color:rgba(15,23,42,0.45)] disabled:text-[var(--text-muted)] disabled:opacity-100 disabled:hover:translate-y-0 ${buttonClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
