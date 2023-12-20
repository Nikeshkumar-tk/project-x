import mongoose from "mongoose";
import { array, date, z } from "zod";
import { TeacherSchema } from "../validations";

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

const teacherSchema = new mongoose.Schema<z.infer<typeof TeacherSchema>>({}, {strict: false})

export const Reviews = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);
export const Projects = mongoose.models.reviews || mongoose.model("projects", reviewSchema);
export const Teachers = mongoose.models.teachers || mongoose.model("teachers", teacherSchema);

export function initializeSchemas() {
  return {
    Reviews,
    Projects,
    Teachers
  };
}
