"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"

export function DashboardNavbar() {
    const { user, signOut } = useAuth()
    const [popoverOpen, setPopoverOpen] = useState(false)

    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined
    const displayName = user?.user_metadata?.full_name || user?.email || "User"

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">
            {/* Logo Button */}
            <Link
                href="/dashboard"
                className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg hover:bg-white/90 transition-all duration-200"
            >
                <Image
                    src="/icon.png"
                    alt="nAILART ai Logo"
                    width={28}
                    height={28}
                    className="rounded-lg"
                />
                <span
                    className="text-lg font-bold text-foreground tracking-tighter"
                    style={{ fontFamily: "var(--font-indie-flower)" }}
                >
                    nAILART <span className="text-red-500">ai</span>
                </span>
            </Link>

            {/* Profile Popover Button */}
            <div
                className="pointer-events-auto relative"
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={() => setPopoverOpen(false)}
            >
                {/* Avatar Button */}
                <button className="w-10 h-10 rounded-2xl bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg overflow-hidden hover:ring-2 hover:ring-black/5 transition-all duration-200 flex items-center justify-center">
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={displayName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-foreground font-semibold text-sm">
                            {displayName.charAt(0).toUpperCase()}
                        </span>
                    )}
                </button>

                {/* Popover */}
                <div
                    className={`absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden transition-all duration-200 ${popoverOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                        }`}
                >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-xs font-semibold text-foreground truncate">{displayName}</p>
                        {user?.email && (
                            <p className="text-[11px] text-foreground/50 truncate">{user.email}</p>
                        )}
                    </div>
                    {/* Sign Out */}
                    <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors duration-150"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </header>
    )
}
