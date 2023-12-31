import { getServerSession } from "next-auth"
import { z, ZodError } from "zod"

import { authOptions } from "@/config/next-auth"
import { getServerErrorFromUnknown } from "@/lib/error"
import { mongo } from "@/lib/mongo/dal"
import { reviewSchema } from "@/lib/validations"

export async function GET(req: Request) {
  try {
    const reviewList = await mongo.getItemList<z.infer<typeof reviewSchema>>({
      resource: "reviews",
    })
    return Response.json(reviewList)
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({
        message: "",
      })
    }

    if (error instanceof Error) {
      return Response.json({
        message: error.cause,
      })
    }
    return new Response("Something went wrong", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const requestBody = reviewSchema.parse(await req.json())

    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({
        message: "Unauthorized",
      })
    }

    const createdItem = await mongo.createItem<z.infer<typeof reviewSchema>>({
      resource: "reviews",
      data: { ...requestBody },
    })

    return Response.json({
      message: "Review created successfully",
      createdItem,
    })
  } catch (e) {
    const error = getServerErrorFromUnknown(e)
    return Response.json(error)
  }
}
