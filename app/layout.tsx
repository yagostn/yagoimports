import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/site-header";
import { CartProvider } from "@/lib/use-cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Styllo Biquinis",
  description: "Loja de roupas e biquínis com os melhores preços",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} Styllo Biquinis. Todos os
                    direitos reservados.
                  </p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
