import { defineConfig } from "drizzle-kit";

// Use a default DATABASE_URL for development if not provided
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/plantpal";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
