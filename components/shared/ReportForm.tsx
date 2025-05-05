import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Link from 'next/link'

const Form = () => {
  return (
    <div className='contact-container p-medium-16 flex-col flex items-center justify-center wrapper w-[350px]'>
        <form action="https://api.web3forms.com/submit" method="POST" className='bg-neutral-950 border border-neutral-800/50 p-4 rounded-md contact-left items-center justify-center'>
            <input type="hidden" name="access_key" value="e85da356-df4d-4824-9b02-75f750084417"></input>
            
            <input type='text' name='title' placeholder='Title (required)' className='w-[350px] contact-inputs 
            rounded-md bg-black border-neutral-900 border' required></input>
            <textarea name='description' placeholder='Description (required)' 
            className='w-[350px] p-4 min-h-56 area-inputs rounded-md bg-black border-neutral-900 border' required></textarea>

            <div className='contact-inputs rounded-md bg-black border-neutral-900 border items-center justify-center'>
            <select name="category" required className='w-[320px] md:w-[330px] h-full rounded-md bg-black self-center -ml-2'>
                <option value="" disabled className='w-[350px] p-2 bg-black hover:blue-button p-medium-16'>Select category</option>
                <option value='snapchat' className='w-[350px] p-2 bg-black p-medium-16'>Report</option>
                <option value='instagram' className='w-[350px] p-2 bg-black p-medium-16'>Suggestion</option>
            </select>
            </div>

            <input type='text' name='email' placeholder='Your Email' className='w-[350px] contact-inputs rounded-md bg-black border-neutral-900 border'></input>
            <button type='submit' className='rounded-md py-4 px-4 text-black w-[350px] 
            lg:w-full bg-red-600' >Submit Report</button>

            <p className='p-regular-12 w-[300px] text-center justify-center text-neutral-600'>
                We use this information to contact you and send you updates. 
                By clicking on 'Submit Report' you agree to our Terms of Service and Privacy Policy. Contact us{' '}@
                <a href="https://instagram.com/directickets" className='underline'>directicket</a> for more info.
                </p>
        </form>
    </div>
  )
}

export default Form