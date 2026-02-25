"use client"

import { HeroSection } from "@/components/main/hero"

export default function Home() {
  const handleStart = () => {
    console.log("Starting nAILART ai journey...")
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
