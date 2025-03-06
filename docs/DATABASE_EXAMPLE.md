# Database Usage Examples

This document provides practical examples of how to use the database client in the Talty Tech website.

## Basic Setup

First, import the database client:

```typescript
// Import the database client
import { getDatabaseClient, executeWithRetry } from '@/lib/db';

// Get a database client instance
const db = getDatabaseClient();
```

## Fetching Data

### Example 1: Fetching Services

```typescript
// app/services/page.tsx
import { getDatabaseClient, executeWithRetry } from '@/lib/db';

export default async function ServicesPage() {
  const db = getDatabaseClient();
  
  // Execute a query with retry logic
  const { data, error } = await executeWithRetry(() => 
    db.from('services').select('*')
  );
  
  if (error) {
    console.error('Failed to fetch services:', error);
    return <div>Failed to load services</div>;
  }
  
  return (
    <div>
      <h1>Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
```

### Example 2: Fetching a Single Service

```typescript
// app/services/[id]/page.tsx
import { getDatabaseClient, executeWithRetry } from '@/lib/db';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: {
    id: string;
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = params;
  const db = getDatabaseClient();
  
  const { data, error } = await executeWithRetry(() => 
    db.from('services').select('*').eq('id', id).single()
  );
  
  if (error || !data) {
    console.error('Failed to fetch service:', error);
    notFound();
  }
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      {/* Render the rest of the service details */}
    </div>
  );
}
```

## Inserting Data

### Example: Contact Form Submission

```typescript
// app/actions/contact.ts
'use server'

import { z } from 'zod';
import { getDatabaseClient, executeWithRetry } from '@/lib/db';

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10).max(1000),
});

export async function submitContactForm(formData: FormData) {
  // Validate form data
  const result = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || null,
    message: formData.get('message'),
  });
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  
  const db = getDatabaseClient();
  
  // Insert into database
  const { data, error } = await executeWithRetry(() => 
    db.from('contacts').insert(result.data).select()
  );
  
  if (error) {
    console.error('Error submitting contact form:', error);
    return { error: 'Failed to submit form' };
  }
  
  return { success: true, data };
}
```

## Updating Data

### Example: Updating a Service

```typescript
// app/admin/services/[id]/actions.ts
'use server'

import { z } from 'zod';
import { createAdminDatabaseClient, executeWithRetry } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const ServiceSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  category: z.string().uuid(),
  icon: z.string(),
});

export async function updateService(id: string, formData: FormData) {
  // Validate form data
  const result = ServiceSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    icon: formData.get('icon'),
  });
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  
  // Use admin client for privileged operations
  const db = createAdminDatabaseClient();
  
  // Update the service
  const { data, error } = await executeWithRetry(() => 
    db.from('services')
      .update(result.data)
      .eq('id', id)
      .select()
  );
  
  if (error) {
    console.error('Error updating service:', error);
    return { error: 'Failed to update service' };
  }
  
  // Revalidate the services pages
  revalidatePath('/services');
  revalidatePath(`/services/${id}`);
  
  return { success: true, data };
}
```

## Deleting Data

### Example: Deleting a Service

```typescript
// app/admin/services/[id]/actions.ts
'use server'

import { createAdminDatabaseClient, executeWithRetry } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteService(id: string) {
  // Use admin client for privileged operations
  const db = createAdminDatabaseClient();
  
  // Delete the service
  const { error } = await executeWithRetry(() => 
    db.from('services').delete().eq('id', id)
  );
  
  if (error) {
    console.error('Error deleting service:', error);
    return { error: 'Failed to delete service' };
  }
  
  // Revalidate the services pages
  revalidatePath('/services');
  
  return { success: true };
}
```

## Real-time Subscriptions

### Example: Real-time Contact Form Submissions

```typescript
// components/admin/ContactSubmissions.tsx
'use client'

import { useEffect, useState } from 'react';
import { getDatabaseClient } from '@/lib/db';

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    const db = getDatabaseClient();
    
    // Fetch initial data
    const fetchContacts = async () => {
      const { data, error } = await db
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setContacts(data);
      }
    };
    
    fetchContacts();
    
    // Set up real-time subscription
    const subscription = db
      .channel('contacts-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'contacts' }, 
        payload => {
          setContacts(current => [payload.new, ...current]);
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return (
    <div>
      <h1>Recent Contact Submissions</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} ({contact.email}) - {new Date(contact.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Error Handling

### Example: Comprehensive Error Handling

```typescript
// lib/api-utils.ts
import { getDatabaseClient, executeWithRetry, DatabaseConnectionError } from '@/lib/db';

export async function fetchDataWithErrorHandling(table: string, query: any = {}) {
  try {
    const db = getDatabaseClient();
    
    const { data, error } = await executeWithRetry(() => {
      let queryBuilder = db.from(table).select('*');
      
      // Apply filters if provided
      if (query.filters) {
        for (const [column, value] of Object.entries(query.filters)) {
          queryBuilder = queryBuilder.eq(column, value);
        }
      }
      
      // Apply ordering if provided
      if (query.orderBy) {
        queryBuilder = queryBuilder.order(query.orderBy.column, { 
          ascending: query.orderBy.ascending 
        });
      }
      
      // Apply pagination if provided
      if (query.pagination) {
        queryBuilder = queryBuilder
          .range(query.pagination.start, query.pagination.end);
      }
      
      return queryBuilder;
    });
    
    if (error) {
      console.error(`Error fetching data from ${table}:`, error);
      
      // Handle specific error types
      if (error.code === 'PGRST116') {
        return { error: 'Database connection error. Please try again later.' };
      }
      
      if (error.code === '42P01') {
        return { error: `Table "${table}" does not exist.` };
      }
      
      return { error: 'Failed to fetch data. Please try again later.' };
    }
    
    return { data };
  } catch (err) {
    console.error('Unexpected error:', err);
    
    if (err instanceof DatabaseConnectionError) {
      return { error: 'Database configuration error. Please contact support.' };
    }
    
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
```

## Advanced Usage

### Example: Transaction with Multiple Operations

```typescript
// app/admin/orders/actions.ts
'use server'

import { createAdminDatabaseClient } from '@/lib/db';

export async function createOrderWithItems(orderData, items) {
  const db = createAdminDatabaseClient();
  
  // Start a transaction
  const { data, error } = await db.rpc('create_order_with_items', {
    order_data: orderData,
    order_items: items
  });
  
  if (error) {
    console.error('Transaction failed:', error);
    return { error: 'Failed to create order' };
  }
  
  return { success: true, data };
}
```

### Example: Using Stored Procedures

```typescript
// app/admin/reports/actions.ts
'use server'

import { createAdminDatabaseClient, executeWithRetry } from '@/lib/db';

export async function generateSalesReport(startDate, endDate) {
  const db = createAdminDatabaseClient();
  
  const { data, error } = await executeWithRetry(() => 
    db.rpc('generate_sales_report', {
      start_date: startDate,
      end_date: endDate
    })
  );
  
  if (error) {
    console.error('Error generating report:', error);
    return { error: 'Failed to generate sales report' };
  }
  
  return { success: true, data };
}
```

## Testing Database Operations

### Example: Mocking Database Responses for Tests

```typescript
// __tests__/services.test.ts
import { vi } from 'vitest';
import { getDatabaseClient, executeWithRetry } from '@/lib/db';
import { fetchServices } from '@/app/services/actions';

// Mock the database module
vi.mock('@/lib/db', () => ({
  getDatabaseClient: vi.fn(),
  executeWithRetry: vi.fn(),
}));

describe('Service Actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  test('fetchServices returns services when successful', async () => {
    // Mock data
    const mockServices = [
      { id: '1', title: 'Service 1', description: 'Description 1' },
      { id: '2', title: 'Service 2', description: 'Description 2' },
    ];
    
    // Mock the database response
    const mockDb = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
    };
    
    getDatabaseClient.mockReturnValue(mockDb);
    executeWithRetry.mockResolvedValue({ data: mockServices, error: null });
    
    // Call the function
    const result = await fetchServices();
    
    // Assertions
    expect(getDatabaseClient).toHaveBeenCalled();
    expect(executeWithRetry).toHaveBeenCalled();
    expect(result.data).toEqual(mockServices);
    expect(result.error).toBeUndefined();
  });
  
  test('fetchServices handles errors', async () => {
    // Mock error
    const mockError = { message: 'Database error' };
    
    // Mock the database response
    const mockDb = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
    };
    
    getDatabaseClient.mockReturnValue(mockDb);
    executeWithRetry.mockResolvedValue({ data: null, error: mockError });
    
    // Call the function
    const result = await fetchServices();
    
    // Assertions
    expect(getDatabaseClient).toHaveBeenCalled();
    expect(executeWithRetry).toHaveBeenCalled();
    expect(result.data).toBeUndefined();
    expect(result.error).toBe('Failed to fetch services');
  });
});
```

These examples demonstrate how to use the database client in various scenarios, including fetching, inserting, updating, and deleting data, as well as handling errors and testing database operations.