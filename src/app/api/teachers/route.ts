import { authOptions } from "@/config/next-auth";
import { getServerErrorFromUnknown } from "@/lib/error";
import { mongo } from "@/lib/mongo/dal";
import { TeacherSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== "admin")) {
            return Response.json({ message: "Unauthorized" })
        }
        const req_body = TeacherSchema.parse(await req.json())
        const teacher = await mongo.createItem<z.infer<typeof TeacherSchema>>({ resource: "teachers", data: { ...req_body } })
        return Response.json({ message: "Teacher created successfully", teacher })
    } catch (e) {
        const error = getServerErrorFromUnknown(e)
        return Response.json(error)
    }
}