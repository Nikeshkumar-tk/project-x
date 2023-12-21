import mongoose from "mongoose";
import { array, date, z } from "zod";
import { teacherSchema as ZTeacherSchema } from "../validations";
import { HTTP_RESOURCES } from "@/config/http-resources";

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

const teacherSchema = new mongoose.Schema<z.infer<typeof ZTeacherSchema>>({
  email:{
    type:String,
    unique:true,
    required: true,
  }
}, {strict: false})

export const Reviews = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);
export const Projects = mongoose.models.reviews || mongoose.model("projects", reviewSchema);
export const Teachers = mongoose.models.teachers || mongoose.model("teachers", teacherSchema);

export const RESOURCE_SCHEMA_MAPPER:Record<keyof typeof HTTP_RESOURCES, mongoose.Model<any>> = {
  reviews: Reviews,
  projects: Projects,
  teachers: Teachers
}


