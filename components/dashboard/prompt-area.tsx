"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { BorderBeam } from "@/components/ui/border-beam"

interface PromptAreaProps {
    onSubmit?: (prompt: string) => void
    placeholder?: string
}

export function PromptArea({
    onSubmit,
    placeholder = "Describe the YouTube thumbnail you want to create...",
}: PromptAreaProps) {
    const [prompt, setPrompt] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = () => {
        if (!prompt.trim()) return
        onSubmit?.(prompt.trim())
        setPrompt("")
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto px-4">
            <div className="text-center mb-4">
                <h2
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5"
                    style={{ fontFamily: "var(--font-indie-flower)" }}
                >
                    What will you create today?
                </h2>
                <p className="text-foreground/50 text-xs">
                    Describe your thumbnail and let AI do the magic.
                </p>
            </div>

            {/* Chat Box with BorderBeams */}
            <div className="relative rounded-2xl overflow-hidden">
                <BorderBeam
                    duration={6}
                    size={400}
                    colorFrom="#ffaa40"
                    colorTo="#9c40ff"
                />
                <BorderBeam
                    duration={6}
                    delay={3}
                    size={400}
                    borderWidth={2}
                    colorFrom="#9c40ff"
                    colorTo="#ffaa40"
                />

                <div className="relative bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 shadow-2xl">
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        rows={3}
                        className="w-full bg-transparent text-foreground placeholder:text-foreground/50 text-base resize-none outline-none leading-relaxed"
                    />

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-500/20">
                        <span className="text-[11px] text-foreground/60 font-medium">
                            Press <kbd className="px-1 py-0.5 rounded bg-blue-500/10 text-foreground/80 font-mono text-[10px]">Enter</kbd> to generate · <kbd className="px-1 py-0.5 rounded bg-blue-500/10 text-foreground/80 font-mono text-[10px]">Shift+Enter</kbd> for new line
                        </span>

                        <button
                            onClick={handleSubmit}
                            disabled={!prompt.trim()}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#ffaa40] to-[#9c40ff] text-black text-sm font-black shadow-lg hover:opacity-90 transition-opacity disabled:opacity-80 disabled:cursor-not-allowed"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
