import type { KegSize } from "./constants";
import type { KegCombinationResult } from "./types";

export function findBestKegCombination(
  requiredLiters: number,
  availableKegs: KegSize[]
): KegCombinationResult {
  if (availableKegs.length === 0) {
    return { combination: [], total: 0, surplus: 0, label: "Nenhum barril selecionado" };
  }

  const sorted = [...availableKegs].sort((a, b) => b - a);
  const maxKeg = sorted[0];
  const maxSearch = requiredLiters + maxKeg * 3;

  type Candidate = { combination: KegSize[]; total: number; surplus: number };
  const candidates: Candidate[] = [];

  function search(combo: KegSize[], startIdx: number, total: number) {
    if (total >= requiredLiters) {
      candidates.push({ combination: [...combo], total, surplus: total - requiredLiters });
      return;
    }
    if (total > maxSearch) return;
    // Limit depth to avoid exponential blowup on large volumes
    if (combo.length >= 10) return;

    for (let i = startIdx; i < sorted.length; i++) {
      combo.push(sorted[i]);
      search(combo, i, total + sorted[i]);
      combo.pop();
    }
  }

  search([], 0, 0);

  if (candidates.length === 0) {
    // Fallback: fill with largest keg until covered
    const fallback: KegSize[] = [];
    let total = 0;
    while (total < requiredLiters) {
      fallback.push(maxKeg);
      total += maxKeg;
    }
    return {
      combination: fallback,
      total,
      surplus: total - requiredLiters,
      label: formatKegLabel(fallback),
    };
  }

  candidates.sort((a, b) => {
    if (a.surplus !== b.surplus) return a.surplus - b.surplus;
    if (a.combination.length !== b.combination.length)
      return a.combination.length - b.combination.length;
    return b.total - a.total;
  });

  const best = candidates[0];
  return {
    combination: best.combination,
    total: best.total,
    surplus: best.surplus,
    label: formatKegLabel(best.combination),
  };
}

function formatKegLabel(combination: KegSize[]): string {
  if (combination.length === 0) return "—";
  const counts = new Map<number, number>();
  for (const keg of combination) {
    counts.set(keg, (counts.get(keg) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([size, qty]) => `${qty}x barril de ${size} L`)
    .join(" + ");
}
