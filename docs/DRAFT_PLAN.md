# Next.js AI Software Agency Website Development Plan

## 1. Project Requirements & Planning

### 1.1 Define Business Requirements
- **Company Profile**: Create sections for company history, mission, vision, and team
- **Service Offerings**: Detailed pages for each AI service you provide
- **Portfolio/Case Studies**: Showcase previous client work with measurable results
- **Blog/Resources**: Content marketing strategy with AI insights
- **Contact/Quote Request**: Lead generation forms and contact information

### 1.2 Technical Requirements
- **Frontend**: Next.js (App Router) with TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design and custom theming
- **Backend**: Next.js API routes or server components for backend logic
- **Database**: PostgreSQL for relational data storage
- **Authentication**: NextAuth.js for secure user authentication
- **Deployment**: Vercel or similar platform for CI/CD and hosting
- **CMS**: Consider Prisma as ORM and potentially a headless CMS

### 1.3 Information Architecture
- Define user flows and site navigation hierarchy
- Plan URL structure for SEO optimization
- Map content types to database entities

## 2. Development Environment Setup

### 2.1 Local Environment
```bash
# Install Node.js (v18+ recommended)
# Install PostgreSQL

# Create Next.js project with TypeScript and Tailwind CSS
npx create-next-app@latest my-ai-agency --typescript --tailwind --eslint --app

# Navigate to project
cd my-ai-agency

# Install additional dependencies
npm install @prisma/client next-auth axios zod react-hook-form @headlessui/react

# Install development dependencies
npm install -D prisma @types/node ts-node typescript
```

### 2.2 PostgreSQL Database Setup
```bash
# Create database
createdb ai_agency_db

# Initialize Prisma
npx prisma init

# Configure .env with database connection
# DATABASE_URL="postgresql://username:password@localhost:5432/ai_agency_db"
```

### 2.3 Version Control
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial project setup"

# Create .gitignore file (ensure node_modules, .env, and other sensitive files are excluded)
```

## 3. Next.js Project Structure

### 3.1 App Router Structure
```
app/
├── (auth)/           # Authentication routes grouped
│   ├── login/        # Login page
│   ├── register/     # Registration page
│   └── dashboard/    # Protected dashboard area
├── (marketing)/      # Public marketing pages
│   ├── page.tsx      # Homepage
│   ├── about/        # About page
│   ├── services/     # Services overview and individual services
│   └── blog/         # Blog section and posts
├── api/              # API routes
│   ├── auth/         # Auth API endpoints
│   └── [...]         # Other API endpoints
├── layout.tsx        # Root layout
└── not-found.tsx     # 404 page
```

### 3.2 Component Structure
```
components/
├── ui/               # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── [...]
├── layout/           # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── [...]
├── sections/         # Page-specific sections
│   ├── home/
│   ├── services/
│   └── [...]
└── features/         # Feature-specific components
    ├── auth/
    ├── blog/
    └── [...]
```

### 3.3 Utility Structure
```
lib/
├── prisma.ts         # Prisma client instance
├── auth.ts           # Auth utilities
├── api.ts            # API utilities
└── utils/            # Helper functions
```

## 4. Database Design with PostgreSQL

### 4.1 Schema Design (Prisma Schema)
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?   // Hashed password if not using OAuth
  image         String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                 String   @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Service {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String   @db.Text
  features    String[] // Array of features
  imageUrl    String?
  price       String?  // Could be numeric if fixed pricing
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  projects    Project[]
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String   @db.Text
  clientName  String?
  imageUrl    String?
  results     String   @db.Text
  serviceId   String
  service     Service  @relation(fields: [serviceId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String   @db.Text
  excerpt   String?
  imageUrl  String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String?
  message   String   @db.Text
  createdAt DateTime @default(now())
  status    String   @default("NEW") // NEW, CONTACTED, CLOSED
}

enum Role {
  USER
  ADMIN
}
```

### 4.2 Database Operations
Create utility functions for common database operations using Prisma:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 4.3 Database Migrations
```bash
# Generate migration after schema changes
npx prisma migrate dev --name init

# Apply migrations to production (when ready)
npx prisma migrate deploy
```

## 5. Frontend Implementation with Tailwind CSS

### 5.1 Tailwind Configuration
```typescript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // Add your custom color palette
          900: '#0c4a6e',
        },
        secondary: {
          // Secondary color palette
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### 5.2 Global Styles
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 
    transition-colors duration-200 font-medium focus:outline-none focus:ring-2 
    focus:ring-primary-500 focus:ring-offset-2;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  /* Add more custom component classes */
}
```

### 5.3 Responsive Design Strategy
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Design mobile-first, then add responsive variants
- Create responsive utility components (e.g., containers, grids)

### 5.4 Component Examples

**Button Component:**
```tsx
// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700',
        outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
        ghost: 'text-primary-600 hover:bg-primary-50',
        link: 'text-primary-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ 
  className, 
  variant, 
  size, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
```

**Hero Section Component:**
```tsx
// components/sections/home/HeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary-900 to-primary-800 text-white">
      <div className="absolute inset-0 opacity-20">
        <Image 
          src="/images/hero-pattern.png" 
          alt="" 
          fill 
          priority
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <H1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transform Your Business with AI Solutions
            </H1>
            <p className="text-xl mb-8 text-primary-100">
              Custom AI software development that drives innovation and real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
            <Image 
              src="/images/ai-illustration.jpg" 
              alt="AI software illustration" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

## 6. Backend Implementation

### 6.1 API Routes Structure
```
app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts        # NextAuth API handler
├── services/
│   ├── route.ts            # GET all services
│   └── [id]/
│       └── route.ts        # GET, PUT, DELETE service by ID
├── projects/
│   ├── route.ts            # GET all projects, POST new project
│   └── [id]/
│       └── route.ts        # GET, PUT, DELETE project by ID
├── blog/
│   ├── route.ts            # GET all posts, POST new post
│   └── [slug]/
│       └── route.ts        # GET, PUT, DELETE post by slug
└── contact/
    └── route.ts            # POST contact submission
```

### 6.2 API Route Implementation Example
```typescript
// app/api/services/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

// GET: Get all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        imageUrl: true,
      },
    })
    
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

// POST: Create a new service
export async function POST(request: Request) {
  // Validate session (admin only)
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Validate request
  const ServiceSchema = z.object({
    name: z.string().min(3).max(100),
    slug: z.string().min(3).max(100),
    description: z.string().min(10),
    features: z.array(z.string()),
    imageUrl: z.string().url().optional(),
    price: z.string().optional(),
  })
  
  try {
    const json = await request.json()
    const body = ServiceSchema.parse(json)
    
    // Check for slug uniqueness
    const existingService = await prisma.service.findUnique({
      where: { slug: body.slug },
    })
    
    if (existingService) {
      return NextResponse.json(
        { error: 'Service with this slug already exists' },
        { status: 400 }
      )
    }
    
    // Create service
    const service = await prisma.service.create({
      data: body,
    })
    
    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
```

### 6.3 Server Actions (App Router Alternative)
For forms and data mutations, you can use Next.js Server Actions:

```typescript
// app/actions/contact.ts
'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const ContactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
})

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  }
  
  const validationResult = ContactSchema.safeParse(rawData)
  
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    }
  }
  
  try {
    await prisma.contactSubmission.create({
      data: validationResult.data,
    })
    
    revalidatePath('/contact')
    
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        form: ['Failed to submit form. Please try again.'],
      },
    }
  }
}
```

## 7. Authentication & Authorization

### 7.1 NextAuth.js Setup
```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      
      if (token.role && session.user) {
        session.user.role = token.role as 'USER' | 'ADMIN'
      }
      
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      
      return token
    },
  },
}
```

### 7.2 Protected Routes
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  
  // Admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token || token.role !== 'ADMIN') {
      const url = new URL('/login', req.url)
      url.searchParams.set('callbackUrl', encodeURI(req.url))
      return NextResponse.redirect(url)
    }
  }
  
  // Dashboard routes (for any logged in user)
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      const url = new URL('/login', req.url)
      url.searchParams.set('callbackUrl', encodeURI(req.url))
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
```

## 8. Testing Strategy

### 8.1 Unit Testing
```bash
# Install Jest and testing libraries
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

Configuration in `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

Example component test:
```typescript
// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
  
  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="outline">Outline Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
    
    rerender(<Button variant="ghost">Ghost Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-primary-600')
  })
})
```

### 8.2 Integration Testing
Consider using Playwright for end-to-end testing:

```bash
# Install Playwright
npm init playwright@latest
```

Example Playwright test:
```typescript
// tests/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('homepage navigation works', async ({ page }) => {
  await page.goto('/')
  
  // Check heading
  await expect(page.getByRole('heading', { name: /transform your business/i })).toBeVisible()
  
  // Click services link
  await page.getByRole('link', { name: /explore services/i }).click()
  
  // Verify navigation
  await expect(page).toHaveURL(/\/services/)
  await expect(page.getByRole('heading', { name: /our services/i })).toBeVisible()
})
```

### 8.3 API Testing
Use Jest and Supertest for API testing:

```typescript
// __tests__/api/services.test.ts
import { createMocks } from 'node-mocks-http'
import { GET } from '@/app/api/services/route'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    service: {
      findMany: jest.fn(),
    },
  },
}))

describe('/api/services', () => {
  it('returns services', async () => {
    const mockServices = [
      { id: '1', name: 'AI Chatbot Development', slug: 'ai-chatbot' },
      { id: '2', name: 'Custom ML Solutions', slug: 'ml-solutions' },
    ]
    
    // Mock Prisma response
    const { prisma } = require('@/lib/prisma')
    prisma.service.findMany.mockResolvedValue(mockServices)
    
    // Execute API route
    const { req, res } = createMocks({ method: 'GET' })
    await GET(req, res)
    
    // Check response
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockServices)
  })
})
```

## 9. Deployment Pipeline

### 9.1 Vercel Deployment
Vercel provides seamless deployment for Next.js applications:

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Set up environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - OAuth provider credentials
4. Deploy your application

### 9.2 Database Deployment Options
1. **Managed PostgreSQL**:
   - Supabase
   - Neon
   - Railway
   - Vercel Postgres
   - AWS RDS

2. **Connection Setup**:
   - Update `DATABASE_URL` in production environment
   - Ensure proper SSL configuration
   - Set up connection pooling if needed

### 9.3 CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm test

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run build
```

## 10. Maintenance & Updates

### 10.1 Monitoring & Analytics
- Set up Vercel Analytics or Google Analytics
- Implement error tracking with Sentry
- Add performance monitoring with Lighthouse CI

### 10.2 Content Management
Consider implementing a content management workflow:

1. **Option 1: Admin Dashboard**
   - Build custom admin interface with protected routes
   - Implement CRUD operations for all content types

2. **Option 2: Headless CMS Integration**
   - Integrate with services like Contentful, Sanity, or Strapi
   - Pull content using API integrations

### 10.3 SEO Optimization
- Implement metadata in Next.js using the Metadata API
- Create a sitemap.xml using Next.js built-in functionality
- Add structured data for rich search results
- Optimize image loading with Next.js Image component

### 10.4 Performance Optimization
- Implement route prefetching for faster navigation
- Use React Suspense and streaming for improved loading states
- Apply proper caching strategies with ISR/SSG where appropriate
- Optimize core web vitals (LCP, FID, CLS)

## 11. Additional Feature Considerations

### 11.1 AI Service Demo Integration
Consider adding interactive demos of your AI capabilities:

1. **Chatbot Demo**: Integrate a live chatbot that showcases your NLP capabilities
2. **AI Model Playground**: Create a simple interface to demonstrate model predictions
3. **Visual Recognition Demo**: Allow users to upload images and see AI analysis

### 11.2 Client Portal
Build a secure client portal where existing clients can:

1. Track project progress
2. Access deliverables and documentation
3. Submit feedback and change requests
4. View usage metrics and analytics

### 11.3 Newsletter & Marketing Automation
- Integrate with email marketing services (Mailchimp, ConvertKit)
- Set up automated email sequences for leads
- Create gated content for lead generation