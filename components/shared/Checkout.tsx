import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Checkout = () => {
  return (
    <Button asChild className="rounded-sm bg-blue-600 w-full">
        <Link href="/profile">
          Get Ticket
        </Link>
    </Button>
  )
}

export default Checkout