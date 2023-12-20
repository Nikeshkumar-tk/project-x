import mongoose from "mongoose";
import { array, date } from "zod";

const reviewSchema = new mongoose.Schema({
  user: String,
  reviewDescription: String,
})

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  mentorName: String,
  techStacks:String,
  students:Array,
  startDate:Date,
  endDate:Date
});

export const Reviews = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);
export const Projects = mongoose.models.reviews || mongoose.model("projects", reviewSchema);

export function initializeSchemas() {
  return {
    Reviews,
    Projects
  };
}
