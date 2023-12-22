"use client"
import React from 'react'
import { useState,useEffect } from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { DataTable } from '@/components/data-table'
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 


function Reviews() {
  interface Reviews {
    user: string;
    reviewDescription: number;
  }

  const [reviews, setReviews] = useState<Reviews[ ]>([])
  console.log(reviews)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/reviews")
      const data: Review[] = await response.json()
      setReviews(data)
     
    }
    fetchData()
  }, [])

  const columns: ColumnDef<Reviews>[] = [
    {
      accessorKey: "user",
      header: "Status",
    },
    {
      accessorKey: "reviewDescription",
      header: "Review Descriptions",
    },
   
  ]
  console.log(reviews)
 

  

  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={reviews} />
  </div>
  )
}

export default Reviews