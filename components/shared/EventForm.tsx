"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import { Banknote, Calendar, Link, MapIcon, MapPinIcon } from "lucide-react"
import DatePicker from "react-datepicker"
import { useUploadThing } from '@/lib/uploadthing'

import "react-datepicker/dist/react-datepicker.css"
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { iEvent } from "@/lib/database/models/event.model"


type EventFormProps = {
    userId: string
    type: "Create" | "Update"
    event?: iEvent,
    eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = event && type === 'Update' 
    ? {
      ...event, 
      startDateTime: new Date(event.startDateTime),
      endDateTime: new Date(event.endDateTime)
    }
    : eventDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageURL: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!eventId) {
        router.back()
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageURL: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Ticket Name</FormLabel>
                <FormControl>
                  <Input placeholder="Main Town City Party" {...field} className="p-regular-16 rounded-sm border-0 outline-offset-0 focus-visible:ring-blue-600 focus-visible:ring-offset-0"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel><span className="text-orange-600">(New) {' '}</span>Category</FormLabel>
                <p className="text-muted-foreground p-medium-12 flex mt-[-20px]">
                  Ticket Tags are a new way to let buyers know what kind of ticket you're selling without having to include it in your Ticket Name.</p>
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl className="h-70">
                  <Textarea placeholder="Describe the benefits of getting this ticket to buyers & give additional info about your event." {...field} className="p-regular-16 rounded-sm border-0 outline-offset-0 focus-visible:ring-blue-600 focus-visible:ring-offset-0"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Poster</FormLabel>
                <FormControl className="h-70">
                  <FileUploader 
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm justify-between ">
                      <MapPinIcon className="text-gray-500"/>
                      <Input placeholder="Enter the exact location" {...field} className="p-regular-16 rounded-sm border-0 outline-offset-0 focus-visible:ring-blue-600 focus-visible:ring-offset-0"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Date & Time</FormLabel>
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm justify-between">
                    <Calendar className="text-blue-500 h-[55px] w-[55]"/>
                    <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    wrapperClassName="datePicker text-blue-500"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sales Deadline</FormLabel>
                <p className="text-muted-foreground p-medium-12 flex mt-[-20px]">Add a date & time for sales of this Ticket to stop. You can update this later.</p>
                <FormControl >
                  <div className="flex-center mt-[-20px] h-[55px] w-full overflow-hidden rounded-sm justify-between">
                    <Calendar className="text-red-500 h-[55px] w-[55]"/>
                    <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    wrapperClassName="datePicker text-red-500"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ticket Price</FormLabel>
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm justify-between">
                    <Banknote className="text-gray-500 h-[52px] w-[52px]"/>
                    <Input type="number" placeholder="5000" {...field} className="p-regular-16 border-0 outline-offset-0 focus-visible:ring-blue-600 focus-visible:ring-offset-0"/>
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                              <Checkbox 
                              onCheckedChange={field.onChange} 
                              checked={field.value}
                              id="isFree" className="mr-2 h-5 w-5 border-2 border-blue-600" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Social Media Link (Copy &amp; Paste)</FormLabel>
                  <FormControl>
                    <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm justify-between ">
                      <Link className="text-gray-500"/>
                      <Input placeholder="https://website.com/yourusername" {...field} className="p-regular-16 rounded-sm border-0 outline-offset-0 focus-visible:ring-blue-600 focus-visible:ring-offset-0"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        
        <Button 
          type="submit" 
          size="lg" 
          className="bg-blue-700 col-span-2 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Ticket`}</Button>
      </form>
    </Form>
  )
}

export default EventForm