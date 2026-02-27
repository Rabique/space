"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Download, History, Layers } from "lucide-react"
import Image from "next/image"

interface SidebarProps {
    images: string[]
    className?: string
}

export function Sidebar({ images, className }: SidebarProps) {
    const handleDownload = (imgUrl: string, e: React.MouseEvent) => {
        e.stopPropagation()
        const link = document.createElement('a')
        link.href = imgUrl
        link.download = `generated-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <aside
            className={cn(
                "fixed left-6 top-24 bottom-6 w-40 bg-[#202020]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 z-50 flex flex-col overflow-hidden transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
                className
            )}
            style={{
                background: "linear-gradient(135deg, rgba(32, 32, 32, 0.9), rgba(45, 45, 45, 0.7))",
            }}
        >
            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <div className="mb-6 flex items-center justify-between px-2">
                    <h3 className="text-white/50 text-[10px] uppercase font-black tracking-[0.2em]">Recent Gallery</h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffaa40] animate-pulse" />
                </div>

                <div className="space-y-4">
                    {images.length === 0 ? (
                        <div className="px-2 py-12 text-center border border-dashed border-white/5 rounded-3xl">
                            <History className="w-6 h-6 text-white/10 mx-auto mb-3" />
                            <p className="text-white/20 text-[11px] font-medium">Your creative history<br />will appear here</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {images.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 cursor-pointer group shadow-lg bg-black/40"
                                >
                                    <Image
                                        src={img}
                                        alt={`Generated ${idx}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Liquid Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <button
                                            onClick={(e) => handleDownload(img, e)}
                                            className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#9c40ff] hover:border-[#9c40ff] transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl"
                                        >
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Subtle Glass Reflection */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Status Indicator */}
            <div className="p-5 border-t border-white/5 bg-black/20 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">AI Studio Active</span>
                </div>
            </div>

            {/* Side Highlights for Liquid Look */}
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </aside>
    )
}
