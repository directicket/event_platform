import React from 'react'

interface SpotifyPreviewProps {
    playlistUrl?: string;
}

const SpotifyPreview: React.FC<SpotifyPreviewProps> = ({ playlistUrl }) => {
    if (!playlistUrl) return null

    const playlistId = playlistUrl.match(/playlist\/([^?]+)/)?.[1]

    if (!playlistId) return null

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
            <span className='underline text-neutral-600'>
                Learn how to add a playlist to your ticket.
            </span>
        </p>
    </div>
  )
}

export default SpotifyPreview