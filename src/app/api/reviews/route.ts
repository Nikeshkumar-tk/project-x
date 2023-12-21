import { mongo } from "@/lib/mongo/dal";
import {z, ZodError} from 'zod'

const createReviewRequestSchema = z.object({
  user: z.string(),
  reviewDescription: z.string(),
})

export async function GET(req:Request){
  try{
    const reviewList=await mongo.getItemList({ resource: "reviews",})
    return Response.json({reviewList})
   

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
    const requestBody = createReviewRequestSchema.parse(await req.json());

    if(!requestBody.reviewDescription || !requestBody.user) {
      return Response.json({
        message: "user or reviewDescription is missing",
      });
    }

    const createdItem = await mongo.createItem({
      resource: "reviews",
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
