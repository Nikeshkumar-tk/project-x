'use client'
import { useEffect, useState } from 'react';

interface Review {
    _id: string;
    user: string;
    reviewDescription: string;
    __v: number;
}

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/reviews');
            const data: Review[] = await response.json();
            setReviews(data);
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr className="rounded-lg text-sm font-medium text-gray-700 text-left" style={{ fontSize: '0.9674rem' }}>
                            <th className="px-4 py-2 bg-gray-300" >User</th>
                            <th className="px-4 py-2 bg-gray-200">Review</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-normal text-gray-700">
                        {reviews.map((review: Review) => (
                            <tr key={review._id} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                                <td className="bg-gray-100 px-4 py-4">{review.user}</td>
                                <td className="bg-gray-100 px-4 py-4">{review.reviewDescription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
