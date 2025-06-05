"use client"

import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'

type LazyVideoProps = {
  src: string
  type?: string
  [key: string]: any
}

export default function LazyVideoRewind({ src, type = "video/mp4", ...props }: LazyVideoProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.00001 })
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isRewinding, setIsRewinding] = useState(false)

  useEffect(() => {
    if (inView) setLoaded(true)
  }, [inView])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !loaded) return

    const handleEnded = () => {
      setIsRewinding(true)
    }

    const rewind = () => {
      if (!video) return
      if (video.currentTime > 0) {
        video.currentTime -= 0.05 // adjust for smoother/faster rewind
        requestAnimationFrame(rewind)
      } else {
        setIsRewinding(false)
        video.play()
      }
    }

    video.addEventListener('ended', handleEnded)

    if (isRewinding) {
      rewind()
    }

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [loaded, isRewinding])

  return (
    <div ref={ref}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        {...props}
      >
        {loaded && <source src={src} type={type} />}
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
