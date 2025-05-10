'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TicketModal() {
  const [showModal, setShowModal] = useState(true)

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="bg-none p-6 rounded-lg">
        <div className="card-bg md:max-w-96 p-4 border border-neutral-700/45 rounded-md gap-3 flex flex-col items-center py-8 justify-center">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/assets/videos/ticket-artwork-upload.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h2 className="p-semibold-24 tracking-tight md:p-bold-24 text-wrap text-center text-white mt-4">
            Make yours memorable.
          </h2>
          <p className="text-neutral-500 text-center p-regular-14 md:p-regular-16 max-w-[90%]">
            Every ticket is a unique product on directicket. Give each one a distinct name, artwork, description, price and more.
          </p>
          
            <button onClick={() => setShowModal(false)} className="rounded-full bg-white text-black p-2 px-4 w-fit p-regular-14 self-center">
              Continue
            </button>

        </div>
      </div>
    </div>
  )
}
