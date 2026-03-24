'use client';

import { useState } from 'react';

export function InfoIcon({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label="More information"
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs transition hover:border-[var(--brand-primary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
        style={{ borderColor: 'var(--border-strong)', color: 'var(--text-muted)' }}
      >
        i
      </button>
      {open && (
        <div
          className="pointer-events-auto absolute left-7 top-1/2 z-20 w-64 -translate-y-1/2 rounded-xl border p-3 text-xs shadow-2xl"
          style={{
            borderColor: 'var(--border-strong)',
            backgroundColor: 'var(--bg-surface-elevated)',
            color: 'var(--text-secondary)',
          }}
        >
          <div>{text}</div>
          <button
            type="button"
            className="mt-2 text-xs font-medium"
            style={{ color: 'var(--brand-primary)' }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </span>
  );
}
