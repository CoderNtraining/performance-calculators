import { SelectHTMLAttributes } from 'react';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-blue-400 transition focus:ring ${props.className ?? ''}`}
    />
  );
}
