"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { HeroSection } from "@/components/main/hero"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard")
    }
  }, [user, loading, router])

  const handleStart = () => {
    router.push("/auth")
  }

  return (
    <main>
      <HeroSection
        title="Viral-Ready YouTube Thumbnails with"
        highlightText="NAILART art AI"
        description="Stop wasting hours on design. Generate eye-catching, high-CTR YouTube thumbnails in seconds using advanced AI tailored for creators."
        buttonText="Get Started Free"
        onButtonClick={handleStart}
        colors={["#FF0000", "#4F46E5", "#7C3AED", "#111827", "#C026D3", "#DB2777"]}
        speed={0.5}
        titleClassName="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-[60px] tracking-tight"
        fontFamily="var(--font-indie-flower)"
      />
    </main>
  )
}
