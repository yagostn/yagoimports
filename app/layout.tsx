import type React from "react"
import type { Metadata } from "next"
import { Julius_Sans_One } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/use-cart";
import SiteHeader from "@/components/site-header";

const juliusSansOne = Julius_Sans_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-julius-sans-one", // Opcional: para usar como variável CSS
});

export const metadata: Metadata = {
  title: "DUNNA | Moda Praia",
  description: "Moda praia com estilo e qualidade",
} 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {   
  return (
    <html lang="pt-BR">
      <body className={juliusSansOne.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CartProvider>
            <div className="relative flex min-h-screen flex-col"> 
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} DUNNA PRAIA. Todos os
                    direitos reservados.
                  </p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
