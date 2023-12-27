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

  export const createProjectSchema = z.object({
    projects_name: z.string(),
    projects_description: z.string(),
    mentor_name: z.string(),
    timelines: z.array(
        z.object({
          name: z.string(),
          date: z.string(), 
        })
      ),

  })