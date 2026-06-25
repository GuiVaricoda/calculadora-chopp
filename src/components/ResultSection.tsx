"use client";

import type { CalcResult, FormState } from "@/lib/types";
import { ICE_PACKAGE_KG } from "@/lib/constants";
import ShoppingList from "./ShoppingList";

interface ResultSectionProps {
  result: CalcResult;
  form: FormState;
}

interface ResultCardProps {
  title: string;
  value: string;
  unit?: string;
  note?: string;
}

function ResultCard({ title, value, unit, note }: ResultCardProps) {
  return (
    <div className="result-card">
      <p className="result-card__title">{title}</p>
      <p className="result-card__value">
        {value}
        {unit && <span className="result-card__unit"> {unit}</span>}
      </p>
      {note && <p className="result-card__note">{note}</p>}
    </div>
  );
}

export default function ResultSection({ result, form }: ResultSectionProps) {
  return (
    <section aria-labelledby="result-title" className="result-section">
      <h2 id="result-title" className="section-title">
        Resultado da sua lista de chopp
      </h2>

      {/* Resumo textual */}
      <div className="result-summary" role="region" aria-label="Resumo do cálculo">
        <p>{result.summaryText}</p>
      </div>

      {/* Cards principais */}
      <div className="result-grid">
        <ResultCard
          title="Total de chopp"
          value={String(result.finalLiters)}
          unit="litros"
          note={`Consumo médio: ${result.litersPerPerson} L/pessoa`}
        />
        <ResultCard
          title="Copos necessários"
          value={String(result.cups)}
          unit={`copos de ${result.cupSizeLabel}`}
        />
        <ResultCard
          title="Gelo necessário"
          value={String(result.iceKg)}
          unit="kg"
          note={`${result.icePackages} pacotes de ${ICE_PACKAGE_KG} kg`}
        />
      </div>

      {/* Barris */}
      <div className="result-kegs">
        <h3 className="result-block__title">Sugestão de barris</h3>
        <p className="result-kegs__label">{result.kegs.label}</p>
        <p className="result-kegs__detail">
          Total: {result.kegs.total} L &nbsp;·&nbsp; Sobra estimada: {result.kegs.surplus} L
        </p>
      </div>

      {/* Extras */}
      {result.extras.length > 0 ? (
        <div className="result-extras">
          <h3 className="result-block__title">Bebidas extras</h3>
          <ul className="result-extras__list">
            {result.extras.map((extra) => (
              <li key={extra.id} className="result-extras__item">
                <span className="result-extras__name">{extra.label}:</span>{" "}
                <span className="result-extras__value">{extra.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="result-extras">
          <h3 className="result-block__title">Bebidas extras</h3>
          <p className="result-extras__empty">Nenhum extra selecionado.</p>
        </div>
      )}

      {/* Avisos */}
      <div className="result-notice" role="note">
        <p className="result-notice__margin">
          A recomendação já inclui margem de segurança de 10%.
        </p>
        <p className="result-notice__disclaimer">
          Os valores são estimativas para planejamento. Confirme disponibilidade, política de
          devolução e recomendação final com seu fornecedor de chopp.
        </p>
      </div>

      {/* Lista de compra */}
      <ShoppingList result={result} form={form} />
    </section>
  );
}
