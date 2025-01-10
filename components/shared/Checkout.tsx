import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Checkout = () => {
  return (
    <Button asChild className='text-center rounded-none
           w-full bg-white hover:bg-white' size="lg">
        <Link href="/profile">
        <p className='text-black p-medium-16 md:p-medium-20 text-wrap p-3'>
          Get Ticket
        </p>
        </Link>
    </Button>
  )
}

export default Checkout