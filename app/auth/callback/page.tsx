'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error in auth callback:', error)
      }
      router.push('/')
    }

    handleAuth()
  }, [router, supabase.auth])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-foreground">Authenticating...</div>
    </div>
  )
}
