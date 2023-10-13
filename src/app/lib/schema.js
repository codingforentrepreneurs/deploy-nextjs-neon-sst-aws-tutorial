import {serial, pgTable, text, timestamp, varchar} from 'drizzle-orm/pg-core'

export const LeadTable = pgTable("leads", {
    id: serial("id").primaryKey().notNull(), 
    email: text("email").notNull(),
    firstName: varchar("first_name", {length: 150}),
    lastName: varchar("last_name", {length: 150}),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
})