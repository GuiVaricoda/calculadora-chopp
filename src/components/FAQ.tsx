"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Quanto chopp por pessoa devo calcular?",
    answer:
      "A regra geral é calcular entre 0,6 L e 1,2 L de chopp por pessoa que bebe, dependendo do perfil dos convidados, duração e clima. Para uma festa padrão de 3 horas com clima ameno, considere cerca de 0,75 L por bebedor moderado e 1,2 L por bebedor assíduo. Nossa calculadora aplica automaticamente esses valores e adiciona 10% de margem de segurança.",
  },
  {
    question: "Quantas pessoas um barril de 30 litros atende?",
    answer:
      "Um barril de 30 litros atende aproximadamente 30 a 40 pessoas bebedoras moderadas em uma festa de 3 horas. Esse número pode variar bastante de acordo com a duração do evento, temperatura e perfil dos convidados. Use a calculadora para uma estimativa personalizada.",
  },
  {
    question: "Quantas pessoas um barril de 50 litros atende?",
    answer:
      "Um barril de 50 litros atende em torno de 50 a 65 pessoas moderadas em um evento padrão de 3 horas. Para eventos mais longos, quentes ou com público mais assíduo, o número de pessoas por barril pode ser significativamente menor.",
  },
  {
    question: "Qual a temperatura ideal para servir chopp?",
    answer:
      "A temperatura ideal de serviço do chopp está entre 0°C e 2°C. Para manter essa temperatura durante o evento, você precisa de uma chopeira ou sistema de refrigeração adequado e bastante gelo. Em dias muito quentes, o consumo de gelo aumenta consideravelmente.",
  },
  {
    question: "Quanto gelo preciso para o chopp?",
    answer:
      "A quantidade de gelo depende da temperatura do dia. Em clima ameno, calcule 1 kg por pessoa; em dia quente, 1,5 kg; e em dia muito quente, até 2 kg por pessoa. Isso inclui o gelo para manter a chopeira gelada e para bebidas extras. Nossa calculadora estima o total automaticamente.",
  },
  {
    question: "Vale mais a pena chopp ou cerveja em lata?",
    answer:
      "Depende do contexto. O chopp em barril tende a ser mais econômico por litro e oferece experiência melhor para grandes grupos. Já a cerveja em lata não exige chopeira e tem menos risco de sobra, pois não precisa ser consumida imediatamente após aberta. Para eventos com 20 pessoas ou mais, o chopp costuma ser mais vantajoso.",
  },
  {
    question: "Como calcular chopp para churrasco?",
    answer:
      "Para churrascos, aplique um multiplicador de 20% a mais, pois o calor e a comida gordurosa tendem a aumentar o consumo de bebida. Considere também a duração — churrascos muitas vezes se estendem por 5 horas ou mais. Use nossa calculadora selecionando 'Churrasco' e ajustando o perfil dos convidados conforme o grupo.",
  },
  {
    question: "Barril aberto pode ser devolvido?",
    answer:
      "Na maioria dos casos, barris fechados podem ser devolvidos, mas barris abertos não. Por isso, é fundamental calcular bem a quantidade antes de pedir. Nossa calculadora busca minimizar a sobra sugerindo a combinação de barris mais eficiente. Confirme sempre a política de devolução com seu fornecedor antes do evento.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section aria-labelledby="faq-title" className="faq-section">
      <h2 id="faq-title" className="section-title">
        Perguntas frequentes sobre chopp
      </h2>
      <dl className="faq-list">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
              <dt>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => toggle(i)}
                >
                  <h3 className="faq-question__text">{item.question}</h3>
                  <span className="faq-question__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </dt>
              <dd
                id={`faq-answer-${i}`}
                className="faq-answer"
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
