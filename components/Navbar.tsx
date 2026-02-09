"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-slate-800/50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Left */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Logo SVG */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect
                                    x="2"
                                    y="2"
                                    width="28"
                                    height="28"
                                    rx="6"
                                    fill="url(#logoGradient)"
                                />
                                <path
                                    d="M16 8L18 14L22 10L20 16L26 14L20 16L26 18L20 16L22 22L18 18L16 24L14 18L10 22L12 16L6 18L12 16L6 14L12 16L10 10L14 14L16 8Z"
                                    fill="white"
                                />
                                <defs>
                                    <linearGradient id="logoGradient" x1="2" y1="2" x2="30" y2="30">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="50%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className="text-l font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                네일아트
                            </span>
                        </Link>
                    </div>

                    {/* Navigation - Center (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-8">
                            <Link
                                href="#features"
                                className="text-black-300 hover:text-white transition-colors duration-200 font-bold"
                            >
                                Features
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-black-300 hover:text-white transition-colors duration-200 font-bold"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="#contact"
                                className="text-black-300 hover:text-white transition-colors duration-200 font-bold"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* CTA Button - Right (Desktop) */}
                    <div className="hidden md:block">
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="#features"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-200 font-bold"
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-200 font-bold"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#contact"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-200 font-bold"
                        >
                            Contact
                        </Link>
                        <button className="w-full mt-2 px-4 py-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white font-semibold">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
