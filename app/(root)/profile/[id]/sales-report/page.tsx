import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getEventById } from '@/lib/actions/event.actions'
import Order from "@/lib/database/models/order.model";
import { connectToDatabase } from '@/lib/database'
import { formatDateTime } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions';
import { ChartColumnIncreasing } from 'lucide-react';
import { now } from 'mongoose';

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
  
  const orders = await Order.find({ event: params.id })
  .sort({ createdAt: -1 })
  .populate('buyer')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1);

  const ordersToday = orders.filter(order => {
    const orderDate = new Date(order.createdAt)
    return orderDate >= today
  }).length

  const ordersYesterday = orders.filter(order => {
    const date = new Date(order.createdAt)
    return date >= yesterday && date < today;
  }).length

  let percentageChange = 0
  if (ordersYesterday === 0 && ordersToday > 0) {
    percentageChange = 100
  } else if (ordersYesterday > 0) {
    percentageChange = ((ordersToday - ordersYesterday) /ordersYesterday) * 100
  }

  const now = new Date()
  const twentyFourHoursAgo = new Date()
  twentyFourHoursAgo.setHours(now.getHours() - 24)

  // get orders form last 24hrs
  const recentOrders = orders.filter(order => {
    const createdAt = new Date(order.createdAt)
    return createdAt >= twentyFourHoursAgo;
  })

  // group by hour (0-23)
  const hourlyCounts: { [key: number]: number } = {};

  recentOrders.forEach(order => {
    const hour = new Date(order.createdAt).getHours()
    hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1
  });

  //find peak hour
  let peakHour = null
  let peakCount = 0

  Object.entries(hourlyCounts).forEach(([hourStr, count]) => {
    const hour = parseInt(hourStr)
    if (count > peakCount) {
        peakHour = hour
        peakCount = count
    }
  });

  // format peak hour
  const formatHour = (hour: number) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formatted = hour % 12 === 0 ? 12 : hour % 12;
    return `${formatted}${suffix}`
  }

  const peakHourLabel = peakHour !== null ? `${formatHour(peakHour)} - ${formatHour((peakHour + 1) % 24)}` : null;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white mt-16">
      <h1 className="h2-regular mb-2"><span className='text-neutral-600'>Sales Report:</span><br/>{event.title}</h1>
      
      <div className='flex flex-row justify-between'>
      <p className='p-regular-12 mt-4 text-white'>Created on {formatDateTime(event.createdAt).dateOnly}</p>
      <p className='p-regular-12 mt-4 text-lime'>
        {event.isFree ? <span className='text-yellow-300'>FREE</span> 
        : `₦${event.price}`}
      </p>
      </div>

      <hr className='border-0.5 border-neutral-700 my-4'/>

      <div className='flex flex-wrap justify-between mt-8'>
      <div className='flex flex-col gap-1'>
        <p className='p-semibold-24'>{event.amountSold}</p>
        <p className='p-regular-14 text-neutral-600'>All time sales</p>
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex-row flex gap-1'>
        <p className='p-semibold-24'>{ordersToday}</p>
        <p className={percentageChange >= 0 ? `rounded-md p-1 ibm-12 ${event.isFree ? 'text-yellow-400 bg-yellow-400/10' : 'text-lime bg-green-500/10'}` : 'rounded-md p-1 ibm-12 text-red-500 bg-red-500/10'}>
            {percentageChange >= 0 ? '+' : ''}
            {percentageChange.toFixed(2)}%
        </p>
        </div>
        <p className='p-regular-14 text-neutral-600'>Sales today</p>
      </div> 

      {/* <div className='border-0.5 border-neutral-700 border-r'></div> */}

      <div className='flex flex-col gap-1'>
        <p className='p-semibold-24'>
        <span className={`${
            event.quantity < 10
                ? 'text-red-600'
                : event.quantity <= 30
                ? 'text-yellow-600'
                : ''
            }`}
        >
            {event.quantity}
        </span>
        </p>
        <p className='p-regular-14 text-neutral-600'>In stock</p>
      </div>
      
      </div>

      <hr className='border-0.5 border-neutral-800/80 my-4'/>

      {peakHourLabel ? 
      <div className='flex flex-row justify-between mt-1'>
      <p className='p-regular-14 text-white'>Peak sales period: </p>
      <p className={`p-medium-14 ${event.isFree ? 'text-yellow-400' : 'text-lime'}`}>
        {peakHourLabel}
      </p>
      </div> 
      : 
      <div className='flex flex-row justify-between mt-1'>
      <p className='p-regular-14 text-neutral-600'>No sales in the last 24 hours</p>
      </div>
      }
      <hr className='border-0.5 border-neutral-800/80 my-4'/>

      {orders.length === 0 ? (
        <p className='text-neutral-600 text-lg'>No purchases yet.</p>
      ) : (
        <table className="w-full text-sm mt-8">
          <thead>
            <tr className="bg-none text-neutral-700">
              <th className="p-2 border-b border-neutral-800 text-left">Customer</th>
              <th className="p-2 border-b border-neutral-800 text-left">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} className="text-neutral-300">
                <td className="p-2 border-b border-neutral-800/70">
                  {order.buyer?.firstName} {order.buyer?.lastName}
                </td>
                <td className="p-2 border-b border-neutral-800/70">{formatDateTime(order.createdAt).dateOnly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
