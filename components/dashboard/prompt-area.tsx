"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { BorderBeam } from "@/components/ui/border-beam"
import Image from "next/image"
import { X, Paperclip, ImageIcon } from "lucide-react"

export interface ReferenceImage {
    url: string;
    file?: File;
}

interface PromptAreaProps {
    onSubmit?: (prompt: string, references: ReferenceImage[]) => void
    placeholder?: string
    isLoading?: boolean
    history?: string[]
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_REFERENCES = 10;

export function PromptArea({
    onSubmit,
    placeholder = "Describe the YouTube thumbnail you want to create...",
    isLoading = false,
    history = [],
}: PromptAreaProps) {
    const [prompt, setPrompt] = useState("")
    const [references, setReferences] = useState<ReferenceImage[]>([])
    const [popoverOpen, setPopoverOpen] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        if ((!prompt.trim() && references.length === 0) || isLoading) return
        onSubmit?.(prompt.trim(), references)
        setPrompt("")
        setReferences([])
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);

        const validFiles = files.filter(file => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`File ${file.name} is too large. Max size is 5MB.`);
                return false;
            }
            return true;
        });

        const availableSlots = Math.max(0, MAX_REFERENCES - references.length);
        const filesToAdd = validFiles.slice(0, availableSlots);

        if (files.length > availableSlots) {
            alert(`You can only attach up to ${MAX_REFERENCES} images.`);
        }

        const newReferences = filesToAdd.map(file => ({
            url: URL.createObjectURL(file), // Create a local preview URL
            file
        }));

        setReferences(prev => [...prev, ...newReferences]);

        // Reset input value to allow selecting the same file again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleHistorySelect = (url: string) => {
        if (references.length >= MAX_REFERENCES) {
            alert(`You can only attach up to ${MAX_REFERENCES} images.`);
            return;
        }

        // Don't add if already in references
        if (!references.some(ref => ref.url === url)) {
            setReferences(prev => [...prev, { url }]);
        }
        setPopoverOpen(false);
    }

    const removeReference = (indexToRemove: number) => {
        setReferences(prev => prev.filter((_, idx) => idx !== indexToRemove));
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

                <div className="relative bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 shadow-2xl flex flex-col">

                    {/* Selected References Preview Area */}
                    {references.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-blue-500/20">
                            {references.map((ref, idx) => (
                                <div key={idx} className="relative group w-12 h-12 rounded-lg overflow-hidden border border-white/20">
                                    <Image
                                        src={ref.url}
                                        alt={`Reference ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => removeReference(idx)}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Text Input */}
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        rows={3}
                        disabled={isLoading}
                        className="w-full bg-transparent text-foreground placeholder:text-foreground/50 text-base resize-none outline-none leading-relaxed disabled:opacity-50"
                    />

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-500/20">
                        <div className="flex items-center gap-2 relative">
                            {/* Upload Button */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading || references.length >= MAX_REFERENCES}
                                className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-foreground/80 transition-colors disabled:opacity-50"
                                title="Upload Image (Max 5MB)"
                            >
                                <Paperclip className="w-4 h-4" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />

                            {/* Reference Popover Wrapper */}
                            <div
                                className="relative flex items-center h-full"
                                onMouseEnter={() => setPopoverOpen(true)}
                                onMouseLeave={() => setPopoverOpen(false)}
                            >
                                <button
                                    className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-foreground/80 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                                    disabled={isLoading}
                                    title="Reference past images"
                                    type="button"
                                >
                                    <ImageIcon className="w-4 h-4" />
                                </button>

                                {/* Hover Popover for History */}
                                <div
                                    className={`absolute left-0 bottom-[calc(100%+8px)] w-64 rounded-2xl bg-[#202020]/95 backdrop-blur-xl border border-white/20 shadow-2xl p-3 transition-all duration-200 z-[100] ${popoverOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
                                        }`}
                                >
                                    {/* Invisible bridge to prevent hover loss */}
                                    <div className="absolute top-full left-0 w-full h-4 bg-transparent" />

                                    <p className="text-[10px] uppercase font-bold text-white/50 mb-2 px-1">Recent Gallery</p>
                                    {history.length === 0 ? (
                                        <p className="text-white/40 text-xs italic px-1 cursor-default">No recent images available</p>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar p-1">
                                            {history.map((url, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => handleHistorySelect(url)}
                                                    className="relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-white/40 hover:scale-105 transition-all outline-none"
                                                    title="Use as reference"
                                                >
                                                    <Image src={url} alt={`History ${idx}`} fill className="object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-[11px] text-foreground/60 font-medium hidden sm:inline-block">
                                Press <kbd className="px-1 py-0.5 rounded bg-blue-500/10 text-foreground/80 font-mono text-[10px]">Enter</kbd> to generate
                            </span>

                            <button
                                onClick={handleSubmit}
                                disabled={(!prompt.trim() && references.length === 0) || isLoading}
                                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#ffaa40] to-[#9c40ff] text-black text-sm font-black shadow-lg hover:opacity-90 transition-opacity disabled:opacity-80 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
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
                                )}
                                {isLoading ? "Generating..." : "Generate"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
