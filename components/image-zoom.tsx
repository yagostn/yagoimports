"use client"

import type React from "react"
import { useState, useRef } from "react"
import styles from "./image-zoom.module.css"

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  zoomLevel?: number
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, width = 500, height = 300, zoomLevel = 2 }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = imageRef.current!.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    setMousePosition({ x, y })
  }

  const zoomX = isZoomed ? -(mousePosition.x * (zoomLevel - 1)) : 0
  const zoomY = isZoomed ? -(mousePosition.y * (zoomLevel - 1)) : 0

  return (
    <div
      className={styles.imageContainer}
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imageRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {isZoomed && (
        <div
          className={styles.zoomOverlay}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundPosition: `${zoomX}px ${zoomY}px`,
          }}
        />
      )}
    </div>
  )
}

export default ImageZoom

