import { z } from "zod";

export const TeacherSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    skills: z.array(z.string()),
    image: z.string().url(),
})

export const createReviewRequestSchema = z.object({
    user: z.string(),
    reviewDescription: z.string(),
  })