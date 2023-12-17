import { MongoDAL } from "@/lib/mongo/dal"
export async function GET(req: Request) {
    return Response.json({ message: 'Hello Reviews' })
}
export async function POST(req: Request) {
    try {
        const mongoDAL = new MongoDAL();
    
        // Assuming you want to create a review item
        const createArg = {
          collectionName: 'reviews', // Adjust the collection name accordingly
          data: {
            user: 'Jane Doe',
            ReviewDescription: 'Excellent service!',
            
          },
        };
    
        const createdItem = await mongoDAL.createItem(createArg.collectionName, createArg);
    
        return Response.json({ message: 'Review created successfully', createdItem });
      } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal server error' });
      }
   
}