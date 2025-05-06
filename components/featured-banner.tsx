"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BannerItem {
  id: number
  image: string
  title: string
  subtitle: string
}

const bannerItems: BannerItem[] = [
  {
    id: 1,
    image: "/images/capaD1.jpg",
    title: "Coleção Verão 2025",
    subtitle: "Descubra as últimas tendências da estação",
  },
  {
    id: 2,
    image: "/images/capaD2.jpg",
    title: "Novos Biquínis",
    subtitle: "Conforto e estilo para o seu verão",
  },
  {
    id: 3,
    image: "/images/capaD3.jpg",
    title: "Promoção Especial",
    subtitle: "Até 30% de desconto na primeira compra",
  },
]

export default function FeaturedBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerItems.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])
//ajustar o tamanho do banner para telas menores
  return (
    <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden mb-2">
      {bannerItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={item.image || "/placeholder.svg?height=00&width=00"}
              alt={item.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* ajustar as letras */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 text-white">
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold mb-2">{item.title}</h2>
              <p className="text-base md:text-lg mb-80">{item.subtitle}</p>
            </div>
            </div>
          </div>
          ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white z-10"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
