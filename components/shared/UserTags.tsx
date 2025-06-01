'use client'

import { EllipsisVertical } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Tag {
  _id: string
  name: string
}

const UserTags = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/user-tags')
        const data = await res.json()
        setTags(data.tags)
      } catch (err) {
        console.error('Failed to fetch tags', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  if (loading) return <p className="text-white">Loading...</p>

  return (
    <div className="flex flex-row gap-2 overflow-x-auto">
      {tags.map(tag => (
        <button
          key={tag._id}
          className="rounded-sm justify-between flex flex-row p-3 gap-1
          text-white hover:text-white hover:bg-white/10 bg-white/10 border border-neutral-900 min-w-max"
        >
          <p className="p-regular-14 self-center">{tag.name}</p>
          <EllipsisVertical width={16} height={16} className="self-center" />
        </button>
      ))}
    </div>
  )
}

export default UserTags
