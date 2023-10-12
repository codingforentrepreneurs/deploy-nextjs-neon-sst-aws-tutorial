import { neon } from '@neondatabase/serverless'

import { Config } from 'sst/node/config'

export async function dbClient () {
    return neon(Config.DATABASE_URL)
}

export async function dbNow () {
    const sql = await dbClient()
    return sql`SELECT NOW()`
}