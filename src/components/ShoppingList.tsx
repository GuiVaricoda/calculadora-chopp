"use client";

import { useState } from "react";
import type { CalcResult } from "@/lib/types";
import type { FormState } from "@/lib/types";
import { buildShoppingListText } from "@/lib/calc";

interface ShoppingListProps {
  result: CalcResult;
  form: FormState;
}

export default function ShoppingList({ result, form }: ShoppingListProps) {
  const [copied, setCopied] = useState(false);

  const text = buildShoppingListText(result, form);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("Não foi possível copiar a lista. Selecione e copie manualmente.");
    }
  }

  function handleWhatsApp() {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="shopping-list">
      <h3 className="shopping-list__title">Lista de compra</h3>
      <pre className="shopping-list__text" aria-label="Lista de compra formatada">
        {text}
      </pre>
      <div className="shopping-list__actions">
        <button
          type="button"
          className={`btn ${copied ? "btn--success" : "btn--secondary"}`}
          onClick={handleCopy}
          aria-live="polite"
        >
          {copied ? "Lista copiada!" : "Copiar lista"}
        </button>
        <button
          type="button"
          className="btn btn--whatsapp"
          onClick={handleWhatsApp}
          aria-label="Enviar lista por WhatsApp"
        >
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  );
}
