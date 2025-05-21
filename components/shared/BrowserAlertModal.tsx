'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TriangleAlert } from 'lucide-react'

export default function BrowserAlertModal() {
  const [showModal, setShowModal] = useState(true)

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="bg-none p-6 rounded-lg">
        <div className="card-bg md:max-w-96 p-4 border border-neutral-700/45 rounded-md gap-3 flex flex-col items-center py-8 justify-center">
          <TriangleAlert className="max-w-40 max-h-36 object-cover text-yellow-400" />
            
          <h2 className="p-semibold-24 tracking-tight md:p-bold-24 text-wrap text-center text-white mt-4">
            This browser may be faulty.
          </h2>
          <p className="text-neutral-500 text-center p-regular-14 md:p-regular-16 max-w-[90%]">
            Social media browsers are not the best for handling transactions. 
            Copy the link you're trying to access into a browser like Safari or Chrome for the best experience.
          </p>
          
            <button onClick={() => setShowModal(false)} className="rounded-full bg-red-600 text-black p-2 px-4 w-fit p-regular-14 self-center">
              Continue
            </button>

        </div>
      </div>
    </div>
  )
}
