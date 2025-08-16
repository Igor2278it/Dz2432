import { pgTable, text, timestamp, boolean, integer, jsonb, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  verificationToken: text("verification_token"),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  streak: integer("streak").default(0).notNull(),
  lastActiveDate: timestamp("last_active_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const onboardingData = pgTable("onboarding_data", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  mainGoal: text("main_goal").notNull(),
  plantTypes: jsonb("plant_types").$type<string[]>().notNull(),
  experienceLevel: text("experience_level").notNull(),
  careFrequency: text("care_frequency").notNull(),
  wantsReminders: boolean("wants_reminders").default(true).notNull(),
  customGoal: text("custom_goal"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const plants = pgTable("plants", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  species: text("species"),
  imageUrl: text("image_url"),
  lastWatered: timestamp("last_watered"),
  lastFertilized: timestamp("last_fertilized"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const careActivities = pgTable("care_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  plantId: uuid("plant_id").references(() => plants.id),
  activityType: text("activity_type").notNull(),
  description: text("description"),
  xpEarned: integer("xp_earned").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconUrl: text("icon_url"),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertOnboardingSchema = createInsertSchema(onboardingData);
export const selectOnboardingSchema = createSelectSchema(onboardingData);
export const insertPlantSchema = createInsertSchema(plants);
export const selectPlantSchema = createSelectSchema(plants);
export const insertCareActivitySchema = createInsertSchema(careActivities);
export const selectCareActivitySchema = createSelectSchema(careActivities);
export const insertAchievementSchema = createInsertSchema(achievements);
export const selectAchievementSchema = createSelectSchema(achievements);

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type OnboardingData = z.infer<typeof selectOnboardingSchema>;
export type NewOnboardingData = z.infer<typeof insertOnboardingSchema>;
export type Plant = z.infer<typeof selectPlantSchema>;
export type NewPlant = z.infer<typeof insertPlantSchema>;
export type CareActivity = z.infer<typeof selectCareActivitySchema>;
export type NewCareActivity = z.infer<typeof insertCareActivitySchema>;
export type Achievement = z.infer<typeof selectAchievementSchema>;
export type NewAchievement = z.infer<typeof insertAchievementSchema>;