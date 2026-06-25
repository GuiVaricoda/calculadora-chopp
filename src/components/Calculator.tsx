"use client";

import { useRef, useState } from "react";
import SegmentedButton from "./SegmentedButton";
import ProfileSliders from "./ProfileSliders";
import CheckboxCards from "./CheckboxCards";
import ResultSection from "./ResultSection";
import {
  EVENT_TYPES,
  DURATIONS,
  TEMPERATURES,
  CUP_SIZES,
  KEG_SIZES,
  EXTRA_OPTIONS,
} from "@/lib/constants";
import type { KegSize, ExtraId } from "@/lib/constants";
import type { FormState, CalcResult } from "@/lib/types";
import { calculate, validate } from "@/lib/calc";

const DEFAULT_FORM: FormState = {
  guests: "",
  eventType: "churrasco",
  duration: "3h",
  temperature: "quente",
  heavyPercent: 30,
  moderatePercent: 50,
  nonDrinkerPercent: 20,
  cupSize: "350",
  selectedKegs: [10, 20, 30, 50],
  selectedExtras: [],
};

export default function Calculator() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalcResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function handleCalculate() {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const res = calculate(form);
    setResult(res);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultRef.current?.focus();
    }, 50);
  }

  function handleReset() {
    setForm(DEFAULT_FORM);
    setErrors({});
    setResult(null);
  }

  const kegOptions = KEG_SIZES.map((size) => ({
    id: String(size),
    label: `${size} L`,
  }));

  return (
    <section aria-label="Calculadora de chopp" className="calculator">
      <h2 className="section-title">Calcule quantos litros de chopp comprar</h2>

      <div className="form-grid">
        {/* Tipo de evento */}
        <div className="form-block">
          <SegmentedButton
            legend="Tipo de evento"
            options={EVENT_TYPES}
            value={form.eventType}
            onChange={(v) => setField("eventType", v as FormState["eventType"])}
            name="eventType"
          />
        </div>

        {/* Convidados e duração */}
        <div className="form-block form-block--row">
          <div className="form-group">
            <label htmlFor="guests" className="field-label">
              Número de convidados
            </label>
            <input
              id="guests"
              type="number"
              inputMode="numeric"
              min={1}
              max={10000}
              value={form.guests}
              onChange={(e) => setField("guests", e.target.value)}
              placeholder="Ex: 50"
              className={`guests-input${errors.guests ? " guests-input--error" : ""}`}
              aria-describedby={errors.guests ? "guests-error" : undefined}
              aria-invalid={!!errors.guests}
            />
            {errors.guests && (
              <p id="guests-error" className="field-error" role="alert">
                {errors.guests}
              </p>
            )}
          </div>

          <SegmentedButton
            legend="Duração do evento"
            options={DURATIONS}
            value={form.duration}
            onChange={(v) => setField("duration", v as FormState["duration"])}
            name="duration"
          />
        </div>

        {/* Temperatura */}
        <div className="form-block">
          <SegmentedButton
            legend="Temperatura esperada"
            options={TEMPERATURES}
            value={form.temperature}
            onChange={(v) => setField("temperature", v as FormState["temperature"])}
            name="temperature"
          />
          <p className="field-hint">Dias quentes aumentam o consumo de chopp e de gelo.</p>
        </div>

        {/* Perfil dos convidados */}
        <div className="form-block">
          <ProfileSliders
            heavy={form.heavyPercent}
            moderate={form.moderatePercent}
            nonDrinker={form.nonDrinkerPercent}
            onChange={(h, m, n) => {
              setForm((prev) => ({
                ...prev,
                heavyPercent: h,
                moderatePercent: m,
                nonDrinkerPercent: n,
              }));
              if (errors.profile) setErrors((prev) => ({ ...prev, profile: "" }));
            }}
          />
          {errors.profile && (
            <p className="field-error" role="alert">
              {errors.profile}
            </p>
          )}
        </div>

        {/* Tamanho do copo */}
        <div className="form-block">
          <SegmentedButton
            legend="Tamanho do copo / caneca"
            options={CUP_SIZES}
            value={form.cupSize}
            onChange={(v) => setField("cupSize", v as FormState["cupSize"])}
            name="cupSize"
          />
        </div>

        {/* Barris disponíveis */}
        <div className="form-block">
          <CheckboxCards
            legend="Tamanhos de barril disponíveis"
            options={kegOptions}
            selected={form.selectedKegs.map(String)}
            onChange={(vals) =>
              setField("selectedKegs", vals.map(Number) as KegSize[])
            }
            hint="Marque os tamanhos de barril que seu fornecedor oferece."
            errorMessage={errors.kegs}
          />
        </div>

        {/* Extras */}
        <div className="form-block">
          <CheckboxCards
            legend="Bebidas extras (opcional)"
            options={EXTRA_OPTIONS}
            selected={form.selectedExtras}
            onChange={(vals) => setField("selectedExtras", vals as ExtraId[])}
          />
        </div>
      </div>

      {/* Ações */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleCalculate}
        >
          Calcular quantidade de chopp
        </button>
        {result && (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleCalculate}
          >
            Recalcular
          </button>
        )}
        <button
          type="button"
          className="btn btn--ghost"
          onClick={handleReset}
        >
          Limpar cálculo
        </button>
      </div>

      {/* Resultado */}
      {result && (
        <div
          ref={resultRef}
          tabIndex={-1}
          aria-live="polite"
          aria-label="Resultado do cálculo"
        >
          <ResultSection result={result} form={form} />
        </div>
      )}
    </section>
  );
}
