> Repo is outdated.
> This repo has been moved to the [Talty Tech](https://taltytech.com) Turborepo

# Talty Tech Website

This is the official website for Talty Tech, built with Next.js 15 and React 19.

## Project Overview

The Talty Tech website provides information about our services, company, and ways to contact us. It features:

- Modern, responsive design with animations and interactive elements
- Service listings with detailed information
- Contact form for lead generation
- Legal pages (Terms of Service, Privacy Policy)
- Authentication system for private sections
- Dark/light mode theme support

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) 15.2.1 with App Router
- **UI Library**: [React](https://react.dev) 19.0.0
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com) 4.x
  - CSS Modules for component-specific styling
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x
- **Database**: [Supabase](https://supabase.com) for PostgreSQL database
- **UI Components**:
  - [shadcn/ui](https://ui.shadcn.com/) with New York style
  - [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- **Form Handling**: react-hook-form with zod validation
- **Theme Support**: next-themes for light/dark mode
- **Performance Monitoring**: Vercel Analytics and Speed Insights
- **Fonts**: Geist Sans and Geist Mono

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The site uses Turbopack for faster development builds (`--turbopack` flag).

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `about/` - About page
  - `actions/` - Server actions
  - `auth/` - Authentication related routes
  - `contact/` - Contact page
  - `legal/` - Legal pages (Terms of Service, Privacy Policy)
  - `login/` - Login page
  - `private/` - Protected routes
  - `services/` - Service listings and details
- `components/` - React components
  - `globals/` - Global components like Header and Footer
  - `hero-section/` - Hero components with animations
  - `ui/` - UI components from shadcn
  - `watchtower-animation/` - Custom animation components
- `lib/` - Utility functions and service clients
- `public/` - Static assets
- `supabase/` - Supabase configuration and migrations
  - `schemas/` - SQL schema definitions
  - `migrations/` - Database migrations

## Database Schema

The Supabase database includes the following tables:

- `lead` - Contact form submissions
- `service_categories` - Categories of services offered
- `services` - Services within each category
- `service_details` - Detailed information about each service

## Environment Variables

The following environment variables are required:

```shell
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## Current Progress

The project currently has:

- ✅ Basic project structure and routing
- ✅ Homepage with animated hero section
- ✅ Theme support (light/dark mode)
- ✅ Supabase integration
- ✅ UI component library setup (shadcn/ui)
- ✅ Global layout with header and footer
- ✅ Complete service listing pages
- ✅ Finalize the contact form with form validation
- ✅ Add more content to About page
- ✅ Implement authentication flow for private sections
   
## Next Steps

- Develop admin dashboard for managing content
- Add SEO optimization and metadata for all pages Optimize for performance and accessibility

## Deployment

The project is configured for deployment to Vercel with Analytics and Speed Insights already integrated.

For deployment instructions, follow the [Vercel deployment documentation](https://vercel.com/docs/deployments/overview).
