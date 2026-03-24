'use client';

import { FormEvent, useState } from 'react';
import { formatDisplacementInput, formatNumber } from '@/lib/formatters';
import { calculateRecommendations } from '@/lib/recommendation';
import { validateInputs } from '@/lib/validation';
import { CalculationInput, CalculatorMode, CalculationResult } from '@/types/calculator';
import { CalculatorSelector } from '@/components/calculator/CalculatorSelector';
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
  selectedModes: ['turbo', 'fuel'],
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
  const [input, setInput] = useState<CalculationInput>(DEFAULT_INPUT);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const selectedModes = input.selectedModes;

  function toggleMode(mode: CalculatorMode) {
    setInput((prev: CalculationInput) => ({
      ...prev,
      selectedModes: prev.selectedModes.includes(mode)
        ? prev.selectedModes.filter((item) => item !== mode)
        : [...prev.selectedModes, mode],
    }));
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
    setErrors([]);
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 text-slate-100">
      <header className="space-y-2 mb-4">
        <div className="rounded-xl border border-cyan-400/30 bg-slate-900/70 p-4 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold tracking-tight">Automotive Performance Calculator Platform</h1>
          <p className="text-slate-300">Turbo sizing and fuel system sizing with modular calculator modes.</p>
        </div>
      </header>

      <Card>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Calculator Modules</h2>
            <CalculatorSelector selected={selectedModes} onToggle={toggleMode} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldRow label="Engine Displacement" info="Accepts liters or cubic inches. Ex: 5.3L, 6.0L, 408ci.">
              <Input
                value={input.engineDisplacement}
                onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, engineDisplacement: e.target.value }))}
                onBlur={() => setInput((prev: CalculationInput) => ({ ...prev, engineDisplacement: formatDisplacementInput(prev.engineDisplacement) }))}
                placeholder="5.3L or 408ci"
              />
            </FieldRow>

            <FieldRow label="Cylinder Count" info="Total number of cylinders in the engine.">
              <Input
                type="number"
                min={1}
                value={input.cylinderCount}
                onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, cylinderCount: Number(e.target.value) }))}
              />
            </FieldRow>
          </div>

          {selectedModes.includes('turbo') && (
            <div className="grid grid-cols-1 gap-4 border-t border-slate-800 pt-4 sm:grid-cols-2">
              <FieldRow label="Boost Pressure (PSI)" info="Target manifold pressure above atmospheric pressure.">
                <Input
                  type="number"
                  min={0}
                  value={input.boostPsi}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, boostPsi: Number(e.target.value) }))}
                />
              </FieldRow>

              <FieldRow label="Max RPM" info="Maximum RPM where the engine is expected to make peak airflow.">
                <Input
                  type="number"
                  min={1000}
                  value={input.maxRpm}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, maxRpm: Number(e.target.value) }))}
                />
              </FieldRow>

              <FieldRow label="Volumetric Efficiency (%)" info="Estimated VE at the target RPM and boost conditions.">
                <Input
                  type="number"
                  min={1}
                  max={120}
                  value={input.volumetricEfficiency}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, volumetricEfficiency: Number(e.target.value) }))}
                />
              </FieldRow>
            </div>
          )}

          {selectedModes.includes('fuel') && (
            <div className="grid grid-cols-1 gap-4 border-t border-slate-800 pt-4 sm:grid-cols-2">
              <FieldRow label="Horsepower Type" info="Choose whether your input horsepower is crank or wheel horsepower.">
                <Select
                  value={input.horsepowerType}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, horsepowerType: e.target.value as 'crank' | 'rwhp' }))}
                >
                  <option value="crank">Crank HP</option>
                  <option value="rwhp">Wheel HP (RWHP)</option>
                </Select>
              </FieldRow>

              <FieldRow label="Horsepower" info="Enter the target horsepower value for fuel system sizing.">
                <Input
                  type="number"
                  min={1}
                  value={input.horsepower}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, horsepower: Number(e.target.value) }))}
                />
              </FieldRow>

              <FieldRow label="Drivetrain" info="Used to estimate crank horsepower when RWHP is selected.">
                <Select
                  value={input.drivetrain}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, drivetrain: e.target.value as 'manual' | 'auto' }))}
                >
                  <option value="manual">Manual (15% loss)</option>
                  <option value="auto">Auto (18% loss)</option>
                </Select>
              </FieldRow>

              <FieldRow label="Fuel Type" info="Fuel type determines assumed BSFC used in calculations.">
                <Select
                  value={input.fuelType}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, fuelType: e.target.value as 'pump_gas' | 'e85' }))}
                >
                  <option value="pump_gas">Pump Gas</option>
                  <option value="e85">E85</option>
                </Select>
              </FieldRow>

              <FieldRow label="Base Fuel Pressure (psi)" info="Injector flow is normalized around 43.5 psi and adjusted by pressure ratio.">
                <Input
                  type="number"
                  min={1}
                  step="0.1"
                  value={input.baseFuelPressure}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, baseFuelPressure: Number(e.target.value) }))}
                />
              </FieldRow>

              <FieldRow label="Injector Duty Cycle (%)" info="Use realistic duty cycle targets. Above 90% is generally unsafe.">
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={input.injectorDutyCycle}
                  onChange={(e) => setInput((prev: CalculationInput) => ({ ...prev, injectorDutyCycle: Number(e.target.value) }))}
                />
              </FieldRow>
            </div>
          )}

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
          {result.fuel && (
            <Card className="border-emerald-700/60">
              <h2 className="text-lg font-semibold text-emerald-300">Estimated Crank Horsepower</h2>
              <p className="mt-1 text-2xl font-bold">{formatNumber(result.fuel.estimatedCrankHp)} hp</p>
            </Card>
          )}

          {result.turbo && (
            <>
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
            </>
          )}

          {result.turbo?.fallbackSpecs && (
            <div>
              <h2 className="text-xl font-semibold text-amber-300 mb-4">Minimum Required Turbo Specifications</h2>
              <TurboSpecFallbackCard fallback={result.turbo.fallbackSpecs} />
            </div>
          )}

          {result.fuel && (
            <div>
              <h2 className="text-xl font-semibold text-emerald-300 mb-4">Injector Recommendation</h2>
              <InjectorRecommendationCard fuelResult={result.fuel} />
            </div>
          )}

          {result.fuel && (
            <div>
              <h2 className="text-xl font-semibold text-emerald-300 mb-4">Fuel System Recommendation</h2>
              <FuelSystemRecommendationCard fuelResult={result.fuel} />
            </div>
          )}

          <WarningList warnings={result.warnings} />
        </section>
      )}
    </div>
  );
}
