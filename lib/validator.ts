import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, 'Event title must be at least 3 characters'),
    description: z.string().min(3, 'Your description must be at least 3 characters').max(400, 'Your description must be less than 400 characters'),
    location: z.string().min(3, 'Event location must be at least 3 characters').max(400, 'Event location must be less than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    quantity: z.number().min(1, 'You must sell at least 1'),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
  })