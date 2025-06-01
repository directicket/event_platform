'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Tag {
  _id: string
  name: string
}

const TagDropdown = ({
  eventId,
  currentTagId,
}: {
  eventId: string
  currentTagId: string
}) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<string>(currentTagId || '')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/user-tags')
        const data = await res.json()
        setTags(data.tags || [])
      } catch (err) {
        console.error('Failed to fetch tags', err)
      }
    }

    fetchTags()
  }, [])

  const handleSelect = async (tagId: string) => {
    try {
      const res = await fetch('/api/assign-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagId, eventId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Tag assignment failed')
      setSelectedTag(tagId)
    } catch (err) {
      console.error('Error assigning tag:', err)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <select
        className="p-0 text-neutral-200 bg-white/10 border border-neutral-800 w-fit p-regular-12 rounded-sm cursor-pointer"
        value={selectedTag}
        onChange={e => handleSelect(e.target.value)}
      >
        <option value="" disabled>No Group</option>
        {tags.map(tag => (
          <option key={tag._id} value={tag._id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TagDropdown
