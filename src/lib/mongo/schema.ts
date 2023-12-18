import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: String,
  reviewDescription: String,
});

export const Reviews = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);

export function initializeSchemas() {
  return {
    Reviews,
  };
}
