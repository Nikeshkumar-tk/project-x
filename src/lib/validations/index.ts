import { z } from "zod";

export const TeacherSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    skills: z.array(z.string()),
    image: z.string().url(),
})