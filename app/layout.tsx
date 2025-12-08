import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google";
import "./globals.css"
import { CartProvider } from "@/lib/use-cart";
import { AuthProvider } from "@/lib/context/auth-context";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "YAGO IMPORTS | Moda Masculina",
  description: "Moda Masculina com estilo e qualidade",
} 
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {   
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={montserrat.className} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
              <div className="relative flex min-h-screen flex-col"> 
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
            </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
