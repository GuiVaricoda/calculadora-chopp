export const EVENT_TYPES = [
  { id: "churrasco", label: "Churrasco", multiplier: 1.2 },
  { id: "festa", label: "Festa", multiplier: 1.0 },
  { id: "aniversario", label: "Aniversário", multiplier: 0.95 },
  { id: "confraternizacao", label: "Confraternização", multiplier: 0.9 },
] as const;

export type EventTypeId = (typeof EVENT_TYPES)[number]["id"];

export const DURATIONS = [
  { id: "2h", label: "2 horas", multiplier: 0.8 },
  { id: "3h", label: "3 horas", multiplier: 1.0 },
  { id: "4h", label: "4 horas", multiplier: 1.15 },
  { id: "5h+", label: "5h ou mais", multiplier: 1.3 },
] as const;

export type DurationId = (typeof DURATIONS)[number]["id"];

export const TEMPERATURES = [
  { id: "amena", label: "Amena", sublabel: "até 22°C", multiplier: 1.0, iceKgPerPerson: 1.0 },
  { id: "quente", label: "Quente", sublabel: "23–30°C", multiplier: 1.2, iceKgPerPerson: 1.5 },
  { id: "muito_quente", label: "Muito quente", sublabel: "acima de 30°C", multiplier: 1.4, iceKgPerPerson: 2.0 },
] as const;

export type TemperatureId = (typeof TEMPERATURES)[number]["id"];

export const CUP_SIZES = [
  { id: "200", label: "200 ml", ml: 200 },
  { id: "300", label: "300 ml", ml: 300 },
  { id: "350", label: "350 ml", ml: 350 },
  { id: "500", label: "500 ml", ml: 500 },
  { id: "700", label: "Caneca 700 ml", ml: 700 },
] as const;

export type CupSizeId = (typeof CUP_SIZES)[number]["id"];

export const KEG_SIZES = [10, 20, 30, 50, 100] as const;

export type KegSize = (typeof KEG_SIZES)[number];

export const EXTRA_OPTIONS = [
  { id: "water", label: "Água mineral" },
  { id: "soda", label: "Refrigerante" },
  { id: "juice", label: "Suco / sem álcool" },
  { id: "spirits", label: "Destilado (shots)" },
] as const;

export type ExtraId = (typeof EXTRA_OPTIONS)[number]["id"];

export const HEAVY_DRINKER_LITERS = 1.2;
export const MODERATE_DRINKER_LITERS = 0.75;
export const SAFETY_MARGIN = 1.1;
export const ICE_PACKAGE_KG = 5;
