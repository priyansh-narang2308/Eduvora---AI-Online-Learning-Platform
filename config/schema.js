import { boolean, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    subscriptionId: varchar()
});


export const coursesTable = pgTable("courses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar().notNull().unique(),
    courseName: varchar().notNull(),
    courseDescription: varchar().notNull(),
    numberOfChapters: integer().notNull(),
    includeVideo: boolean().default(false),
    difficulty: varchar().notNull(),
    category: varchar().notNull(),
    bannerImageUrl: varchar().default(""),
    courseJson: json(),
    courseContent: json().default({}),
    // to check who made the course and connect it to the user table as a foreign key
    userEmail: varchar("userEmail").references(() => usersTable.email).notNull()
});



export const enrollCourseTable = pgTable("enrollCourse", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar("cid").references(() => coursesTable.cid),
    userEmail: varchar("userEmail").references(() => usersTable.email).notNull(),
    completedChapters: json()
})

