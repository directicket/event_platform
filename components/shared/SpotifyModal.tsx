'use client'

import Link from 'next/link'
import Image from 'next/image'

interface TicketModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TicketModal({ showModal, setShowModal }: TicketModalProps) {
  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="bg-none p-6 rounded-lg">
        <div className="card-bg md:max-w-96 p-4 border border-neutral-700/45 rounded-md gap-3 flex flex-col items-center py-8 justify-center">
          <Image
            alt='image'
            src='/assets/images/spotify-playlists-image.png'
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <h2 className="p-semibold-24 tracking-tight md:p-bold-24 text-wrap text-center text-white mt-4">
            Add Spotify Playlists Previews to your tickets.
          </h2>
          <p className="text-neutral-500 text-center p-regular-14 md:p-regular-16 max-w-[90%]">
             You can add any public Spotify playlist to your ticket by pasting its link into the URL field during ticket creation.
          </p>
          <div className='flex flex-row gap-3'>
          <button
            onClick={() => setShowModal(false)}
            className="rounded-full border bg-white/1 text-white p-2 px-4 w-fit p-regular-14 self-center"
          >
            Cancel
          </button>

          <button
            className="rounded-full bg-white border text-black p-2 px-4 w-fit p-regular-14 self-center"
          ><Link href='/events/create'>
            Add yours
            </Link>
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}
