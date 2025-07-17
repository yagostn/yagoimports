"use client"
import Image from "next/image"

interface BannerItem {
  id: number
  image: string
  title: string
  subtitle: string
}

const bannerItem: BannerItem = {
  id: 1,
  image: "/images/logo.jpg",
  title: "",
  subtitle: "",
}

export default function FeaturedBanner() {
  return (
    <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden mb-2">
      <div className="relative w-full h-full">
        <Image
          src={bannerItem.image || "/placeholder.svg?height=600&width=1200"}
          alt={bannerItem.title || "Banner"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay escuro opcional */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Conteúdo de texto (caso queira adicionar título/subtítulo) */}
        {(bannerItem.title || bannerItem.subtitle) && (
          <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 text-white">
            {bannerItem.title && (
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold mb-2">{bannerItem.title}</h2>
            )}
            {bannerItem.subtitle && <p className="text-base md:text-lg mb-4">{bannerItem.subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
