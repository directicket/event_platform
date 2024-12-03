// import crypto from 'crypto'
// import { NextResponse } from 'next/server'
// import { createOrder } from '@/lib/actions/order.actions'

// export async function POST(request: Request) {
//   const body = await request.text()

//   // Verify the signature from Paystack webhook
//   const signature = request.headers.get('x-paystack-signature') as string
//   const secret = process.env.PAYSTACK_SECRET_KEY! // Your Paystack secret key

//   // Generate a hash using your secret key and compare with signature
//   const hash = crypto.createHmac('sha512', secret).update(body).digest('hex')

//   if (hash !== signature) {
//     return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 400 })
//   }

//   const event = JSON.parse(body)

//   // Check the event type
//   const eventType = event.event

//   // CREATE ORDER if the event is a charge success
//   if (eventType === 'charge.success') {
//     const { reference, amount, metadata } = event.data

//     const order = {
//       paystackReference: reference,
//       eventId: metadata?.eventId || '',
//       buyerId: metadata?.buyerId || '',
//       totalAmount: amount ? (amount / 100).toString() : '0',
//       createdAt: new Date(),
//     }

//     const newOrder = await createOrder(order)
//     return NextResponse.json({ message: 'OK', order: newOrder })
//   }

//   return new Response('', { status: 200 })
// }
