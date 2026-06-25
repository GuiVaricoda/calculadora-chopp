import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";

const FAQ_ITEMS_FOR_SCHEMA = [
  {
    question: "Quanto chopp por pessoa devo calcular?",
    answer:
      "A regra geral é calcular entre 0,6 L e 1,2 L de chopp por pessoa que bebe, dependendo do perfil dos convidados, duração e clima. Nossa calculadora aplica automaticamente esses valores e adiciona 10% de margem de segurança.",
  },
  {
    question: "Quantas pessoas um barril de 30 litros atende?",
    answer:
      "Um barril de 30 litros atende aproximadamente 30 a 40 pessoas bebedoras moderadas em uma festa de 3 horas.",
  },
  {
    question: "Quantas pessoas um barril de 50 litros atende?",
    answer:
      "Um barril de 50 litros atende em torno de 50 a 65 pessoas moderadas em um evento padrão de 3 horas.",
  },
  {
    question: "Qual a temperatura ideal para servir chopp?",
    answer:
      "A temperatura ideal de serviço do chopp está entre 0°C e 2°C. Para manter essa temperatura durante o evento, você precisa de uma chopeira ou sistema de refrigeração adequado e bastante gelo.",
  },
  {
    question: "Quanto gelo preciso para o chopp?",
    answer:
      "Em clima ameno, calcule 1 kg por pessoa; em dia quente, 1,5 kg; e em dia muito quente, até 2 kg por pessoa.",
  },
  {
    question: "Vale mais a pena chopp ou cerveja em lata?",
    answer:
      "Para eventos com 20 pessoas ou mais, o chopp em barril costuma ser mais econômico por litro e oferece experiência melhor para grandes grupos.",
  },
  {
    question: "Como calcular chopp para churrasco?",
    answer:
      "Para churrascos, aplique um multiplicador de 20% a mais, pois o calor e a comida gordurosa tendem a aumentar o consumo. Use nossa calculadora selecionando 'Churrasco'.",
  },
  {
    question: "Barril aberto pode ser devolvido?",
    answer:
      "Na maioria dos casos, barris fechados podem ser devolvidos, mas barris abertos não. Confirme sempre a política de devolução com seu fornecedor antes do evento.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora de Chopp por Pessoa",
      description:
        "Calcule quantos litros de chopp, barris, copos e gelo comprar para festa, churrasco, aniversário ou confraternização.",
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS_FOR_SCHEMA.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Calculadora de Chopp",
          item: "/",
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page-main">
        {/* Hero */}
        <header className="hero">
          <div className="container">
            <h1 className="hero__title">Calculadora de Chopp por Pessoa</h1>
            <p className="hero__subtitle">
              Calcule quantos litros de chopp, barris, copos e gelo comprar para sua festa
            </p>
            <p className="hero__desc">
              Preencha os dados do seu evento abaixo e receba uma lista de compra completa
              em menos de 1 minuto.
            </p>
          </div>
        </header>

        {/* Como usar */}
        <section aria-labelledby="how-to-title" className="how-to container">
          <h2 id="how-to-title" className="section-title">
            Como usar a calculadora de chopp
          </h2>
          <ol className="how-to__list">
            <li>Selecione o tipo de evento e informe o número de convidados</li>
            <li>Escolha a duração e a temperatura esperada</li>
            <li>Ajuste o perfil dos convidados (quantos bebem bastante, moderadamente ou não bebem)</li>
            <li>Selecione o tamanho do copo e os barris disponíveis no seu fornecedor</li>
            <li>Clique em <strong>Calcular</strong> e receba sua lista de compra personalizada</li>
          </ol>
        </section>

        {/* Calculadora */}
        <div className="container">
          <Calculator />
        </div>

        {/* Recomendações */}
        <section aria-labelledby="tips-title" className="tips container">
          <h2 id="tips-title" className="section-title">
            Recomendações importantes
          </h2>
          <ul className="tips__list">
            <li>Peça sempre uma margem de segurança — a calculadora já inclui 10%.</li>
            <li>Confirme com o fornecedor se barris fechados podem ser devolvidos.</li>
            <li>Verifique a disponibilidade dos tamanhos de barril com antecedência.</li>
            <li>Ajuste os percentuais de perfil conforme o público real do seu evento.</li>
          </ul>
        </section>

        {/* FAQ */}
        <div className="container">
          <FAQ />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Calculadora de Chopp por Pessoa — Estimativas para planejamento de eventos.</p>
        </div>
      </footer>
    </>
  );
}
