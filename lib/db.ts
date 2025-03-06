import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

/**
 * Custom error class for database connection issues
 */
export class DatabaseConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseConnectionError';
  }
}

/**
 * Options for database connection
 */
export interface ConnectionOptions {
  /** Whether to use connection pooling (default: true) */
  usePooling?: boolean;
  /** Connection timeout in milliseconds (default: 5000) */
  timeout?: number;
  /** Whether to retry failed connections (default: true) */
  retry?: boolean;
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Delay between retries in milliseconds (default: 1000) */
  retryDelay?: number;
}

/**
 * Creates and returns a Supabase client with proper error handling
 * 
 * @param options - Connection options
 * @returns Supabase client instance
 * @throws {DatabaseConnectionError} If environment variables are missing or connection fails
 */
export function createDatabaseClient(options: ConnectionOptions = {}) {
  const { 
    usePooling = true, 
    timeout = 5000,
    retry = true,
    maxRetries = 3,
    retryDelay = 1000
  } = options;
  
  // Ensure required environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new DatabaseConnectionError('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new DatabaseConnectionError('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
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
        fetch: (url: RequestInfo | URL, options: RequestInit | undefined) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          return fetch(url, {
            ...options,
            signal: controller.signal,
          }).finally(() => clearTimeout(timeoutId));
        }
      }
    }
  );
  
  return supabase;
}

// Singleton instance for client-side use
let clientInstance: ReturnType<typeof createDatabaseClient> | null = null;

/**
 * Returns a singleton database client instance
 * Creates a new instance if one doesn't exist
 * 
 * @returns Supabase client instance
 */
export function getDatabaseClient() {
  if (!clientInstance) {
    clientInstance = createDatabaseClient();
  }
  return clientInstance;
}

/**
 * Creates an admin client for server-side operations
 * Requires SUPABASE_SERVICE_ROLE_KEY to be set
 * 
 * @returns Supabase admin client instance
 * @throws {DatabaseConnectionError} If SUPABASE_SERVICE_ROLE_KEY is not defined
 */
export function createAdminDatabaseClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new DatabaseConnectionError('SUPABASE_SERVICE_ROLE_KEY is not defined');
  }
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
      }
    }
  );
}

/**
 * Executes a database query with retry logic for handling transient errors
 * 
 * @param queryFn - Function that performs the database query
 * @param options - Retry options
 * @returns Result of the database query
 */
export async function executeWithRetry<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  options: Pick<ConnectionOptions, 'maxRetries' | 'retryDelay'> = {}
) {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const result = await queryFn();
      
      // If no error or it's not a connection error, return immediately
      if (!result.error || !isRetryableError(result.error)) {
        return result;
      }
      
      // For retryable errors, increment retry counter and wait
      retries++;
      console.warn(`Database operation failed (attempt ${retries}/${maxRetries}):`, result.error);
      
      if (retries >= maxRetries) {
        return result;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * retries));
    } catch (err) {
      retries++;
      console.error(`Unexpected database error (attempt ${retries}/${maxRetries}):`, err);
      
      if (retries >= maxRetries) {
        throw err;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * retries));
    }
  }
  
  // This should never be reached due to the returns in the loop
  throw new DatabaseConnectionError('Max retries exceeded');
}

/**
 * Determines if an error is retryable
 * 
 * @param error - The error to check
 * @returns Whether the error is retryable
 */
function isRetryableError(error: any): boolean {
  // Connection errors, timeout errors, and certain PostgreSQL errors are retryable
  const retryableCodes = [
    'PGRST116', // Connection error
    'PGRST110', // Timeout error
    '08006',    // Connection failure
    '08001',    // Unable to establish connection
    '57P01',    // Database shutdown
    '40001',    // Serialization failure
    '40P01',    // Deadlock detected
  ];
  
  return retryableCodes.includes(error.code) || 
         error.message?.includes('connection') ||
         error.message?.includes('timeout');
}

/**
 * Example usage:
 * 
 * // Get a database client
 * const db = getDatabaseClient();
 * 
 * // Execute a query with retry logic
 * const { data, error } = await executeWithRetry(() => 
 *   db.from('services').select('*')
 * );
 * 
 * if (error) {
 *   console.error('Failed to fetch services:', error);
 *   return { error: 'Failed to load services' };
 * }
 * 
 * return { data };
 */