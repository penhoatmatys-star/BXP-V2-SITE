"use client"

import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface TiltCardProps {
  /** Maximum tilt angle in degrees */
  tiltLimit?: number
  /** Scale factor on hover */
  scale?: number
  /** Perspective distance in pixels */
  perspective?: number
  /** Tilt direction: "gravitate" follows cursor, "evade" tilts away */
  effect?: "gravitate" | "evade"
  /** Show a spotlight that follows the cursor on hover */
  spotlight?: boolean
  /** Additional class name */
  className?: string
  /** Additional inline styles */
  style?: React.CSSProperties
  /** Card content */
  children?: React.ReactNode
}

/** Interactive 3D tilt card with a pointer-following spotlight (21st.dev, tom_ui). */
export function TiltCard({
  tiltLimit = 15,
  scale = 1.05,
  perspective = 1200,
  effect = "evade",
  spotlight = true,
  className,
  style,
  children,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rest = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  const [transform, setTransform] = useState(rest)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const dir = effect === "evade" ? -1 : 1

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = cardRef.current
      if (!el || e.pointerType === "touch") return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const xRot = (py - 0.5) * (tiltLimit * 2) * dir
      const yRot = (px - 0.5) * -(tiltLimit * 2) * dir
      setTransform(
        `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale}, ${scale}, ${scale})`,
      )
      if (spotlight) setSpotlightPos({ x: px * 100, y: py * 100 })
    },
    [tiltLimit, scale, perspective, dir, spotlight],
  )

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setTransform(rest)
        setIsHovered(false)
      }}
      className={cn("relative overflow-hidden will-change-transform motion-reduce:!transform-none", className)}
      style={{ transform, transition: "transform 0.2s ease-out", transformStyle: "preserve-3d", ...style }}
    >
      {children}
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
        >
          <div
            className="absolute h-[200%] w-[200%] rounded-full"
            style={{
              left: `${spotlightPos.x}%`,
              top: `${spotlightPos.y}%`,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(230,189,81,0.16) 0%, transparent 40%)",
            }}
          />
        </div>
      )}
    </div>
  )
}

export default TiltCard
