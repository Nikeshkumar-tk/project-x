import { z } from "zod"

const env_schema = z.object({
  MONGODB_URI: z.string(),
})

export const getEnv = () => env_schema.parse(process.env)
