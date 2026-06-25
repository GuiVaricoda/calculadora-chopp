import type { EventTypeId, DurationId, TemperatureId, CupSizeId, KegSize, ExtraId } from "./constants";

export interface FormState {
  guests: string;
  eventType: EventTypeId;
  duration: DurationId;
  temperature: TemperatureId;
  heavyPercent: number;
  moderatePercent: number;
  nonDrinkerPercent: number;
  cupSize: CupSizeId;
  selectedKegs: KegSize[];
  selectedExtras: ExtraId[];
}

export interface ExtraResult {
  id: ExtraId;
  label: string;
  value: string;
}

export interface KegCombinationResult {
  combination: KegSize[];
  total: number;
  surplus: number;
  label: string;
}

export interface CalcResult {
  guests: number;
  eventTypeLabel: string;
  durationLabel: string;
  temperatureLabel: string;
  finalLiters: number;
  litersPerPerson: number;
  cups: number;
  cupSizeLabel: string;
  iceKg: number;
  icePackages: number;
  kegs: KegCombinationResult;
  extras: ExtraResult[];
  summaryText: string;
}

export interface ValidationErrors {
  guests?: string;
  profile?: string;
  kegs?: string;
}
