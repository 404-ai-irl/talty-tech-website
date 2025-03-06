# Talty Tech Website

This is the official website for Talty Tech, built with Next.js 15 and React 19.

## Project Overview

The Talty Tech website provides information about our services, company, and ways to contact us. It features:

- Modern, responsive design
- Service listings with detailed information
- Contact form for lead generation
- Legal pages (Terms of Service, Privacy Policy)

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) 15.2.1
- **UI Library**: [React](https://react.dev) 19.0.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4.x
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/) for accessible components
  - Custom UI components built with Tailwind
- **Form Handling**: react-hook-form with zod validation
- **Theme Support**: next-themes for light/dark mode

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

The site uses Turbopack for faster development builds.

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `about/` - About page
  - `contact/` - Contact page
  - `legal/` - Legal pages (Terms of Service, Privacy Policy)
  - `services/` - Service listings and details
- `components/` - React components
  - `forms/` - Form components
  - `sections/` - Major page sections
  - `segments/` - Reusable page segments
  - `ui/` - UI components (buttons, cards, etc.)
- `lib/` - Utility functions
- `public/` - Static assets

## Deployment to Vercel

### Next Steps for Deployment

1. **Create a Vercel Account**: If you don't have one already, sign up at [vercel.com](https://vercel.com)

2. **Install Vercel CLI** (optional):
   ```bash
   pnpm install -g vercel
   ```

3. **Deploy from Git**:
   - Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
   - Import the project in the Vercel dashboard
   - Configure your project settings (environment variables, build commands)
   - Deploy

4. **Alternative: Deploy from CLI**:
   ```bash
   vercel
   ```

5. **Configure Custom Domain**:
   - Add your domain in the Vercel dashboard
   - Update DNS settings as instructed

6. **Set Up Environment Variables**:
   - Add any required environment variables in the Vercel dashboard

7. **Enable Analytics** (optional):
   - Enable Vercel Analytics for performance monitoring

For more details, see the [Vercel deployment documentation](https://vercel.com/docs/deployments/overview).
