# PlantPal - AI-Powered Plant Care App

## Overview

PlantPal is a gamified plant care application that combines AI-powered plant identification, community features, and engaging user experience to make caring for houseplants rewarding and educational. The app allows users to identify plants using AI, track care activities, earn achievements, connect with other plant enthusiasts, and access an AI plant doctor for health diagnostics. Built as a full-stack web application with modern technologies, PlantPal focuses on mobile-first design while providing comprehensive plant care management tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript built using Vite for fast development and optimized production builds
- **UI Components**: Shadcn/ui component library built on Radix UI primitives, providing accessible and customizable components
- **Styling**: Tailwind CSS with custom plant-themed design system featuring organic border radii, nature-inspired color palette, and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management, caching, background refetching, and optimistic updates
- **Routing**: Wouter for lightweight client-side routing with minimal bundle impact
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form management
- **Animations**: Framer Motion for smooth page transitions, component animations, and micro-interactions
- **Mobile-First Design**: Responsive layout optimized for mobile devices with bottom navigation, touch-friendly interactions, and progressive web app capabilities

### Backend Architecture
- **Framework**: Express.js with TypeScript providing RESTful API endpoints with structured routing
- **Database Layer**: Modular storage abstraction with service layer separation for maintainability and testability
- **File Handling**: Multer middleware for image uploads with validation, processing, and storage management
- **API Design**: Consistent JSON responses, comprehensive error handling, request logging, and middleware-based request processing
- **Development Environment**: Hot reloading with tsx, integrated Vite development server, and TypeScript compilation

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless deployment for scalability and performance
- **ORM**: Drizzle ORM providing type-safe database operations, schema management, and query building
- **Schema Design**: Comprehensive data models covering users, plants, care activities, achievements, AI interactions, community posts, votes, and notifications
- **Migration Management**: Drizzle Kit for database schema evolution and version control
- **Session Management**: Cookie-based sessions for user authentication and state persistence

### Authentication and Authorization
- **User System**: Demo user approach with automatic default user creation for streamlined onboarding
- **Session Handling**: Server-side session management with cookie-based persistence
- **Security**: CORS configuration, request validation middleware, and secure API endpoint protection

### Gamification System
- **Progression Mechanics**: Experience point-based leveling from Plant Novice to Master Gardener with defined thresholds
- **Achievement Engine**: Comprehensive badge system for care streaks, plant identification accuracy, community participation, and milestone achievements
- **Activity Tracking**: XP rewards system for different care activities with varying point values
- **Streak System**: Daily care activity tracking to encourage consistent plant maintenance habits
- **Community Ranking**: User ranking system based on community contributions and expertise level

### AI Integration Architecture
- **Plant Identification**: Multi-model approach using Google Vision API for image analysis and OpenAI GPT-4o for species identification and care recommendations
- **AI Doctor Feature**: Specialized AI model for plant health diagnosis, symptom analysis, and treatment recommendations
- **Chat System**: Persistent AI chat sessions with conversation history and context awareness
- **Voting System**: Community feedback mechanism for AI identification accuracy improvement

### Community Features
- **Social Platform**: Full-featured community with posts, comments, voting, and user interactions
- **Content Moderation**: Community-driven moderation with reporting and ranking systems
- **Notification System**: Real-time notifications for community interactions, achievements, and care reminders
- **User Profiles**: Comprehensive user profiles with statistics, achievements, and community contributions

## External Dependencies

### AI Services
- **OpenAI GPT-4o**: Core AI service for plant identification, health diagnosis, care recommendations, and interactive chat assistance
- **Google Vision API**: Advanced image analysis for plant species recognition and visual feature extraction (planned integration)

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL platform for scalable data storage with connection pooling
- **Drizzle ORM**: Type-safe database toolkit for schema management, migrations, and query building

### Frontend Libraries
- **React Query**: Server state management with caching, background updates, and optimistic UI patterns
- **Framer Motion**: Animation library for smooth transitions and engaging user interactions
- **React Hook Form**: Form state management with validation and error handling
- **Wouter**: Minimalist routing solution for single-page application navigation
- **Radix UI**: Accessible component primitives for consistent user interface elements

### Development Tools
- **Vite**: Fast build tool with hot module replacement and optimized bundling
- **TypeScript**: Static type checking for enhanced code quality and developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **ESBuild**: Fast JavaScript bundler for production builds

### File and Media Handling
- **Multer**: Multipart form data handling for image uploads and processing
- **File System Management**: Local file storage with validation, processing, and cleanup utilities

### Internationalization
- **React i18next**: Internationalization framework supporting English and Ukrainian languages with extensible translation management