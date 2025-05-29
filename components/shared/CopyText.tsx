'use client'
import { Copy } from 'lucide-react'
import { useState } from 'react'

const CopyText = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false)

    const textToCopy = `https://${text}`

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy)
            } else {
                //fallback for nonsecure or older browsers
                const textarea = document.createElement('textarea')
                textarea.value = textToCopy
                textarea.style.position = 'fixed'
                textarea.style.opacity = '0'
                textarea.style.pointerEvents = 'none'
                textarea.setAttribute('readonly', '')
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                document.body.removeChild(textarea)
            }

            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.log('Failed to copy:', err)
        }
    }

    return (
        <button 
        onClick={handleCopy}
        className='text-sm mt-1 p-0.5 px-2 bg-white/10 text-neutral-300 w-fit ibm-12 rounded-sm'>
           <Copy height={14} width={14} className={`inline self-center mb-0.5 ${ copied ? 'hidden' : 'block'}`}/>{' '} 
           {copied ? 'Profile link copied!' : text}
          </button>
    )
}

export default CopyText