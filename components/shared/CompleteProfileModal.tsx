"use client"

import { useState } from "react"
import { completeProfileSchema } from "@/lib/validator" // Adjust this path
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type FormData = z.infer<typeof completeProfileSchema>

export default function CompleteProfileModal({ clerkId, userName, imageUrl }: { clerkId: string, userName: string, imageUrl: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
  resolver: zodResolver(completeProfileSchema),
  defaultValues: {
    day: "",
    month: "",
    year: "",
    gender: "Rather Not Say",
    bio: ""
  }
})


const onSubmit = async (data: FormData) => {
  
  setSubmitting(true)
  setSubmittedData(data)

  const payload = {
  ...data,
  clerkId
}

  const response = await fetch("/api/user/complete-profile", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  })

  if (response.ok) {
    window.location.reload()
  } else {
    // handle error
  }

  setSubmitting(false)
}


  return (
    <div className="wrapper fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 py-8 rounded-2xl w-full max-w-md space-y-6"
      >

        <div className='flex flex-row gap-3'>
        <img 
        src={imageUrl} 
        alt={`profile picture`}
        className="w-20 h-20 rounded-full object-cover border border-neutral-800 self-center"
        />
        <div className="flex flex-col gap-1 self-center">
          <p className='p-regular-14 text-neutral-800'>Welcome to Directicket!</p>
          <h3 className="p-bold-24">Finish setting up your account.</h3>
          {/* <p className="text-neutral-500 text-sm mt-1">Tell us a bit more about yourself.</p> */}
        </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label className="block text-sm font-medium">Gender</label>
          <select {...register("gender")} className="w-full border rounded p-2">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Rather Not Say">Rather Not Say</option>
          </select>
          <p className='p-regular-12 text-orange-600 mt-0.5'>
            This won't be shown publicly.
            </p>
        </div>

        <div className='flex flex-col gap-1'>
          <label className="block text-sm font-medium">Date of Birth</label>
          <div className="flex gap-2">
            <input
              {...register("day")}
              type="text"
              placeholder="DD"
              className="w-1/3 border rounded p-2"
            />
            <span className="flex items-center">/</span>
            <input
              {...register("month")}
              type="text"
              placeholder="MM"
              className="w-1/3 border rounded p-2"
            />
            <span className="flex items-center">/</span>
            <input
              {...register("year")}
              type="text"
              placeholder="YYYY"
              className="w-1/3 border rounded p-2"
            />
          </div>
          <p className='p-regular-12 text-orange-600 mt-0.5'>
            This won't be shown publicly.
            </p>
        </div>

        <input type="hidden" value={clerkId} {...register("clerkId")} />


        <div className='flex flex-col gap-1'>
          <label className="block text-sm font-medium">Bio (optional)</label>
          <textarea
            {...register("bio")}
            placeholder="Introduce yourself to other users."
            className="w-full border rounded p-2 h-24"
          />
        </div>

        <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg w-full"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Finish Setup"}
        </button>
        <p className='p-regular-12 text-neutral-500'>
            Your data is never shared with third parties or accesible by other users on Directicket. 
            By clicking 'Finish Setup' you agree to our Privacy Policy.
        </p>
        </div>
      </form>
    </div>
  )
}
