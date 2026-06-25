import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de Chopp por Pessoa — Quantos Litros Comprar",
  description:
    "Calcule quantos litros de chopp, barris, copos e gelo comprar para festa, churrasco, aniversário ou confraternização.",
  openGraph: {
    title: "Calculadora de Chopp por Pessoa — Quantos Litros Comprar",
    description:
      "Calcule quantos litros de chopp, barris, copos e gelo comprar para festa, churrasco, aniversário ou confraternização.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
