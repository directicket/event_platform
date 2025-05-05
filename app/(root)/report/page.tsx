'use client'

import Form from '@/components/shared/ReportForm'
import { Info, TriangleAlert } from 'lucide-react'
import React, { useEffect } from 'react'
import { IBM_Plex_Mono } from "next/font/google";
import Footer from '@/components/shared/Footer';

const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0); //forces page to start at the top
    }, []); //empty dependency array so that this this only runs on page load
  return (
    <>
    <div className="wrapper flex flex-col items-center justify-center text-white mt-20">
        <div className="h-fit flex w-fit px-4 rounded-sm flex-row p-3 bg-red-500/15">
            <TriangleAlert className='text-red-600 flex-row mr-1' height={20} width={20}/>
            <p className={`${ibmMono.className} ibm-14 self-center pl-1 flex-row text-red-600`}>
                ENSURE DETAILS ARE ACCURATE
            </p>
        </div>

        <div className=" wrapper flex-col flex items-center justify-center w-full pt-10 h-fit bg-black">
            <h1 className="h2-regular w-full text-center align-middle pb-4">
                Report an issue to the directicket team.</h1>
            <p className="p-regular-14 text-center text-neutral-500 md:max-w-[55%]">
                Your report will be reviewed by a customer support team member and you'll be contacted via the email you provide.
            </p>

            {/* <div className=' bg-neutral-950 border border-neutral-800/50'> */}
            <Form />
            {/* </div> */}
        </div>
        {/* Button */}
        <div>
        
        </div>

        
    </div>

    <div className='text-white wrapper'>
    <Footer />
    </div>
    </>
  )
}