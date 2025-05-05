'use client'

import { Compass, Globe } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import TicketModal from './SpotifyModal';

interface SpotifyPreviewProps {
    playlistUrl?: string;
}

const SpotifyPreview: React.FC<SpotifyPreviewProps> = ({ playlistUrl }) => {
    if (!playlistUrl) return null
    const [showModal, setShowModal] = useState(false)

    const playlistId = playlistUrl.match(/playlist\/([^?]+)/)?.[1]

    if (!playlistId) 
        return(
            <div className='flex flex-col'>
                <div className='flex flex-row gap-1 p-3 bg-neutral-800 border border-b-0 rounded-tr-md rounded-tl-md border-neutral-700/50'>
                <Compass height={20} width={20} className='text-neutral-400'/>
                <p className='text-neutral-400 p-medium-16'>Website Link</p>
                </div>
                <div className='flex flex-col text-center items-center justify-center gap-1 p-3 bg-neutral-950 border rounded-bl-md rounded-br-md border-neutral-700/50'>
                    
                    <p className='text-black hover:bg-yellow-700/80 bg-yellow-700 border border-yellow-600/50 p-3 px-5 p-bold-14
                     max-w-[80%] my-3 truncate rounded-full line-clamp-1'>
                        <Link href={playlistUrl}>{playlistUrl}</Link>
                    </p>
                    
                </div>
                <p className='text-neutral-600 p-regular-12 w-full mt-1'>
                The creator of this ticket shared a link they'd like you to visit to learn more about this ticket.</p>
            </div>
        )

  return (
    <div className='w-full overflow-hidden'>
        <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}`}
            allow="encrypted-media"
            title="Spotify Playlist"
            className='w-full h-[380px]'
        ></iframe>
        <p className='p-regular-12 text-neutral-600 mt-2'>
            This playlist was shared by the creator of this ticket. {' '} <br className='md:hidden'/>
            <span
                className='underline text-neutral-600 cursor-pointer'
                onClick={() => setShowModal(true)}
                >
                <a href='/#'></a>
                Learn how to add a playlist to your ticket.
            </span>
        </p>
        <TicketModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default SpotifyPreview