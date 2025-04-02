'use client'

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getEventById } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import { IBM_Plex_Mono } from 'next/font/google';
import { useUser } from "@clerk/nextjs";

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

export default function QRCodePage({ params: { id } }: { params: { id: string } }) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [event, setEvent] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reference = searchParams.get('reference');

    if (!reference) {
      console.error('Reference not found');
      return;
    }

    const fetchQRCode = async () => {
      try {
        const response = await fetch('/api/generate-qr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reference }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch QR code');
        }

        const blob = await response.blob();
        const qrCodeUrl = URL.createObjectURL(blob);
        setQrCode(qrCodeUrl);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    const fetchEventDetails = async () => {
      try {
        const eventData = await getEventById(id);
        if (eventData) {
          setEvent(eventData);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchQRCode();
    fetchEventDetails();
  }, [mounted, searchParams, id]);

    const captureRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!captureRef.current) return;
  
    setIsDownloading(true);
  
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#000",
        scale: 2,
      });
  
      // Get data URL
      const dataUrl = canvas.toDataURL("image/png");
      
      // Check if it's a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // For mobile: Open image in new tab (user can then save it)
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(`
            <html>
              <head>
                <title>Your Ticket</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { margin: 0; padding: 10px; background: #f0f0f0; text-align: center; }
                  img { max-width: 100%; height: auto; }
                  p { font-family: Arial, sans-serif; margin-top: 20px; }
                </style>
              </head>
              <body>
                <img src="${dataUrl}" alt="Your Ticket" />
                <p>Press and hold the image to save it to your device.</p>
              </body>
            </html>
          `);
          newTab.document.close();
        } else {
          // If popup blocked, fallback to download approach
          window.location.href = dataUrl.replace("image/png", "image/octet-stream");
        }
      } else {
        // Desktop approach (original code)
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "event-ticket.png";
            document.body.appendChild(link);
            
            setTimeout(() => {
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }, 100);
          } else {
            console.error("Failed to generate blob");
          }
        }, "image/png");
      }
    } catch (error) {
      console.error("Download failed", String(error));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
    
      <div className="wrapper md:max-w-xl text-white grid grid-cols-1 gap-2 md:gap-4 justify-center items-center mb-8">
        
        <div className='flex flex-col mb-2'>
          <div className='flex flex-row gap-1'>
            <CircleCheck height={18} width={18} className='text-lime-500 self-center'/>
            <p className='p-semibold-16 text-white self-center'>Purchase Successful</p>
          </div>
        </div>

        {qrCode ? (
          <>
          <div ref={captureRef}>
          <div className="p-4 px-5 md:px-4 border border-neutral-800 flex flex-col gap-2 md:gap-4">

            <p className='h3-regular leading-none'>{event ? event.title : 'Loading Ticket...'}</p>

            <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
            <div className="flex flex-auto gap-4 justify-between align-baseline">
              <div className='flex flex-col w-full'>
                <p className="p-regular-14 md:p-regular-18 text-neutral-600">Date</p>
                <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px]">{event ? formatDateTime(event.endDateTime).dateOnly : 'Loading...'}</p>
              </div>

              <div className='flex flex-row gap-3 w-full'>
                <div className='flex flex-col w-full'>
                  <p className="p-regular-14 md:p-regular-18 text-neutral-600">Time</p>
                  <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px]">{event ? formatDateTime(event.endDateTime).timeOnly : 'Loading...'}</p>
                </div>

                <div className='flex flex-col w-full'>
                  <p className="p-regular-14 md:p-regular-18 text-neutral-600">Organizer</p>
                  <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px] line-clamp-1">{event?.organizer?.username ? `@${event.organizer.username}` : 'Loading...'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-auto gap-4 justify-between align-baseline">
              <div className='flex flex-col self-center w-full'>
                <p className="p-regular-14 md:p-regular-18 text-neutral-600">Location</p>
                <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px]">{event ? event.location : ' '}</p>
              </div>

              <div className='flex flex-col justify-start w-full'>
                <p className="p-regular-14 md:p-regular-18 text-neutral-600">Category</p>
                <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px]">{event ? event.category.name : ' '}</p>
              </div>
            </div>
            </div>

            <hr className='border border-neutral-800 mt-3 mb-3 border-dashed'/>

            <div className='flex flex-auto gap-2 self-start mb-1'>
            <img src={qrCode} alt="QR Code"
            className="w-20 h-20 self-center" />

            <div className='w-48 self-end'>
              <p className='text-neutral-600 p-regular-12 md:p-regular-14 self-end'>
                Do not share this code with anyone. 
                You will be asked to present this Ticket before entry.
              </p>
            </div>
            </div>
            </div>
          </div>
          </div>
          </>
        ) : (
          <p className='text-neutral-600 text-left'>Loading your Ticket...</p>
        )}

        <div>
          <p className='p-regular-14 text-neutral-600 mt-2'>
            This is ticket will be scanned before entry, store it securely.
            Ticket is valid until date and time of the event.
          </p>
          <button onClick={handleDownload} disabled={isDownloading} className={`${ibmMono.className}
          border border-white hover:text-black hover:bg-white
          ibm-14 md:ibm-16 mt-2 p-2 bg-black text-white w-full rounded-none`}>{ isDownloading ? 'DOWNLOADING...' : 'DOWNLOAD YOUR TICKET' }
          </button>
        </div>
      </div>
    </>
  );
}
