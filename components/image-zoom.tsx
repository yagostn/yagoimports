"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import styles from "./image-zoom.module.css"

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  zoomScale?: number
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, width, height, className = "", zoomScale = 2 }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top
      setMousePosition({ x, y })
    }
  }

  const zoomX = isZoomed ? -(mousePosition.x * (zoomScale - 1)) : 0
  const zoomY = isZoomed ? -(mousePosition.y * (zoomScale - 1)) : 0

  return (
    <div
      ref={containerRef}
      className={`${styles.imageContainer} ${className}`}
      style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "100%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full">
        <Image src={src || "/placeholder.svg"} alt={alt} fill style={{ objectFit: "cover" }} />
      </div>
      {isZoomed && (
        <div
          className={styles.zoomOverlay}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomScale * 100}% ${zoomScale * 100}%`,
            backgroundPosition: `${zoomX}px ${zoomY}px`,
          }}
        />
      )}
    </div>
  )
}

export default ImageZoom

