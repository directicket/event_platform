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
      expiryDate: new Date(event.expiryDate),
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
        return (
          <div>ADD IMAGES</div>
        )
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
          router.push(`/profile`)
          form.reset();
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
          path: `/events/${eventId}` //was previously `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/profile`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='text-neutral-600'>Ticket Artwork &bull; 1080 &times; 1920</FormLabel>
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

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-neutral-600">Ticket Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Party - VIP Ticket" {...field} 
                  className="p-regular-16 text-white
                  rounded-md border border-neutral-800
                  bg-black 
                  outline-offset-0 
                  focus-visible:ring-white 
                  focus-visible:ring-offset-0"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>

        <div className="flex flex-col gap-5">
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='text-neutral-600'>Description</FormLabel>
                <FormControl className="h-70">
                  <Textarea placeholder="Describe the benefits of getting this ticket to buyers & give additional info about your event." {...field} 
                  className="p-regular-16 text-white
                  rounded-md border border-neutral-800
                  bg-black 
                  outline-offset-0 
                  focus-visible:ring-white 
                  focus-visible:ring-offset-0"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>

        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='text-neutral-600'>Ticket Price</FormLabel>
                <FormControl>
                  <div className="flex-center w-full gap-4 rounded-none justify-between">
                    <Input type="tel" inputMode="numeric" placeholder="5000" {...field} 
                    className="p-regular-16 text-white
                    rounded-md border border-neutral-800
                    bg-black 
                    outline-offset-0 
                    focus-visible:ring-white 
                    focus-visible:ring-offset-0"/>
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label htmlFor="isFree" className="text-white whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                              <Checkbox 
                              onCheckedChange={field.onChange} 
                              checked={field.value}
                              id="isFree" className="mr-2 rounded-sm h-5 w-5 border border-yellow-300" />
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
          name="quantity"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-neutral-600">Stock</FormLabel>
              <FormControl>
              <div className="flex-center w-full gap-4 rounded-none justify-between">
                <Input
                  className="p-regular-16 text-white
                  rounded-md border border-neutral-800
                  bg-black 
                  outline-offset-0 
                  focus-visible:ring-white 
                  focus-visible:ring-offset-0"
                  type="tel" inputMode="numeric"
                  min="1"
                  value={field.value}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          
        </div>

        <div className="flex flex-col gap-5">
        <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className='text-neutral-600'>Web Link (Copy &amp; Paste)</FormLabel>
                  <FormControl>
                      <Input placeholder="Spotify playlist, Instagram, etc." {...field} 
                      className="p-regular-16 text-white
                      rounded-md border border-neutral-800
                      bg-black 
                      outline-offset-0 
                      focus-visible:ring-white 
                      focus-visible:ring-offset-0"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='text-neutral-600'>Expiry</FormLabel>
                <FormControl >
                    <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    wrapperClassName="datePicker text-red-500 p-0"
                    withPortal={true}
                    onFocus={(e) => e.target.blur()}
                    />
                </FormControl>

                <p className="text-neutral-600 p-regular-14 flex text-wrap">
                  Control when unscanned QR codes become invalid.</p>
                <FormMessage />
              </FormItem>
            )}
          />


        <div className='flex flex-col gap-2 mt-8'>
          <p className='p-medium-16 text-neutral-400/60'>Additional Info</p>
          <hr className="border-0.5 border-neutral-400/50"/>
        </div>

          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='text-neutral-600'>Event Date & Time</FormLabel>
                <FormControl >
                    <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    wrapperClassName="datePicker text-red-500 p-0"
                    withPortal={true}
                    onFocus={(e) => e.target.blur()}
                    />
                </FormControl>

                <p className="text-neutral-600 p-regular-14 flex text-wrap">
                  You can update this later.</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='text-neutral-600'>Event Type</FormLabel>
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className='text-neutral-600'>Event Location</FormLabel>
                  <FormControl>
                      <Input placeholder="Enter the exact location" {...field} 
                      className="p-regular-16 text-white
                      rounded-md border border-neutral-800
                      bg-black 
                      outline-offset-0 
                      focus-visible:ring-white 
                      focus-visible:ring-offset-0"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>


        
        <Button 
          type="submit" 
          size="default" 
          className=" w-full mb-1 min-h-3 bg-white hover:bg-white text-black rounded-md"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            'Please wait...'
          ): `${type} Ticket`}</Button>

          <div className="md:max-w-4xl ">
        <p className="text-neutral-600 p-regular-14 wrapper text-center mt-[-30px]">By clicking 'Create Ticket' you agree to our Terms of Use.</p>
        </div>
      </form>
    </Form>
  )
}

export default EventForm