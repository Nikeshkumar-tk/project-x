import { mongo } from "@/lib/mongo/dal";
import { createReviewRequestSchema } from "@/lib/validations";
import {z, ZodError} from 'zod'
import { getServerErrorFromUnknown } from "@/lib/error";


export async function GET(req:Request){
  try{
    const reviewList=await mongo.getItemList<z.infer<typeof createReviewRequestSchema>>({ resource: "reviews",})
    return Response.json(reviewList)
   

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
    const Errors = getServerErrorFromUnknown(error)
        return Response.json(Errors)
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
