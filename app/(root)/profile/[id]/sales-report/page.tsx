import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getEventById } from '@/lib/actions/event.actions'
import Order from "@/lib/database/models/order.model";
import { connectToDatabase } from '@/lib/database'
import { formatDateTime } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions';
import { ChartColumnIncreasing } from 'lucide-react';

interface Props {
  params: {
    id: string
  }
}

export default async function SalesReportPage({ params }: Props) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  await connectToDatabase()
  const event = await getEventById(params.id)
  const userObject = await getUserById(event.organizer._id)

  console.log(event.organizer._id)
  console.log(userObject._id)

  if (userObject.clerkId !== userId) return <p className='text-red-500'>Access denied. You’re not the organizer of this event.</p>
  
  const orders = await Order.find({ event: params.id }).populate('buyer')

  return (
    <div className="p-6 max-w-4xl mx-auto text-white mt-16">
      <h1 className="text-2xl font-bold mb-2">Sales Report: {event.title}</h1>
      <div className='z-[999] p-regular-14 md:p-regular-14 flex flex-row gap-2 font-normal self-end bg-neutral-900/20 text-neutral-600 w-full border border-neutral-800/30 rounded-md p-4 mb-6'>
                    <ChartColumnIncreasing width={18} height={18} className='w-fit self-start text-white' /> 
                    <p className='self-center text-white w-full'>
                      There's more data on the way! <span className='font-semibold inset-0 text-neutral-600'>We're adding more to this space. Check back soon!</span>
                    </p>
                  </div>
                

      {orders.length === 0 ? (
        <p className='text-neutral-600 text-lg'>No orders yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700 text-sm">
          <thead>
            <tr className="bg-neutral-900 text-white">
              <th className="p-2 border border-gray-700">Buyer</th>
              <th className="p-2 border border-gray-700">Amount</th>
              <th className="p-2 border border-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} className="text-gray-300">
                <td className="p-2 border border-gray-700">
                  {order.buyer?.firstName} {order.buyer?.lastName}
                </td>
                <td className="p-2 border border-gray-700">₦{order.totalAmount}</td>
                <td className="p-2 border border-gray-700">{formatDateTime(event.createdAt).dateOnly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
