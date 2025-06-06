'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Event from '@/lib/database/models/event.model'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateEvent = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName username' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)
    if (!organizer) throw new Error('Organizer not found')

    const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    await connectToDatabase()

    const event = await populateEvent(Event.findById(eventId))

    if (!event) throw new Error('Event not found')

    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase()

    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase()

    const deletedEvent = await Event.findByIdAndDelete(eventId)
    if (deletedEvent) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllEvents({ query, limit = 400, page, category }: GetAllEventsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({
  userId,
  limit = 400,
  page = 1,
  query,
}: GetEventsByUserParams & { query?: string }) {
  try {
    await connectToDatabase();

    const mongoUser = await User.findById(userId)
    if (!mongoUser) throw new Error('User not found');

    const titleCondition = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};

    const conditions: any = {
    $and: [
      { organizer: mongoUser._id },
      titleCondition
    ],
  };

  // If it's a search, exclude dummy event(s)
  if (query) {
  conditions.$and.push({ url: { $exists: true, $ne: null } });
  }



    const skipAmount = (page - 1) * limit;

    let eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    let events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

        // If user has no events, create one dummy event
        // If user has no events AT ALL (not just filtered by query), create one dummy event
    if (!query) {
      const totalUserEvents = await Event.countDocuments({ organizer: mongoUser._id });

      if (totalUserEvents === 0) {
        const defaultCategory = await Category.findOne({ name: 'Party' });

        const dummyEvent = new Event({
          title: 'Demo Party - Regular Ticket',
          description: 'This is a dummy ticket made by Directicket.',
          location: 'Abuja, Nigeria',
          imageURL: 'https://x8ismcy6r4.ufs.sh/f/d45f822b-75a0-413e-a19b-9c323ea56ec3-1xdpbn.jpeg',
          startDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
          expiryDate: new Date(),
          quantity: 100,
          price: '5000',
          isFree: false,
          organizer: mongoUser._id,
          category: defaultCategory?._id,
        });

        await dummyEvent.save();
        events = await populateEvent(Event.find({ _id: dummyEvent._id }));
      }
    }

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit) || 1,
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 12,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}