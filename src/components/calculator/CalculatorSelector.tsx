import { CalculatorMode } from '@/types/calculator';

const OPTIONS: Array<{ value: CalculatorMode; label: string; color: string }> = [
  { value: 'turbo', label: 'Turbo Sizing', color: 'data-[active=true]:border-blue-500 data-[active=true]:text-blue-300' },
  { value: 'fuel', label: 'Fuel System', color: 'data-[active=true]:border-emerald-500 data-[active=true]:text-emerald-300' },
];

export function CalculatorSelector({ selected, onToggle }: { selected: CalculatorMode[]; onToggle: (mode: CalculatorMode) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((option) => {
        const active = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            data-active={active}
            onClick={() => onToggle(option.value)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${option.color} border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
