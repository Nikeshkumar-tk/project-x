import mongoose from "mongoose"
import { array, date, z } from "zod"

import { HTTP_RESOURCES } from "@/config/http-resources"

import { teacherSchema as ZTeacherSchema } from "../validations"

const reviewSchema = new mongoose.Schema({
  user: String,
  reviewDescription: String,
})

const projectSchema = new mongoose.Schema({
  projects_name: {
    type: String,
    required: true,
  },
  projects_description: {
    type: String,
    required: true,
  },
  mentor_name: {
    type: String,
    required: true,
  },
  timelines: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
});

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

export const Reviews =
  mongoose.models.reviews || mongoose.model("reviews", reviewSchema)
export const Projects =
  mongoose.models.createProjectSchema || mongoose.model("projects",projectSchema )
export const Teachers =
  mongoose.models.teachers || mongoose.model("teachers", teacherSchema)

export const RESOURCE_SCHEMA_MAPPER: Record<
  keyof typeof HTTP_RESOURCES,
  mongoose.Model<any>
> = {
  reviews: Reviews,
  projects: Projects,
  teachers: Teachers,
}
