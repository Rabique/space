"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  // /auth 페이지나 /dashboard 페이지에서는 Navbar 숨김
  if (pathname === "/auth" || pathname?.startsWith("/dashboard")) return null

  const logoHref = user ? "/dashboard" : "/"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-2">
        <Link href={logoHref} className="flex items-center gap-2">
          <Image
            src="/icon.png"
            alt="NAILART ai Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-foreground tracking-tighter">
            NAILART <span className="text-primary text-red-500">ai</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
        <Link href="#features" className="hover:text-primary transition-colors">
          Features
        </Link>
        <Link href="#pricing" className="hover:text-primary transition-colors">
          Pricing
        </Link>
        <Link href="#contact" className="hover:text-primary transition-colors">
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-full bg-white/10 text-foreground text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="px-5 py-2.5 rounded-full bg-white/10 text-foreground text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth">
            <button className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}
