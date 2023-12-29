'use client'
import { useQuery } from 'react-query';
import { useEffect, useState } from "react"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
interface Review {
  _id: string
  user?: string
  reviewDescription?: string
  __v: number
}

export default function Reviews() {


const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/reviews');
    const data = await response.json();
    return data;
  };
const { data, isLoading, error } = useQuery('apiData', fetchData);
const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "user",
    header: "User Name",
  },
  {
    accessorKey: "reviewDescription",
    header: "Review Descriptions",
  },
  
]
if (isLoading) {
return <div>Loading...</div>;
}

  return (
      <div className="w-full p-5 mt-2 mb-5">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
