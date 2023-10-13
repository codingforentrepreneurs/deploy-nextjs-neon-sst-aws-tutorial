import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Config } from 'sst/node/config'

import * as schema from '@/app/lib/schema'

export async function dbClient (useSQLOnly) {
    neonConfig.fetchConnectionCache = true;
    const sql = neon(Config.DATABASE_URL)
    if (useSQLOnly) {
        return sql
    }
    return drizzle(sql);
}

export async function dbNow () {
    const sql = await dbClient(true)
    return sql`SELECT NOW()`
}

export async function addLead({email}){
    const db = await dbClient(false)
    const dbResult =  await db.insert(schema.LeadTable).values({email: email}).returning({timestamp: schema.LeadTable.createdAt})
    if (dbResult.length === 1) {
        return dbResult[0].timestamp
    }
    return 
}