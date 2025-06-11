import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, 'Event title must be at least 3 characters'),
    description: z.string().min(3, 'Your description must be at least 3 characters').max(400, 'Your description must be less than 400 characters'),
    location: z.string().min(3, 'Event location must be at least 3 characters').max(400, 'Event location must be less than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    expiryDate: z.date(),
    quantity: z.number().min(1, 'You must sell at least 1'),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
  })

  export const completeProfileSchema = z.object({
  clerkId: z.string(),
  gender: z.enum(['Male', 'Female', 'Rather Not Say']),
  day: z.string().min(1).max(2),
  month: z.string().min(1).max(2),
  year: z.string().min(4).max(4),
  bio: z.string().max(300).optional()
})
