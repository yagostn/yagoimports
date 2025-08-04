"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import { useState, useEffect } from "react"

export default function SiteHeader() {
  const pathname = usePathname()
  const { cart } = useCart()
  const [cartCount, setCartCount] = useState(0)

  // Atualizar o contador do carrinho
  useEffect(() => {
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0))
  }, [cart])
  // Adicione uma margem esquerda maior para empurrar os itens para a direita
  const routes = [
    {
      href: "#",
      active: ["/Shorts", "/Shorts Sarjas", "/Shorts Linho"].includes(pathname),
      subRoutes: [
        {
          href: "/Shorts",
          label: "Todos",
        },
        {
          href: "/Shorts Sarjas",
          label: "Sarjas",
        },
        {
          href: "/Shorts Linho",
          label: "Linho",
        },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-17 items-center justify-center px-7">
        <div className="flex flex-col items-center">
          <div className="flex items-center mt-5">
            <Link href="/" className="flex items-center">
              {/* Logo principal no header - centralizada */}
              <Image
              src="/images/logo3.png"
              alt="Yago Logo"
              width={250}
              height={100}
              className="h-40 w-70 object-contain"
              priority
              />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-6 mt-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  route.active ? "" : "text-muted-foreground"
                }`}
              >
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute right-4 flex items-center gap-4">
          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Carrinho</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

