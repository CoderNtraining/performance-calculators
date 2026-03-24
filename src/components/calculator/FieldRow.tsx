import { ReactNode } from 'react';
import { InfoIcon } from './InfoIcon';

export function FieldRow({ label, info, children }: { label: string; info: string; children: ReactNode }) {
  return (
    <label className="group block space-y-2">
      <span className="flex items-center text-sm font-medium text-[var(--text-secondary)]">
        {label}
        <InfoIcon text={info} />
      </span>
      {children}
    </label>
  );
}
