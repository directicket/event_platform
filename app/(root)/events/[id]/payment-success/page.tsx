'use client'

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getEventById } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import html2canvas from 'html2canvas';
import { IBM_Plex_Mono } from 'next/font/google';
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

export default function QRCodePage({ params: { id } }: { params: { id: string } }) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [event, setEvent] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const { user } = useUser();

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
      if (user?.primaryEmailAddress) {
        fetch("/api/send-email-no-qr", {
          method: "POST",
          body: JSON.stringify({
              to: user.primaryEmailAddress.emailAddress,
              eventId: id,
          }),
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        })
        .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem(`emailSent-${id}`, "true");
                }
            })
            .catch((err) => console.error("Error sending email:", err));
      }

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

  return (
    <>
    
      <div className="wrapper md:max-w-xl text-white grid grid-cols-1 gap-2 md:gap-4 justify-center items-center mb-8">
        
        <div className='flex flex-col mb-2'>
          <div className='flex flex-row gap-1'>
            <CircleCheck height={18} width={18} className='text-lime-500 self-center'/>
            <p className='p-semibold-16 text-white self-center'>Purchase Successful</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col p-4 bg-neutral-950/60 border border-neutral-800/50 gap-1">
            <div className="flex flex-row gap-[7.5px]">
              <TriangleAlert width={18} height={18} className='text-yellow-300'/>
              <p className={`${ibmMono.className} ibm-14 text-white self-center`}>PROTECT YOUR QR CODE</p>
            </div>
            <p className="p-regular-14 md:p-regular-16 text-neutral-600">
              The QR code on this ticket can only be scanned once and cannot be gotten back afterwards.</p>
          </div>
        </div>

        {qrCode ? (
          <>
          <div className="p-4 px-5 md:px-4 border border-neutral-800 flex flex-col gap-2 md:gap-4">


            <div className='max-w-xl lg:px-10 md:px-8 self-center'> {/* Openning of ticket artwork div */}
              <div className="flex mt-6 mb-20 md:mb-0 md:mt-0 min-h-96 bg-black 
                justify-center items-center overflow-hidden" 
                style={{ height: '100px' }}>
                <div className="box h-[205px] max-w-[150px] 
                      md:max-h-[305px] md:max-w-[250px] lg:max-h-[405px]
                      lg:max-w-[350px] flex items-center justify-center">
                  <Image src={event ? event.imageURL : '/assets/images/dt-icon.svg'} alt="Ticket artwork"
                    width={100} height={100}
                    className="h-full border border-0.5 
                    border-neutral-800/40 object-contain 
                      w-auto spin"
                  />
                </div>
              </div>
            </div>

            <p className='h3-regular leading-none'>{event ? event.title : 'Loading Ticket...'}</p>

            <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
            <div className="flex flex-auto gap-4 justify-between align-baseline">
              <div className='flex flex-col w-full'>
                <p className="p-regular-14 md:p-regular-18 text-neutral-600">Date</p>
                <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px]">{event ? formatDateTime(event.startDateTime).dateOnly : 'Loading...'}</p>
              </div>

              <div className='flex flex-row gap-3 w-full'>
                <div className='flex flex-col w-full'>
                  <p className="p-regular-14 md:p-regular-18 text-neutral-600">Created</p>
                  <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px]">{event ? formatDateTime(event.createdAt).timeOnly : 'Loading...'}</p>
                </div>

                <div className='flex flex-col w-full'>
                  <p className="p-regular-14 md:p-regular-18 text-neutral-600">Creator</p>
                  <p className="p-regular-14 md:p-regular-18 text-white mt-[-2px] line-clamp-1">{event?.organizer?.username ? `/${event.organizer.username}` : 'Loading...'}</p>
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
              <p className='text-white p-regular-12 md:p-regular-14 self-end'>
                Do not share this code with anyone. 
                You will be asked to present this Ticket before entry.
              </p>
            </div>
            </div>
            </div>
          </div>
          </>
        ) : (
          <p className='text-neutral-600 text-left'>Loading your Ticket...</p>
        )}

        <div>
          <p className='p-regular-14 text-white mt-2'>
            You can always view this ticket via this link. DO NOT share this link with anyone.
            Ticket is valid until date and time of the event.
          </p>
        </div>
      </div>
    </>
  );
}
