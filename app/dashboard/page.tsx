"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardNavbar } from "@/components/dashboard/navbar"
import { PromptArea } from "@/components/dashboard/prompt-area"
import { BoxLoader } from "@/components/dashboard/box-loader"
import { Sidebar } from "@/components/dashboard/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
    const [history, setHistory] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isHistoryLoaded, setIsHistoryLoaded] = useState(false)

    // Load history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem("dashboardImageHistory")
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory))
            } catch (e) {
                console.error("Failed to parse history", e)
            }
        }
        setIsHistoryLoaded(true)
    }, [])

    // Save history to localStorage whenever it changes, but only after it has been loaded
    useEffect(() => {
        if (isHistoryLoaded) {
            localStorage.setItem("dashboardImageHistory", JSON.stringify(history))
        }
    }, [history, isHistoryLoaded])

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

    const handlePromptSubmit = async (prompt: string, references: any[]) => {
        setIsGenerating(true)
        setError(null)
        setGeneratedImageUrl(null)

        // Note: Currently, the reference images are collected in the UI but not 
        // sent to the generation API endpoint since that requires backend multi-modal support.

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong")
            }

            setGeneratedImageUrl(data.imageUrl)
            setHistory(prev => [data.imageUrl, ...prev])
        } catch (err: any) {
            console.error("Generation error:", err)
            setError(err.message)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="relative min-h-screen bg-zinc-100 bg-grid-tile overflow-hidden flex">
            {/* Floating Sidebar */}
            <Sidebar images={history} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative min-h-screen pl-52">
                {/* Subtle radial fade at center */}
                <div className="pointer-events-none absolute inset-0 bg-zinc-100 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]" />

                {/* Dashboard Navbar */}
                <DashboardNavbar />

                {/* Content Area */}
                <main className="relative z-10 flex flex-col flex-1 items-center justify-center p-4">
                    <div className="w-full max-w-4xl flex flex-col items-center gap-12">

                        {/* Top Section: Loader or Generated Image */}
                        <div className="min-h-[300px] flex items-center justify-center w-full">
                            <AnimatePresence mode="wait">
                                {isGenerating ? (
                                    <motion.div
                                        key="loader"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex flex-col items-center gap-12"
                                    >
                                        <BoxLoader />
                                        <p className="text-foreground/60 font-medium animate-pulse">
                                            AI is crafting your masterpiece...
                                        </p>
                                    </motion.div>
                                ) : generatedImageUrl ? (
                                    <motion.div
                                        key="image"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative group"
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-[#ffaa40] to-[#9c40ff] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative bg-white p-2 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200">
                                            <Image
                                                src={generatedImageUrl}
                                                alt="Generated Thumbnail"
                                                width={600}
                                                height={400}
                                                className="rounded-xl w-full max-w-2xl h-auto shadow-sm"
                                            />
                                            <div className="mt-4 flex justify-between items-center px-2 pb-2">
                                                <p className="text-xs text-zinc-500 italic">Generated by Gemini Nanobanana</p>
                                                <a
                                                    href={generatedImageUrl}
                                                    download="thumbnail.png"
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : error ? (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm"
                                    >
                                        Error: {error}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-foreground/20 text-center"
                                    >
                                        <p className="text-lg font-medium italic">Your creation will appear here</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Section: Prompt Input */}
                        <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full flex justify-center"
                        >
                            <PromptArea onSubmit={handlePromptSubmit} isLoading={isGenerating} history={history} />
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    )
}
