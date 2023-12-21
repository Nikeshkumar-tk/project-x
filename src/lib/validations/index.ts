import { z } from "zod"

export const teacherSchema = z.object({
<<<<<<< HEAD
    name: z.string(),
    email: z.string().email(),
    skills: z.array(z.string()),
    image: z.string().url(),
})

export const reviewSchema = z.object({
    user: z.string(),
    reviewDescription: z.string(),
  })
=======
  name: z.string(),
  email: z.string().email(),
  skills: z.array(z.string()),
  image: z.string().url(),
})
>>>>>>> 9a53be68ae9c718baf4590090a6246c5f3efbf20
