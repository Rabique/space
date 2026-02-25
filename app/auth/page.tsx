"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function AuthPage() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-background flex items-center justify-center px-6">
      {/* Background - Matching Hero Section */}
      <div className="fixed inset-0 w-screen h-screen">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={["#FF0000", "#4F46E5", "#7C3AED", "#111827", "#C026D3", "#DB2777"]}
              distortion={0.8}
              swirl={0.6}
              grainMixer={0}
              grainOverlay={0}
              speed={0.5}
              offsetX={0.08}
            />
            <div className="absolute inset-0 pointer-events-none bg-white/20 dark:bg-black/40 backdrop-blur-[2px]" />
          </>
        )}
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[320px]">
        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex flex-col items-center gap-1 group">
              <div className="p-2 bg-white/10 rounded-xl group-hover:scale-105 transition-transform">
                <Image
                  src="/icon.png"
                  alt="nAILART ai Logo"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
              </div>
              <span 
                className="text-xl font-bold text-foreground tracking-tighter"
                style={{ fontFamily: 'var(--font-indie-flower)' }}
              >
                nAILART <span className="text-red-500">ai</span>
              </span>
            </Link>
          </div>

          <h1 className="text-lg font-semibold text-foreground mb-1">Welcome Back</h1>
          <p className="text-xs text-foreground/60 mb-6 px-4">Start creating viral thumbnails in seconds.</p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-[10px] text-foreground/40 leading-relaxed">
            By continuing, you agree to our <br />
            <Link href="#" className="underline hover:text-foreground">Terms</Link> and <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </main>
  )
}
