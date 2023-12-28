import { z } from "zod"

export const teacherSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  skills: z.array(z.string()),
  image: z.string().url(),
})

export const reviewSchema = z.object({
  user: z.string(),
  reviewDescription: z.string(),
})
export const userSchema = z.object({
name: z.string(),
email: z.string(),
image: z.string(),
emailVerified: z.null(),
})

export const projectSchema = z.object({
  projects_name: z.string({ required_error: "Project name is required" }),
  projects_description: z.string({
    required_error: "Project description is required",
  }),
  mentor_name: z.string(),
  timelines: z.array(
    z.object({
      name: z.string(),
      date: z.string(),
    })
  ),
})
