'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ fallbackHref = '/' }: { fallbackHref?: string }) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    if (window.history.length > 2) {
      setCanGoBack(true)
    }
  }, [])

  const handleClick = () => {
    if (canGoBack) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full border border-white bg-transparent p-2 text-white hover:bg-white/10 transition"
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  )
}
