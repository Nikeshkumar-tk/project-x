import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/config/next-auth"
import { getServerErrorFromUnknown } from "@/lib/error"
import { mongo } from "@/lib/mongo/dal"
import { teacherSchema } from "@/lib/validations"

export async function POST(_req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return Response.json({ message: "Unauthorized" })
    }
    const req_body = teacherSchema.parse(await _req.json())
    const teacher = await mongo.createItem<z.infer<typeof teacherSchema>>({
      resource: "teachers",
      data: { ...req_body },
    })
    return Response.json({ message: "Teacher created successfully", teacher })
  } catch (e) {
    const error = getServerErrorFromUnknown(e)
    return Response.json(error)
  }
}
