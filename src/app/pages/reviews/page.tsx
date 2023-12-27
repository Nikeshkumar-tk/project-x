"use client"

import { useEffect, useState } from "react"

interface Review {
  _id: string
  user: string
  reviewDescription: string
  __v: number
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/reviews")
      const data = await response.json()
      setReviews(data.reviewList) // fixed -- set reviews to data.reviewList instead of data
    }

    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr
              className="rounded-lg text-left text-sm font-medium text-gray-700"
              style={{ fontSize: "0.9674rem" }}
            >
              <th className="bg-gray-300 px-4 py-2">User</th>
              <th className="bg-gray-200 px-4 py-2">Review</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {reviews.map((review: Review) => (
              <tr
                key={review._id}
                className="border-b border-gray-200 py-10 hover:bg-gray-100"
              >
                <td className="bg-gray-100 px-4 py-4">{review.user}</td>
                <td className="bg-gray-100 px-4 py-4">
                  {review.reviewDescription}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}