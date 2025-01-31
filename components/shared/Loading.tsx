'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Loading = () => {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1000) // Adjust timing as needed
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    loading && (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ width: '100%' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 h-0.5 bg-green-700 z-50"
      />
    )
  )
}

export default Loading
