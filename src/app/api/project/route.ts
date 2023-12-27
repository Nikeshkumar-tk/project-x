import { z, ZodError } from "zod"

import { mongo } from "@/lib/mongo/dal"
import { createProjectSchema } from "@/lib/validations"
import { getServerErrorFromUnknown } from "@/lib/error"


export async function GET(req:Request){
  try{
    const projectList=await mongo.getItemList<z.infer<typeof createProjectSchema>>({ resource: "projects",})
    return Response.json(projectList)
   

  }
  catch (error) {

    if(error instanceof ZodError) {
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
   
    const requestBody = createProjectSchema.parse(await req.json());
    
    const createdItem = await mongo.createItem<z.infer<typeof createProjectSchema>>({
      resource: "projects",
      data: { ...requestBody },
    })

    return Response.json({
      message: "Project  created successfully",
      createdItem,
    });

  } catch (e) {

    const error = getServerErrorFromUnknown(e)
    return Response.json(error)
  }
}
