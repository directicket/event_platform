"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = ({ placeholder = 'Search for Tickets...'}: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        let newUrl = '';

        if(query) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'query',
                value: query
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['query']
            })
        }

        router.push(newUrl, { scroll: false});
    }, 50)

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])

  return (
    <div className='flex-center min-h-[54px] w-full overflow-hidden border border-b-neutral-700/40
    border-r-0 border-l-0 border-t-0
    bg-black px-2 py-2'>
        <Image src="/assets/icons/search.svg" alt='search' width={20} height={20}/>
        <Input 
          type='text'
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className='p-regular-16 p-2 border-0 text-white bg-black outline-offset-0 placeholder:text-grey-500 focus:text-white focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
        />
    </div>
  )
}

export default Search