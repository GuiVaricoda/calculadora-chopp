import {
  EVENT_TYPES,
  DURATIONS,
  TEMPERATURES,
  CUP_SIZES,
  EXTRA_OPTIONS,
  HEAVY_DRINKER_LITERS,
  MODERATE_DRINKER_LITERS,
  SAFETY_MARGIN,
  ICE_PACKAGE_KG,
} from "./constants";
import { findBestKegCombination } from "./kegs";
import type { FormState, CalcResult, ExtraResult } from "./types";

export function calculate(form: FormState): CalcResult {
  const guests = parseInt(form.guests, 10);

  const eventConfig = EVENT_TYPES.find((e) => e.id === form.eventType)!;
  const durationConfig = DURATIONS.find((d) => d.id === form.duration)!;
  const tempConfig = TEMPERATURES.find((t) => t.id === form.temperature)!;
  const cupConfig = CUP_SIZES.find((c) => c.id === form.cupSize)!;

  const heavyPeople = guests * (form.heavyPercent / 100);
  const moderatePeople = guests * (form.moderatePercent / 100);
  const nonDrinkers = guests * (form.nonDrinkerPercent / 100);
  const drinkingPeople = heavyPeople + moderatePeople;

  const baseLiters = heavyPeople * HEAVY_DRINKER_LITERS + moderatePeople * MODERATE_DRINKER_LITERS;

  const adjustedLiters =
    baseLiters *
    eventConfig.multiplier *
    durationConfig.multiplier *
    tempConfig.multiplier;

  const finalLiters = Math.ceil(adjustedLiters * SAFETY_MARGIN);

  const litersPerPerson = Math.round((finalLiters / guests) * 100) / 100;

  const cups = Math.ceil((finalLiters * 1000) / cupConfig.ml);

  const iceKg = Math.ceil(guests * tempConfig.iceKgPerPerson);
  const icePackages = Math.ceil(iceKg / ICE_PACKAGE_KG);

  const kegs = findBestKegCombination(finalLiters, form.selectedKegs);

  const extras: ExtraResult[] = form.selectedExtras.map((extraId) => {
    const extraOption = EXTRA_OPTIONS.find((e) => e.id === extraId)!;
    let value = "";
    switch (extraId) {
      case "water": {
        const liters = Math.ceil(guests * 0.5);
        value = `${liters} L`;
        break;
      }
      case "soda": {
        const liters = Math.ceil(nonDrinkers * 0.4 + guests * 0.15);
        value = `${liters} L`;
        break;
      }
      case "juice": {
        const liters = Math.ceil(nonDrinkers * 0.3);
        value = `${liters} L`;
        break;
      }
      case "spirits": {
        const liters = Math.ceil((drinkingPeople * 2 * 50) / 1000);
        value = `${liters} L (~${Math.round(drinkingPeople * 2)} doses de 50 ml)`;
        break;
      }
    }
    return { id: extraId, label: extraOption.label, value };
  });

  const summaryText =
    `Para ${guests} ${guests === 1 ? "pessoa" : "pessoas"} em um(a) ${eventConfig.label.toLowerCase()} de ${durationConfig.label.toLowerCase()}, ` +
    `recomendamos ${finalLiters} litros de chopp. ` +
    `Sugestão: ${kegs.label}. ` +
    `Sobra estimada: ${kegs.surplus} L. ` +
    `Você precisará de aproximadamente ${cups} copos de ${cupConfig.ml} ml e ${iceKg} kg de gelo (${icePackages} pacotes de ${ICE_PACKAGE_KG} kg).`;

  return {
    guests,
    eventTypeLabel: eventConfig.label,
    durationLabel: durationConfig.label,
    temperatureLabel: tempConfig.label,
    finalLiters,
    litersPerPerson,
    cups,
    cupSizeLabel: cupConfig.label,
    iceKg,
    icePackages,
    kegs,
    extras,
    summaryText,
  };
}

export function validate(form: FormState) {
  const errors: Record<string, string> = {};

  const guestsNum = parseInt(form.guests, 10);
  if (!form.guests || form.guests.trim() === "") {
    errors.guests = "Informe o número de convidados.";
  } else if (isNaN(guestsNum) || guestsNum < 1) {
    errors.guests = "O número de convidados deve ser maior que zero.";
  } else if (guestsNum > 10000) {
    errors.guests = "Número máximo de convidados é 10.000.";
  }

  const profileSum = form.heavyPercent + form.moderatePercent + form.nonDrinkerPercent;
  if (profileSum !== 100) {
    errors.profile = `A soma dos perfis deve ser 100% (atual: ${profileSum}%).`;
  }

  if (form.selectedKegs.length === 0) {
    errors.kegs = "Selecione pelo menos um tamanho de barril.";
  }

  return errors;
}

export function buildShoppingListText(result: CalcResult, form: FormState): string {
  const lines: string[] = [
    "=== LISTA DE COMPRA — CHOPP ===",
    "",
    `Evento: ${result.eventTypeLabel}`,
    `Convidados: ${result.guests}`,
    `Duração: ${result.durationLabel}`,
    `Temperatura: ${result.temperatureLabel}`,
    "",
    "--- CHOPP ---",
    `Total: ${result.finalLiters} litros`,
    `Consumo médio: ${result.litersPerPerson} L/pessoa`,
    `Barris: ${result.kegs.label}`,
    `Sobra estimada: ${result.kegs.surplus} L`,
    "",
    "--- COPOS ---",
    `${result.cups} copos de ${result.cupSizeLabel}`,
    "",
    "--- GELO ---",
    `${result.iceKg} kg (${result.icePackages} pacotes de ${ICE_PACKAGE_KG} kg)`,
  ];

  if (result.extras.length > 0) {
    lines.push("", "--- EXTRAS ---");
    for (const extra of result.extras) {
      lines.push(`${extra.label}: ${extra.value}`);
    }
  }

  lines.push(
    "",
    "* Inclui margem de segurança de 10%.",
    "* Confirme disponibilidade e política de devolução com seu fornecedor."
  );

  return lines.join("\n");
}
