"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  zoomScale?: number
}

export default function ImageZoom({
  src,
  alt,
  width = 500,
  height = 500,
  className = "",
  zoomScale = 2.5,
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()

    // Calculate mouse position as percentage of container
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    // Limit values between 0 and 1
    const boundedX = Math.max(0, Math.min(1, x))
    const boundedY = Math.max(0, Math.min(1, y))

    setPosition({ x: boundedX, y: boundedY })
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  // For touch devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || e.touches.length === 0) return

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()

    const touch = e.touches[0]
    const x = (touch.clientX - left) / width
    const y = (touch.clientY - top) / height

    const boundedX = Math.max(0, Math.min(1, x))
    const boundedY = Math.max(0, Math.min(1, y))

    setPosition({ x: boundedX, y: boundedY })
  }

  const handleTouchStart = () => {
    setIsZoomed(true)
  }

  const handleTouchEnd = () => {
    setIsZoomed(false)
  }

  return (
    <div
      ref={imageContainerRef}
      className={`relative overflow-hidden rounded-lg cursor-zoom-in ${className}`}
      style={{ width: "100%", height: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Regular image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-200 ${isZoomed ? "opacity-0" : "opacity-100"}`}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {/* Zoomed image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={`${alt} (zoomed)`}
        fill
        className={`object-cover transition-opacity duration-200 ${isZoomed ? "opacity-100" : "opacity-0"}`}
        style={{
          transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
          transform: isZoomed ? `scale(${zoomScale})` : "scale(1)",
        }}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {/* Lens indicator (optional) */}
      {isZoomed && <div className="absolute inset-0 pointer-events-none border border-primary/30 z-10"></div>}
    </div>
  )
}

