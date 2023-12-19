import { mongo } from "@/lib/mongo/dal";
import {string, z, ZodError} from 'zod'

const createProjectSchema = z.object({
  projectName: z.string(),
  projectDescription: z.string(),
  mentorName: z.string(),
  techStacks:z.string(),
  students:z.string().array(),
  startDate:z.date(),
  endDate:z.date()
})

// export async function GET(req:Request){
//   try{
//     const reviewList=await mongo.getItemList({ resource: "reviews",})
//     return Response.json({reviewList})
   

//   }
//   catch (error) {

//     if(error instanceof ZodError) {
//       return Response.json({
//         message: "",
//       });
//     }

//     if (error instanceof Error) {
//       return Response.json({
//         message: error.cause,
//       });
//     }
//     return new Response("Something went wrong", { status: 500 });
//   }
// }

export async function GET(req:Request){
  try{
    const projectList=await mongo.getItemList({ resource: "projects",})
    return Response.json({projectList})
   

  }
  catch (error) {

    if(error instanceof ZodError) {
      return Response.json({
        message: "",
      });
    }

    if (error instanceof Error) {
      return Response.json({
        message: error.cause,
      });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const requestBody = createProjectSchema.parse(await req.json());

    if(!requestBody.projectName || !requestBody.mentorName) {
      return Response.json({
        message: "user or reviewDescription is missing",
      });
    }

    const createdItem = await mongo.createItem({
      resource: "projects",
      data: { ...requestBody },
    });

    return Response.json({
      message: "Review created successfully",
      createdItem,
    });

  } catch (error) {

    if(error instanceof ZodError) {
      return Response.json({
        message: "",
      });
    }

    if (error instanceof Error) {
      return Response.json({
        message: error.cause,
      });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
