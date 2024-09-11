import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

/**
 * Instance of PostgreSql connection
 */
export const client = postgres(env.DATABASE_URL)

/**
 * Instance of PostgreSql connection with drizzle integration
 */
export const db = drizzle(client, { schema, logger: true })
