import type { Metadata } from "next";
import { Oswald, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="pt-BR" className={`${oswald.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
