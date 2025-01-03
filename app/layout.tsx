import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./_components/Sidebar/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      </body>
    </html>
  );
}
