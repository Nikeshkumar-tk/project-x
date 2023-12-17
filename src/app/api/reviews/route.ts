import { MongoDAL } from "@/lib/mongo/dal";
import { HTTP_RESOURCES } from "@/lib/mongo/resources";
import mongoose from "mongoose";
const mongoDAL = new MongoDAL();
var reviewSchema = new mongoose.Schema({
  user: String,
  ReviewDescription: String,
});
var reviewModal = mongoose.model(HTTP_RESOURCES.reviews, reviewSchema);

export async function GET(req: Request) {
  const list = await mongoDAL.getItemList(reviewModal);

  return Response.json(list);
}
export async function POST(req: Request) {
  try {
    const RequestBody = await req.json();

    const createArg = {
      collectionName: "reviews", 
      data: {
        user: RequestBody.user,
        ReviewDescription: RequestBody.ReviewDescription,
      },
    };

    const createdItem = await mongoDAL.createItem(
      createArg,
      reviewModal
    );

    return Response.json({
      message: "Review created successfully",
      createdItem,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" });
  }
}
