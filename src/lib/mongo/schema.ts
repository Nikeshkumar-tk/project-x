import mongoose from "mongoose"
import { array, date, z } from "zod"

import { HTTP_RESOURCES } from "@/config/http-resources"

import { teacherSchema as ZTeacherSchema } from "../validations"

const reviewSchema = new mongoose.Schema({
  user: String,
  reviewDescription: String,
})

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  mentorName: String,
  techStacks: String,
  students: Array,
  startDate: Date,
  endDate: Date,
})

const teacherSchema = new mongoose.Schema<z.infer<typeof ZTeacherSchema>>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { strict: false }
)

<<<<<<< HEAD
export const Reviews = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);
export const Projects = mongoose.models.projects || mongoose.model("projects", projectSchema);
export const Teachers = mongoose.models.teachers || mongoose.model("teachers", teacherSchema);
=======
export const Reviews =
  mongoose.models.reviews || mongoose.model("reviews", reviewSchema)
export const Projects =
  mongoose.models.reviews || mongoose.model("projects", reviewSchema)
export const Teachers =
  mongoose.models.teachers || mongoose.model("teachers", teacherSchema)
>>>>>>> 9a53be68ae9c718baf4590090a6246c5f3efbf20

export const RESOURCE_SCHEMA_MAPPER: Record<
  keyof typeof HTTP_RESOURCES,
  mongoose.Model<any>
> = {
  reviews: Reviews,
  projects: Projects,
  teachers: Teachers,
}
