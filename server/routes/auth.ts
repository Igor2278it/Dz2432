import express from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { db, users, onboardingData } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth.js';
import { nanoid } from 'nanoid';

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const onboardingSchema = z.object({
  mainGoal: z.enum(['health', 'learning', 'fun', 'community', 'other']),
  plantTypes: z.array(z.string()).min(1, 'Select at least one plant type'),
  experienceLevel: z.enum(['novice', 'intermediate', 'expert']),
  careFrequency: z.enum(['daily', 'weekly', 'monthly']),
  wantsReminders: z.boolean(),
  customGoal: z.string().optional(),
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await db.insert(users).values({
      email,
      name,
      passwordHash,
      isVerified: true, // Auto-verify for demo purposes
    }).returning();

    // Generate JWT token
    const token = generateToken(newUser[0].id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
        isVerified: newUser[0].isVerified,
        onboardingCompleted: newUser[0].onboardingCompleted,
        level: newUser[0].level,
        xp: newUser[0].xp,
        streak: newUser[0].streak,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }
    
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user.length) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user[0].passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = generateToken(user[0].id);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        isVerified: user[0].isVerified,
        onboardingCompleted: user[0].onboardingCompleted,
        level: user[0].level,
        xp: user[0].xp,
        streak: user[0].streak,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }
    
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Complete onboarding endpoint
router.post('/onboarding', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const onboardingInfo = onboardingSchema.parse(req.body);

    // Save onboarding data
    await db.insert(onboardingData).values({
      userId,
      ...onboardingInfo,
    });

    // Update user onboarding status and give welcome XP
    await db.update(users)
      .set({ 
        onboardingCompleted: true,
        xp: 100, // Welcome bonus XP
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // Get updated user data
    const updatedUser = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    res.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: {
        id: updatedUser[0].id,
        email: updatedUser[0].email,
        name: updatedUser[0].name,
        isVerified: updatedUser[0].isVerified,
        onboardingCompleted: updatedUser[0].onboardingCompleted,
        level: updatedUser[0].level,
        xp: updatedUser[0].xp,
        streak: updatedUser[0].streak,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }
    
    console.error('Onboarding error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Get current user endpoint
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (!user.length) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        isVerified: user[0].isVerified,
        onboardingCompleted: user[0].onboardingCompleted,
        level: user[0].level,
        xp: user[0].xp,
        streak: user[0].streak,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;