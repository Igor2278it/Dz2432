import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../../shared/schema.js";

// Use a mock database URL for development if not provided
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://demo:demo@demo.neon.tech/demo";

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

export * from "../../shared/schema.js";