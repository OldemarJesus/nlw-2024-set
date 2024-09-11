import z from 'zod'

/**
 * Environment Schema
 */
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

/**
 * Environment Schema with data
 */
export const env = envSchema.parse(process.env)
