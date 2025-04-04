import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./_components/Sidebar/Sidebar";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "STOCKLY - Gerencie suas vendas",
  description:
    "Com o Stockly você pode gerenciar a venda de seus produtos de forma rápida e eficaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
