"use client"
import React from 'react'
import { useState,useEffect } from 'react'

import {
  ColumnDef,
} from "@tanstack/react-table"
import { DataTable } from '@/components/data-table'
 

 


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
      const data = await response.json()
      setReviews(data.reviewList) // fixed -- set reviews to data.reviewList instead of data
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