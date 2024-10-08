"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

//   useEffect(() => {
//     const getCategories = async () => {
//       const categoryList = await getAllCategories();

//       categoryList && setCategories(categoryList as ICategory[])
//     }

//     getCategories();
//   }, [])

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//         let newUrl = '';

//         if(categories) {
//             newUrl = formUrlQuery({
//                 params: searchParams.toString(),
//                 key: 'query',
//                 value: categories
//             })
//         } else {
//             newUrl = removeKeysFromQuery({
//                 params: searchParams.toString(),
//                 keysToRemove: ['query']
//             })
//         }

//         router.push(newUrl, { scroll: false});
//     }, 300)

//     return () => clearTimeout(delayDebounceFn);
//   }, [categories, searchParams, router])

  const onSelectCategory = (category: string) => {

  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

            {categories.length > 0 && categories.map((category) => (
            <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                {category.name}
            </SelectItem>
        ))}
        </SelectContent>
    </Select>
  )
}

export default CategoryFilter