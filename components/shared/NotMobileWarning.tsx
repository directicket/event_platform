'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const NotMobileWarning = () => {
    const [isNotMobile, setIsNotMobile] = useState(false)

    useEffect(() => {
        const check = () => {
            const ua = navigator.userAgent.toLowerCase()
            const isPhone = /iphone|android.*mobile|windows phone/.test(ua)
            if (!isPhone) setIsNotMobile(true)
        }

        check()
    }, [])

    if (!isNotMobile) return null

    return (
        <div className='fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center text-center p-8'>
            <Image 
            src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://directicket.live' 
            alt='QR to Directicket' 
            width={200} height={200}
            className='mb-4 border-8 border-white'
            />
            <h1 className='h2-bold mb-2'>Directicket is built for mobile.</h1>
            <p className='mb-4 p-medium-16'>Scan the QR code with your phone to try it.</p>
        </div>
    )
}

export default NotMobileWarning