"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
    className?: string
    size?: number
    duration?: number
    borderWidth?: number
    colorFrom?: string
    colorTo?: string
    delay?: number
}

export const BorderBeam = ({
    className,
    size = 200,
    duration = 8,
    borderWidth = 1.5,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
    delay = 0,
}: BorderBeamProps) => {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = divRef.current
        if (!el) return

        let start: number | null = null
        let raf: number

        const animate = (ts: number) => {
            if (start === null) start = ts - delay * 1000
            const elapsed = (ts - start) / 1000 // seconds
            const progress = (elapsed % duration) / duration // 0 → 1
            const angle = progress * 360

            el.style.setProperty("--beam-angle", `${angle}deg`)
            raf = requestAnimationFrame(animate)
        }

        raf = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(raf)
    }, [duration, delay])

    return (
        <div
            ref={divRef}
            style={
                {
                    "--beam-color-from": colorFrom,
                    "--beam-color-to": colorTo,
                    "--beam-border": `${borderWidth}px`,
                } as React.CSSProperties
            }
            className={cn("pointer-events-none absolute inset-0 rounded-[inherit] border-beam-wrapper", className)}
        />
    )
}
