import { getServerSession } from "next-auth"
import { z, ZodError } from "zod"

import { authOptions } from "@/config/next-auth"
import { getServerErrorFromUnknown } from "@/lib/error"
import { mongo } from "@/lib/mongo/dal"
import { userSchema } from "@/lib/validations"

export async function GET(req: Request) {
  try {
    const usersList = await mongo.getItemList<z.infer<typeof userSchema>>({
      resource: "users",
    })
    return Response.json(usersList)
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
