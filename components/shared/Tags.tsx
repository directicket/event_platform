'use client'

import { BookmarkPlus, X, EllipsisVertical, FolderOpen } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { createTag } from '@/lib/actions/tag.actions'
import CollectionGroups from './CollectionGroups'
import { getEventsByUser } from '@/lib/actions/event.actions'
import UserOrganizedEvents from './ServerGroupWrapper'
import Image from 'next/image'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'

interface Tag {
  _id: string
  name: string
}

const Tags = () => {
  const [open, setOpen] = useState(false)
  const [tagName, setTagName] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
  const [query, setQuery] = useState('')

  
  const [tags, setTags] = useState<Tag[]>([])
  const [fetchingTags, setFetchingTags] = useState(true)
  const [tagEvents, setTagEvents] = useState<any[]>([])


  const fetchTags = async () => {
    try {
      const res = await fetch('/api/user-tags')
      const data = await res.json()
      setTags(data.tags.reverse()) // newer first
    } catch (err) {
      console.error('Failed to fetch tags', err)
    } finally {
      setFetchingTags(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const handleSubmit = async () => {
    if (!tagName) return
    setLoading(true)

    try {
      await createTag({ name: tagName })
      setTagName('')
      setOpen(false)
      fetchTags() // 🔁 refresh tags immediately
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex flex-row min-w-fit'>
        <button
          onClick={() => setOpen(true)}
          className='rounded-md justify-between flex flex-row p-3 gap-1 min-w-fit
          text-white hover:text-black hover:bg-white bg-black border border-neutral-900'
        >
          <FolderOpen width={16} height={16} className='self-center' />
          <p className='p-regular-14 self-center ml-0.5'>New Group</p>
        </button>
      </div>

      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-neutral-950 border border-neutral-800 rounded-xl p-6 w-[90%] max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-white text-lg font-medium'>Create a new group</h2>
              <button onClick={() => setOpen(false)} className='text-neutral-400 hover:text-white'>
                <X />
              </button>
            </div>

            <input
              type='text'
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder='Group name'
              className='w-full p-3 mb-4 rounded-md border border-neutral-800 bg-neutral-900 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20'
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className='w-full bg-white text-black py-2 px-4 rounded-md hover:bg-white/90 disabled:opacity-50 transition-all'
            >
              {loading ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-2 overflow-x-auto max-w-fit">
        {fetchingTags ? (
            <p className="text-white"></p>
            ) : (
            tags.map(tag => (
                <button
                key={tag._id}
                onClick={async () => {
                setSelectedTag(tag)
                const res = await fetch('/api/events-by-tag', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tagId: tag._id }) // 👈 send tagId
                })

                const data = await res.json()
                setTagEvents(data.data || [])
                }}

                className="rounded-md justify-between flex flex-row p-3 pr-1 gap-1
                text-white hover:text-white hover:bg-white/10 bg-white/5 border border-neutral-900 min-w-fit"
                >
                <p className="p-regular-14 self-center">{tag.name}</p>
                <EllipsisVertical width={16} height={16} className="self-center text-white/40" />
                </button>
            ))
            )}
      </div>

      {selectedTag && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 w-[90%] max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-medium">Group Details</h2>
        <button
          onClick={() => setSelectedTag(null)}
          className="text-neutral-400 hover:text-white"
          aria-label="Close modal"
        >
          <X />
        </button>
      </div>

      {selectedTag && (
        <>
        <div>
        <p className="text-white text-xl font-semibold">{selectedTag?.name}</p>
        </div>
        <div className='w-full mt-3'>
        <div className="flex gap-2 overflow-x-auto w-full snap-x snap-mandatory">
        {tagEvents.map(event => (
            <div key={event._id} className='text-white/80 snap-start min-w-[90%] text-sm border rounded-sm border-neutral-800 p-4 w-full'>
            <Link href={`/profile/${event._id}/sales-report`}>
            <div className='flex flex-row gap-4'>

            <div className='max-w-xl'> {/* Openning of ticket artwork div */}
            <div className="flex md:mb-0 md:mt-0 h-20 md:min-h-32 bg-none
            justify-start items-start">
            <div className="h-fit max-w-[60px] 
                    md:h-full md:max-w-[60px] lg:max-h-[250px]
                    lg:max-w-[350px] flex items-start justify-start small-box">
                <Image src={event ? event.imageURL : '/assets/images/dt-icon.svg'} alt="Ticket artwork"
                width={100} height={100}
                className="h-20 md:max-w-[250px] border border-0.5 
                border-neutral-800/40 object-contain 
                    w-auto md:w-fit rounded-[calc(var(--radius)-6px)] spin"
                />
            </div>
            </div>
            </div>

            <div className='self-center'>
            <p className='w-full p-bold-14'>{event.title}</p>
            <p className='w-full p-regular-14 text-neutral-600'>Created at {formatDateTime(event.createdAt).timeOnly} on {formatDateTime(event.createdAt).dateOnly}</p>
            </div>

            </div>
            </Link>


                <div className='flex flex-wrap gap-1 mt-4'>
                <div className='flex flex-row gap-1'>
                  <p className={`p-0.5 px-2 bg-white/10 text-neutral-300 w-fit ibm-12 rounded-sm ${ event.quantity > 0 ? 'text-white' : 'text-red-600 bg-red-700/20' }`}>{event.quantity === 0 ? 'Out of stock' : `${event.quantity} in stock`}</p>
                </div>

                <div className='flex flex-row gap-1'>
                  <p className={`p-0.5 px-2 text-neutral-700 bg-white/10 w-fit ibm-12 rounded-sm 
                    ${event.isFree && event.amountSold > 0 ? 'text-yellow-400 bg-yellow-400/20' : `${ event.amountSold > 0 ? 'text-lime bg-lime-400/15' : 'text-neutral-700'}`}
                    
                    `}>{event.amountSold} { event.isFree ? 'collected' : 'sold'}</p>
                </div>

                { !event.isFree ? <div className='flex flex-row gap-1'>
                  <p className='p-0.5 px-2 text-black paystack-button w-fit ibm-12 rounded-sm'>₦{Number(event.price) * event.amountSold} made</p>
                </div> : <div></div>}
              </div>
            </div>
        ))}
        </div>
        </div>
        </>
        )}
    </div>
  </div>
)}

    </>
  )
}

export default Tags
