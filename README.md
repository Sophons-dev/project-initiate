# Project Initiate

An AI-powered opportunity matching platform that connects students and professionals with personalized opportunities, courses, and career paths. Built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 What is Project Initiate?

Project Initiate is a comprehensive platform that helps users discover opportunities tailored to their goals and profile. Whether you're a student seeking educational courses or a professional looking for career advancement, our AI-powered system matches you with the perfect opportunities.

### Key Features

- **AI-Powered Matching**: Intelligent algorithms that match users with opportunities based on their profile and goals
- **Multi-User Support**: Dedicated experiences for both students and professionals
- **Comprehensive Onboarding**: Multi-step onboarding process to understand user preferences and strengths
- **Dashboard Analytics**: Track your profile completion, matched opportunities, and match scores
- **Modern UI/UX**: Beautiful, responsive design with smooth animations and intuitive navigation

## 🏗️ Project Structure

This is a monorepo built with Turborepo, containing:

```
project-initiate/
├── apps/
│   └── client/                 # Next.js 15 web application
│       ├── src/
│       │   ├── app/           # App Router structure
│       │   │   ├── (auth)/    # Authentication pages
│       │   │   ├── (home)/    # Landing page components
│       │   │   └── (main)/    # Main app (dashboard, onboarding)
│       │   ├── components/    # Reusable UI components
│       │   ├── lib/          # Utilities and configurations
│       │   └── services/     # API services
│       └── public/           # Static assets
├── packages/
│   ├── eslint-config/        # Shared ESLint configuration
│   └── typescript-config/    # Shared TypeScript configuration
└── docker-compose.yml        # Docker development setup
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Testing**: Playwright for E2E testing
- **Package Manager**: pnpm
- **Monorepo**: Turborepo

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **pnpm**: Version 10.14.0 or higher
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd project-initiate
```

### 2. Install Dependencies

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install all dependencies
pnpm install
```

### 3. Environment Setup

Create environment files for the client application:

```bash
cd apps/client
cp .env.example .env.local
```

**Note**: If there's no `.env.example` file, you may need to create a `.env.local` file with the necessary environment variables for your specific setup. Make sure to include the MongoDB connection string pointing to your local database.

### 4. Start MongoDB Database

Start the local MongoDB database using Docker Compose:

```bash
# Start MongoDB and other services
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs if needed
docker-compose logs -f
```

**Note**: The database needs to be running before starting the development server.

### 5. Start Development

```bash
# From the root directory
pnpm dev

# Or navigate to the client app
cd apps/client
pnpm dev
```

The application will be available at `http://localhost:3000`

**Important**: Ensure MongoDB is running via Docker Compose before starting the development server.

## 🏃‍♂️ Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev          # Start all apps in development mode

# Building
pnpm build        # Build all apps and packages

# Code Quality
pnpm lint         # Run ESLint across all packages
pnpm format       # Format code with Prettier
pnpm check-types  # Run TypeScript type checking

# Testing
pnpm test:e2e     # Run Playwright E2E tests
pnpm test:e2e:ui  # Run Playwright tests with UI
```

### Client App Commands

```bash
cd apps/client

# Development
pnpm dev          # Start Next.js dev server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Testing
pnpm test:e2e     # Run Playwright tests
pnpm test:e2e:ui  # Run Playwright tests with UI
```

## 🐳 Docker Development

The project includes a Docker Compose setup for local development services:

```bash
# Start MongoDB and other services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the environment
docker-compose down

# Restart services
docker-compose restart
```

### Services Included

- **MongoDB**: Local database for development
- **Additional services**: Check `docker-compose.yml` for complete list

**Note**: The MongoDB service must be running before starting the Next.js development server, as the application depends on database connectivity.

## 🧪 Testing

The project includes comprehensive testing setup:

### E2E Testing with Playwright

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run tests
pnpm test:e2e

# Run tests with UI
pnpm test:e2e:ui

# Run tests in headed mode
npx playwright test --headed
```

## 📁 Project Architecture

### App Router Structure

- **`(auth)`**: Authentication pages (signin, signup, forgot-password)
- **`(home)`**: Landing page with hero, features, and marketing content
- **`(main)`**: Main application (dashboard, onboarding flow)

### Component Organization

- **`components/shared/`**: Reusable components used across the app
- **`components/ui/`**: Base UI components (buttons, inputs, cards, etc.)
- **`app/_components/`**: Page-specific components

### Key Features Implementation

- **Onboarding Flow**: Multi-step process with context management
- **Dashboard**: User analytics and opportunity tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth transitions using Framer Motion

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use Prettier for code formatting
- Follow React best practices and hooks patterns

### Component Structure

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the established naming conventions
- Use the shared UI component library

### State Management

- Use React Query for server state
- Use React Context for global client state
- Keep component state local when possible

## 🚀 Deployment

### Building for Production

```bash
# Build all applications
pnpm build

# Build specific app
pnpm build --filter=client
```

### Environment Variables

Ensure all necessary environment variables are set in your production environment:

- Database connection strings
- API keys and secrets
- Authentication configuration
- External service URLs

---

**Happy coding! 🎉**
