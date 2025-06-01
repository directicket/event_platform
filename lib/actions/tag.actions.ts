"use server"

import { CreateTagParams } from "@/types"
import { connectToDatabase } from "../database"
import { handleError } from "../utils"
import Tag from "../database/models/tag.model"
import { auth } from "@clerk/nextjs/server"
import Event from "../database/models/event.model"
import User from "../database/models/user.model"
import { string } from "zod"

export const createTag = async ({
  name,
}: {
  name: string;
}) => {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")
  await connectToDatabase();

  const mongoUser = await User.findOne({ clerkId: userId });
  if (!mongoUser) throw new Error("User not found");

  const newTag = await Tag.create({
    name,
    owner: mongoUser._id,
    createdAt: new Date(),
  });

  return JSON.parse(JSON.stringify(newTag));
};



export const getUserTags = async () => {
  try {
    const { userId } = auth()
    if (!userId) throw new Error("Unauthorized")

    await connectToDatabase()

    const mongoUser = await User.findOne({ clerkId: userId })
    if (!mongoUser) throw new Error("User not found")

    const tags = await Tag.find({ owner: mongoUser._id }).sort({ createdAt: 1 })

    return JSON.parse(JSON.stringify(tags))
  } catch (error) {
    handleError(error)
  }
}

export const updateTag = async ({
    tagId,
    newName,
}: {
    tagId: string;
    newName: string;
}) => {
    try {
        const { userId } = auth()
        if (!userId) throw new Error("Unauthorized")

        await connectToDatabase()

        const existing = await Tag.findOne({ name: newName, owner: userId })
        if (existing) throw new Error("You already have a tag with this name")

        const updatedTag = await Tag.findOneAndUpdate(
            { _id: tagId, owner: userId },
            { name: newName },
            { new: true }
        );

        if (!updatedTag) throw new Error("Tag not found or unauthorized");

        return JSON.parse(JSON.stringify(updatedTag))
    } catch (error) {
        handleError(error)
    }
}

export const deleteTag = async (tagId: string) => {
    try {
        const { userId } = auth()
        if (!userId) throw new Error("Unauthorized")

        await connectToDatabase()

        const deleted = await Tag.findOneAndDelete({ _id: tagId, owner: userId })

        if (!deleted) throw new Error("Tag not found or unauthorized");

        //remove tag from all events that had/have it
        await Event.updateMany({ tag: tagId }, { tag: "" })

        return JSON.parse(JSON.stringify(deleted));
    } catch (error) {
        handleError(error)
    }
}

export const assignTagToEvent = async ({
  eventId,
  tagId,
}: {
  eventId: string
  tagId: string
}) => {
  try {
    const { userId } = auth()
    if (!userId) throw new Error('Unauthorized')

    await connectToDatabase()

    const mongoUser = await User.findOne({ clerkId: userId })
    if (!mongoUser) throw new Error('User not found')

    const tag = await Tag.findOne({ _id: tagId, owner: mongoUser._id })
    if (!tag) throw new Error('Tag not found or unauthorized')

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { tags: tag._id }, // single tag assignment, NOT array
      { new: true }
    )

    if (!updatedEvent) throw new Error('Event not found')

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}

export const updateTagOnEvent = async ({
    eventId,
    newtagId,
}: {
    eventId: string,
    newtagId: string,
}) => {
    try {
        const { userId } = auth()
        if (!userId) throw new Error("Unauthorized")
        
        await connectToDatabase()

        const tag = await Tag.findOne({ _id: newtagId, owner: userId })
        if (!tag) throw new Error("Tag not found or unauthorized");

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { tag: newtagId },
            { new: true}
        );

        if (!updatedEvent) throw new Error("Event not found");

        return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
        handleError(error)
    }
}