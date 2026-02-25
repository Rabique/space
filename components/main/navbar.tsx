"use client"

import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-2">
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

      <div>
        <button className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    </nav>
  )
}
