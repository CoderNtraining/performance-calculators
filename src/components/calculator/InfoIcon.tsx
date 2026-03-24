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
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-500 text-xs text-slate-300 hover:border-slate-300"
      >
        i
      </button>
      {open && (
        <div className="pointer-events-auto absolute left-7 top-1/2 z-20 w-64 -translate-y-1/2 rounded-md border border-slate-600 bg-slate-900 p-2 text-xs text-slate-200 shadow-xl">
          <div>{text}</div>
          <button
            type="button"
            className="mt-2 text-xs text-blue-300"
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
