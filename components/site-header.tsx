"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/use-cart"
import { useState, useEffect } from "react"

export default function SiteHeader() {
  const pathname = usePathname()
  const { cart } = useCart()
  const [cartCount, setCartCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Verificar se o componente está montado no cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Atualizar o contador do carrinho apenas após a montagem
  useEffect(() => {
    if (isMounted) {
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0))
    }
  }, [cart, isMounted])
  // Adicione uma margem esquerda maior para empurrar os itens para a direita
  const routes = [
    {
      href: "/",
      label: "Início",
      active: pathname === "/",
    },
    {
      href: "/esgotados",
      label: "Esgotados",
      active: pathname === "/esgotados",
    },
    {
      href: "/Camisas",
      label: "Camisas",
      active: pathname === "/Camisas",
    },
    {
      href: "#",
      label: "Shorts",
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
      <div className="container mx-auto flex h-17 items-center justify-between px-7">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[340px]">
                <div className="flex h-24 items-center border-b justify-start pl-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  {/* Logo no menu mobile */}
                  <Image
                  src="/images/logo3.png"
                  alt="yago logo"
                  width={230}
                  height={60}
                  className="h-40 w-auto object-contain"
                  />
                </Link>
                </div>
                <nav className="flex flex-col gap-4 mt-6 px-">
                {routes.map((route) => (
                  <Link
                  key={route.href}
                  href={route.href}
                  className={`text-lg ${route.active ? "font-medium" : "text-muted-foreground"}`}
                  onClick={() => setIsOpen(false)}
                  >
                  {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
            <div className="flex items-center mt-5">
            <Link href="/" className="flex items-center">
              {/* Logo principal no header */}
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
          <nav className="hidden lg:flex items-center gap-6 ml-10">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  route.active ? "" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="relative lg:hidden">
              <ShoppingBag className="h-5 w-5" />
              {/* Só mostrar o contador de itens do carrinho após a montagem do componente */}
              {isMounted && cartCount > 0 && (
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

