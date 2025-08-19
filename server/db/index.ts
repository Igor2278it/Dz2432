import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../../shared/schema.js";

// Use a mock database URL for development if not provided
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/plantpal";

let db: any;

try {
  const sql = neon(DATABASE_URL);
  db = drizzle(sql, { schema });
} catch (error) {
  console.warn('Database connection failed, using mock data:', error);
  // Create a mock database for development
  db = {
    select: () => ({
      from: () => ({
        where: () => ({
          limit: () => Promise.resolve([])
        })
      })
    }),
    insert: () => ({
      values: () => ({
        returning: () => Promise.resolve([{
          id: 'mock-id',
          email: 'demo@example.com',
          name: 'Demo User',
          isVerified: true,
          onboardingCompleted: false,
          level: 1,
          xp: 0,
          streak: 0
        }])
      })
    }),
    update: () => ({
      set: () => ({
        where: () => Promise.resolve([{
          id: 'mock-id',
          email: 'demo@example.com',
          name: 'Demo User',
          isVerified: true,
          onboardingCompleted: true,
          level: 1,
          xp: 100,
          streak: 0
        }])
      })
    })
  };
}

export { db };

export * from "../../shared/schema.js";