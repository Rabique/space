"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardNavbar } from "@/components/dashboard/navbar"
import { PromptArea } from "@/components/dashboard/prompt-area"

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-foreground/60 text-sm animate-pulse">Loading...</div>
            </div>
        )
    }

    if (!user) return null

    const handlePromptSubmit = (prompt: string) => {
        console.log("Generating thumbnail for:", prompt)
        // TODO: 실제 이미지 생성 API 호출
    }

    return (
        <div className="relative min-h-screen bg-zinc-100 bg-grid-tile overflow-hidden">
            {/* Subtle radial fade at center */}
            <div className="pointer-events-none absolute inset-0 bg-zinc-100 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]" />

            {/* Dashboard Navbar */}
            <DashboardNavbar />

            {/* Center Content */}
            <main className="relative z-10 flex min-h-screen items-center justify-center">
                <PromptArea onSubmit={handlePromptSubmit} />
            </main>
        </div>
    )
}
