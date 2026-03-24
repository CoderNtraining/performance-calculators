'use client';

import { FormEvent, useState } from 'react';
import { formatDisplacementInput, formatNumber } from '@/lib/formatters';
import { parseEngineDisplacement } from '@/lib/parsing';
import { calculateRecommendations } from '@/lib/recommendation';
import { validateInputs } from '@/lib/validation';
import { CalculationInput, CalculatorMode, CalculationResult, SizingMode } from '@/types/calculator';
import { FieldRow } from '@/components/calculator/FieldRow';
import { FuelSystemRecommendationCard } from '@/components/calculator/FuelSystemRecommendationCard';
import { InjectorRecommendationCard } from '@/components/calculator/InjectorRecommendationCard';
import { TurboRecommendationCard } from '@/components/calculator/TurboRecommendationCard';
import { TurboSpecFallbackCard } from '@/components/calculator/TurboSpecFallbackCard';
import { WarningList } from '@/components/calculator/WarningList';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const DEFAULT_INPUT: CalculationInput = {
  selectedModes: ['turbo'],
  sizingMode: 'hp',
  engineDisplacement: '5.3L',
  cylinderCount: 8,
  boostPsi: 15,
  maxRpm: 6500,
  volumetricEfficiency: 90,
  horsepowerType: 'crank',
  horsepower: 700,
  drivetrain: 'manual',
  fuelType: 'pump_gas',
  baseFuelPressure: 43.5,
  injectorDutyCycle: 85,
};

export default function HomePage() {
  const brandName = 'Your Company'; // Optional: set to '' for no brand
  const poweredBy = 'Performance Calculations';

  const [input, setInput] = useState<CalculationInput>(DEFAULT_INPUT);
  const [activeTab, setActiveTab] = useState<CalculatorMode>('turbo');
  const [sizingMode, setSizingMode] = useState<SizingMode>('hp');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const selectedModes: CalculatorMode[] = [activeTab];
  const displacementParsed = parseEngineDisplacement(input.engineDisplacement);
  const normalizedDisplacement = displacementParsed
    ? `${formatNumber(displacementParsed.liters, 2)}L / ${Math.round(displacementParsed.cubicInches)}ci`
    : null;

  function toggleMode(mode: CalculatorMode) {
    setActiveTab(mode);
    setInput((prev: CalculationInput) => ({ ...prev, selectedModes: [mode] }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const validationErrors = validateInputs(input);
    setErrors(validationErrors);
    if (validationErrors.length) {
      setResult(null);
      return;
    }

    setResult(calculateRecommendations(input));
  }

  function onReset() {
    setInput(DEFAULT_INPUT);
    setActiveTab('turbo');
    setSizingMode('hp');
    setShowAdvanced(false);
    setErrors([]);
    setResult(null);
  }

  return (
    <div className="min-h-screen p-6 text-slate-100 antialiased" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <header className="space-y-2 mb-4">
        <div className="rounded-xl border border-cyan-400/30 bg-slate-900/70 p-4 shadow-xl backdrop-blur" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--surface)' }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {brandName && <div>
              <h1 className="text-3xl font-bold tracking-tight">{brandName}</h1>
              <p className="text-slate-400 text-sm">Professional performance tuning tools for your customers.</p>
            </div>}
            <div className="text-xs text-slate-400">Powered by {poweredBy}</div>
          </div>
          <p className="mt-3 text-slate-300">Turbo and fuel system-sizing calculator with buyer-friendly conversion focus.</p>
        </div>
      </header>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Sizing Mode</h2>
        <div className="inline-flex rounded-xl border border-slate-700 bg-slate-900/80 p-1 text-sm" style={{ borderColor: 'var(--muted)', backgroundColor: 'var(--surface)' }}>
          <button
            type="button"
            onClick={() => setSizingMode('hp')}
            className={`rounded-lg px-3 py-2 ${sizingMode === 'hp' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            style={sizingMode === 'hp' ? { backgroundColor: 'var(--accent)', color: 'white' } : { color: 'var(--text)' }}
            aria-selected={sizingMode === 'hp'}
          >
            Size by HP Goal
          </button>
          <button
            type="button"
            onClick={() => setSizingMode('boost')}
            className={`rounded-lg px-3 py-2 ${sizingMode === 'boost' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            style={sizingMode === 'boost' ? { backgroundColor: 'var(--accent2)', color: 'white' } : { color: 'var(--text)' }}
            aria-selected={sizingMode === 'boost'}
          >
            Size by Boost Goal
          </button>
        </div>
      </div>

      <Card>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Calculator Mode</h2>
            <div className="inline-flex rounded-xl border border-slate-700 bg-slate-900/80 p-1 text-sm">
              <button
                type="button"
                onClick={() => toggleMode('turbo')}
                className={`rounded-lg px-3 py-2 ${activeTab === 'turbo' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                aria-selected={activeTab === 'turbo'}
              >
                Turbo Sizing
              </button>
              <button
                type="button"
                onClick={() => toggleMode('fuel')}
                className={`rounded-lg px-3 py-2 ${activeTab === 'fuel' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                aria-selected={activeTab === 'fuel'}
              >
                Fuel System
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4" style={{ borderColor: 'var(--muted)', backgroundColor: 'var(--surface)' }}>
            <h3 className="text-sm font-semibold text-slate-100">Quick Inputs</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldRow label="Engine Displacement" info="Accepts liters or cubic inches. Ex: 5.3L, 408ci.">
                <div className="space-y-1">
                  <Input
                    value={input.engineDisplacement}
                    onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, engineDisplacement: e.target.value }))}
                    onBlur={() => setInput((prev: CalculationInput) => ({ ...prev, engineDisplacement: formatDisplacementInput(prev.engineDisplacement) }))}
                    placeholder="5.3L or 408ci"
                    aria-label="Engine displacement"
                  />
                  {parseEngineDisplacement(input.engineDisplacement) ? (
                    <p className="text-xs text-slate-400">
                      Normalized: {formatNumber(parseEngineDisplacement(input.engineDisplacement)!.liters, 2)}L / {Math.round(parseEngineDisplacement(input.engineDisplacement)!.cubicInches)}ci
                    </p>
                  ) : (
                    <p className="text-xs text-amber-400">Enter displacement like 5.3, 5.3L, 408, or 408ci.</p>
                  )}
                </div>
              </FieldRow>

              {(activeTab === 'fuel' || (activeTab === 'turbo' && sizingMode === 'hp')) && (
                <FieldRow label="Horsepower" info="Target power value for this build.">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={3000}
                      value={input.horsepower}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, horsepower: Number(e.target.value) }))}
                    />
                    <Select
                      value={input.horsepowerType}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, horsepowerType: e.target.value as 'crank' | 'rwhp' }))}
                      aria-label="Horsepower type"
                    >
                      <option value="crank">Crank HP</option>
                      <option value="rwhp">Wheel HP</option>
                    </Select>
                  </div>
                </FieldRow>
              )}

              {activeTab === 'turbo' && sizingMode === 'hp' && (
                <FieldRow label="Drivetrain" info="Used to approximate crank-to-wheel conversion for RWHP.">
                  <Select
                    value={input.drivetrain}
                    onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, drivetrain: e.target.value as 'manual' | 'auto' }))}
                  >
                    <option value="manual">Manual (15% loss)</option>
                    <option value="auto">Auto (18% loss)</option>
                  </Select>
                </FieldRow>
              )}

              {activeTab === 'turbo' && sizingMode === 'boost' && (
                <FieldRow label="Boost Pressure (PSI)" info="Target manifold pressure above atmospheric pressure.">
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    value={input.boostPsi}
                    onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, boostPsi: Number(e.target.value) }))}
                  />
                </FieldRow>
              )}

              <FieldRow label="Fuel Type" info="Fuel type influences injector and system recommendations.">
                <Select
                  value={input.fuelType}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, fuelType: e.target.value as 'pump_gas' | 'e85' }))}
                >
                  <option value="pump_gas">Pump Gas</option>
                  <option value="e85">E85</option>
                </Select>
              </FieldRow>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4" style={{ borderColor: 'var(--muted)', backgroundColor: 'var(--surface)' }}>
            <button
              type="button"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-left text-sm font-semibold text-slate-200 hover:bg-slate-700"
              style={{ borderColor: 'var(--muted)', backgroundColor: 'var(--surface)', color: 'var(--text)' }}
              aria-expanded={showAdvanced}
            >
              {showAdvanced ? 'Hide Advanced Inputs' : 'Show Advanced Inputs'}
            </button>
            {showAdvanced && (
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldRow label="Cylinder Count" info="Total cylinder count for airflow and injector sizing.">
                  <Input
                    type="number"
                    min={1}
                    value={input.cylinderCount}
                    onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, cylinderCount: Number(e.target.value) }))}
                  />
                </FieldRow>

                <FieldRow label="Max RPM" info="Engine redline; impacts turbo airflow estimation.">
                  <Input
                    type="number"
                    min={1000}
                    max={12000}
                    value={input.maxRpm}
                    onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, maxRpm: Number(e.target.value) }))}
                  />
                </FieldRow>

                <FieldRow label="Volumetric Efficiency (VE)" info="Use industry ballpark 80-90% for street engines.">
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={40}
                      max={120}
                      step={1}
                      value={input.volumetricEfficiency}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, volumetricEfficiency: Number(e.target.value) }))}
                      aria-label="Volumetric efficiency"
                    />
                    <Input
                      type="number"
                      min={40}
                      max={120}
                      value={input.volumetricEfficiency}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, volumetricEfficiency: Number(e.target.value) }))}
                    />
                  </div>
                </FieldRow>

                <FieldRow label="Injector Duty Cycle (%)" info="Recommended 65-80%. Stay below 90% for reliability.">
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={50}
                      max={100}
                      step={1}
                      value={input.injectorDutyCycle}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, injectorDutyCycle: Number(e.target.value) }))}
                      aria-label="Injector duty cycle"
                    />
                    <Input
                      type="number"
                      min={50}
                      max={100}
                      value={input.injectorDutyCycle}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, injectorDutyCycle: Number(e.target.value) }))}
                    />
                  </div>
                </FieldRow>

                <FieldRow label="Base Fuel Pressure (psi)" info="Base rail pressure for injector flow correction.">
                  <Input
                    type="number"
                    min={20}
                    max={60}
                    step={0.1}
                    value={input.baseFuelPressure}
                    onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, baseFuelPressure: Number(e.target.value) }))}
                  />
                </FieldRow>

                {activeTab === 'turbo' && sizingMode === 'hp' && (
                  <FieldRow label="Boost Pressure (PSI)" info="Target manifold pressure above atmospheric pressure.">
                    <Input
                      type="number"
                      min={0}
                      max={50}
                      value={input.boostPsi}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, boostPsi: Number(e.target.value) }))}
                    />
                  </FieldRow>
                )}

                {activeTab === 'turbo' && sizingMode === 'boost' && (
                  <FieldRow label="Horsepower" info="Target power value for this build.">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={3000}
                        value={input.horsepower}
                        onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, horsepower: Number(e.target.value) }))}
                      />
                      <Select
                        value={input.horsepowerType}
                        onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, horsepowerType: e.target.value as 'crank' | 'rwhp' }))}
                        aria-label="Horsepower type"
                      >
                        <option value="crank">Crank HP</option>
                        <option value="rwhp">Wheel HP</option>
                      </Select>
                    </div>
                  </FieldRow>
                )}

                {activeTab === 'fuel' && (
                  <FieldRow label="Boost Pressure (PSI)" info="Target manifold pressure above atmospheric pressure.">
                    <Input
                      type="number"
                      min={0}
                      max={50}
                      value={input.boostPsi}
                      onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, boostPsi: Number(e.target.value) }))}
                    />
                  </FieldRow>
                )}
              </div>
            )}
          </div>

          {errors.length > 0 && (
            <div className="rounded-lg border border-red-700/70 bg-red-950/50 p-3 text-sm text-red-200">
              <ul className="list-disc pl-5">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" className="bg-blue-700 hover:bg-blue-600">Calculate</Button>
            <Button type="button" onClick={onReset}>Reset</Button>
          </div>
        </form>
      </Card>

      {result && (
        <section className="space-y-6">
          {activeTab === 'turbo' && result.turbo && (
            <Card className="border-cyan-600/60" style={{ borderColor: 'var(--accent)' }}>
              <h2 className="text-lg font-semibold text-cyan-200">
                {sizingMode === 'hp' ? `Best-fit Turbo for ${input.horsepower} HP` : `Best-fit Turbo for ${input.boostPsi} PSI Boost`}
              </h2>
              <p className="mt-2 text-slate-300">
                {result.turbo.recommendedTurbos.length > 0
                  ? `Top recommendation is ${result.turbo.recommendedTurbos[0].name} with ${formatNumber(result.turbo.recommendedTurbos[0].airflowLbMin)} lb/min airflow.`
                  : 'No matching turbo found; review fallback specs below.'}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {sizingMode === 'hp'
                  ? `Estimated required airflow: ${formatNumber(result.turbo.requiredAirflowLbMin)} lb/min at ~15 PSI boost.`
                  : `Estimated required airflow: ${formatNumber(result.turbo.requiredAirflowLbMin)} lb/min at ${input.boostPsi} PSI boost.`}
              </p>
            </Card>
          )}

          {activeTab === 'fuel' && result.fuel && (
            <Card className="border-emerald-600/60" style={{ borderColor: 'var(--accent2)' }}>
              <h2 className="text-lg font-semibold text-emerald-200">Recommended Fuel System & Injectors for {input.horsepower} HP</h2>
              <p className="mt-2 text-slate-300">
                Injector target: {formatNumber(result.fuel.requiredInjectorCcMin)} cc/min. Fuel system capacity required: {result.fuel.fuelSystemRecommendation.maxHp} hp.
              </p>
              <p className="mt-1 text-sm text-slate-400">Keep at least 15% headroom for safe tuning margin.</p>
            </Card>
          )}

          {activeTab === 'turbo' && result.turbo && (
            <div>
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">Turbo Recommendations</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {result.turbo.recommendedTurbos.map((turbo) => (
                  <TurboRecommendationCard
                    key={turbo.id}
                    turbo={turbo}
                    requiredAirflow={result.turbo?.requiredAirflowLbMin}
                    estimatedHp={result.fuel?.estimatedCrankHp}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'turbo' && result.turbo?.fallbackSpecs && (
            <div>
              <h2 className="text-xl font-semibold text-amber-300 mb-4">Minimum Required Turbo Specifications</h2>
              <TurboSpecFallbackCard fallback={result.turbo.fallbackSpecs} />
            </div>
          )}

          {activeTab === 'fuel' && result.fuel && (
            <div className="space-y-4">
              <InjectorRecommendationCard fuelResult={result.fuel} />
              <FuelSystemRecommendationCard fuelResult={result.fuel} />
            </div>
          )}

          {result.warnings.length > 0 && <WarningList warnings={result.warnings} />}
        </section>
      )}
    </div>
  );
}
