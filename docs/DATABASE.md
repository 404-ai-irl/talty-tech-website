# Database Documentation

This document provides detailed information about the database setup, connection methods, security practices, and usage examples for the Talty Tech website.

## Supabase Setup and Configuration

The Talty Tech website uses [Supabase](https://supabase.com) as its PostgreSQL database provider. Supabase provides a fully managed PostgreSQL database with additional features like authentication, storage, and real-time subscriptions.

### Creating a Supabase Project

1. Sign up for a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project and note your project URL and API keys
3. Configure your database schema using the Supabase dashboard or SQL editor

### Database Schema

The database schema should be designed to support the website's features, including:

- User authentication (handled by Supabase Auth)
- Service listings
- Contact form submissions
- Blog posts (if applicable)

## Environment Variables

The following environment variables are used for database connection:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | The URL of your Supabase project | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anonymous key for client-side Supabase operations | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | The service role key for server-side admin operations | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `POSTGRES_URL` | Direct connection string to the PostgreSQL database | `postgres://postgres.project:password@aws-0-region.pooler.supabase.com:6543/postgres?sslmode=require` |
| `POSTGRES_PRISMA_URL` | Connection string for Prisma ORM | `postgres://postgres.project:password@aws-0-region.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true` |
| `POSTGRES_URL_NON_POOLING` | Non-pooling connection string for migrations | `postgres://postgres.project:password@aws-0-region.pooler.supabase.com:5432/postgres?sslmode=require` |
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `your-password` |
| `POSTGRES_HOST` | PostgreSQL host | `db.project.supabase.co` |
| `POSTGRES_DATABASE` | PostgreSQL database name | `postgres` |

### Environment Variable Security

- **Never commit** `.env` files to your repository
- Use `.env.example` to document required variables without values
- For production, set environment variables in the Vercel dashboard
- Rotate keys periodically for enhanced security

## Connection Methods

### Direct Supabase Client

For client-side operations, use the Supabase client:

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### Server-Side Admin Client

For server-side operations that require admin privileges:

```typescript
// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey
)
```

### Connection Pooling

For high-traffic applications, connection pooling is recommended:

- Use the `POSTGRES_PRISMA_URL` which includes pooling configuration
- Configure the pool size based on your application's needs
- Monitor connection usage to optimize performance

### Non-Pooling Connection

For database migrations and schema changes, use the non-pooling connection:

- Use the `POSTGRES_URL_NON_POOLING` variable
- This is important for operations that require a direct connection

## Security Best Practices

### Row-Level Security (RLS)

Supabase supports PostgreSQL's Row-Level Security for fine-grained access control:

1. Enable RLS on your tables:
   ```sql
   ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
   ```

2. Create policies to control access:
   ```sql
   CREATE POLICY "Users can view their own data" ON your_table
     FOR SELECT
     USING (auth.uid() = user_id);
   ```

### API Key Management

- Use the anonymous key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) for client-side operations
- Use the service role key (`SUPABASE_SERVICE_ROLE_KEY`) only for server-side operations
- Never expose the service role key to the client

### Data Validation

Always validate data before inserting or updating:

```typescript
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

// Validate data before inserting
const result = ContactSchema.safeParse(formData)
if (!result.success) {
  // Handle validation error
  return { error: result.error.flatten() }
}

// Insert validated data
const { data, error } = await supabase
  .from('contacts')
  .insert(result.data)
```

## Error Handling

### Connection Errors

Handle database connection errors gracefully:

```typescript
try {
  const { data, error } = await supabase
    .from('services')
    .select('*')
  
  if (error) {
    console.error('Database query error:', error)
    return { error: 'Failed to fetch services' }
  }
  
  return { data }
} catch (err) {
  console.error('Unexpected database error:', err)
  return { error: 'An unexpected error occurred' }
}
```

### Retry Strategy

For transient errors, implement a retry strategy:

```typescript
async function queryWithRetry(
  queryFn: () => Promise<any>,
  maxRetries = 3,
  delay = 1000
) {
  let retries = 0
  
  while (retries < maxRetries) {
    try {
      const result = await queryFn()
      if (!result.error) return result
      
      // If it's a connection error, retry
      if (result.error.code === 'PGRST116') {
        retries++
        await new Promise(r => setTimeout(r, delay * retries))
        continue
      }
      
      // For other errors, return immediately
      return result
    } catch (err) {
      retries++
      if (retries >= maxRetries) throw err
      await new Promise(r => setTimeout(r, delay * retries))
    }
  }
}
```

## Usage Examples

### Fetching Data

```typescript
// app/services/page.tsx
import { supabase } from '@/lib/supabase/client'

export default async function ServicesPage() {
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching services:', error)
    return <div>Failed to load services</div>
  }
  
  return (
    <div>
      <h1>Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
```

### Inserting Data

```typescript
// app/actions/contact.ts
'use server'

import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

export async function submitContactForm(formData: FormData) {
  // Validate form data
  const result = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })
  
  if (!result.success) {
    return { error: result.error.flatten() }
  }
  
  // Insert into database
  const { data, error } = await supabase
    .from('contacts')
    .insert(result.data)
    .select()
  
  if (error) {
    console.error('Error submitting contact form:', error)
    return { error: 'Failed to submit form' }
  }
  
  return { success: true, data }
}
```

### Real-time Subscriptions

```typescript
// components/AdminDashboard.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([])
  
  useEffect(() => {
    // Fetch initial data
    const fetchContacts = async () => {
      const { data } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setContacts(data)
    }
    
    fetchContacts()
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('contacts-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'contacts' }, 
        payload => {
          setContacts(current => [payload.new, ...current])
        }
      )
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  return (
    <div>
      <h1>Recent Contact Submissions</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} ({contact.email}) - {contact.created_at}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Database Client Implementation

To create a reusable database client that handles connections securely:

```typescript
// lib/db.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Error class for database connection issues
export class DatabaseConnectionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseConnectionError'
  }
}

// Connection options with defaults
interface ConnectionOptions {
  usePooling?: boolean
  timeout?: number
}

/**
 * Creates a Supabase client with proper error handling
 */
export function createDatabaseClient(options: ConnectionOptions = {}) {
  const { usePooling = true, timeout = 5000 } = options
  
  // Ensure environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new DatabaseConnectionError('NEXT_PUBLIC_SUPABASE_URL is not defined')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new DatabaseConnectionError('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
  }
  
  // Create client with timeout
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
      global: {
        fetch: (url, options) => {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), timeout)
          
          return fetch(url, {
            ...options,
            signal: controller.signal,
          }).finally(() => clearTimeout(timeoutId))
        }
      }
    }
  )
  
  return supabase
}

// Singleton instance for client-side use
let clientInstance: ReturnType<typeof createDatabaseClient> | null = null

/**
 * Returns a singleton database client instance
 */
export function getDatabaseClient() {
  if (!clientInstance) {
    clientInstance = createDatabaseClient()
  }
  return clientInstance
}

/**
 * Creates an admin client for server-side operations
 * Requires SUPABASE_SERVICE_ROLE_KEY to be set
 */
export function createAdminDatabaseClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new DatabaseConnectionError('SUPABASE_SERVICE_ROLE_KEY is not defined')
  }
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
      }
    }
  )
}
```

## Troubleshooting

### Common Issues

1. **Connection Timeouts**
   - Check network connectivity
   - Verify firewall settings
   - Ensure connection strings are correct

2. **Authentication Errors**
   - Verify API keys are correct
   - Check if keys have been rotated
   - Ensure environment variables are properly loaded

3. **Permission Errors**
   - Review Row-Level Security policies
   - Check user authentication status
   - Verify service role key for admin operations

### Logging and Monitoring

Set up proper logging for database operations:

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data || '')
  },
  error: (message: string, error: any) => {
    console.error(`[ERROR] ${message}`, error)
    // In production, send to error tracking service
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data || '')
  },
  db: (operation: string, details?: any) => {
    console.log(`[DB] ${operation}`, details || '')
  }
}

// Usage
import { logger } from '@/lib/logger'

try {
  logger.db('Fetching services')
  const { data, error } = await supabase.from('services').select('*')
  
  if (error) {
    logger.error('Database query failed', error)
    return { error: 'Failed to fetch services' }
  }
  
  logger.db('Services fetched successfully', { count: data.length })
  return { data }
} catch (err) {
  logger.error('Unexpected database error', err)
  return { error: 'An unexpected error occurred' }
}
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row-Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)