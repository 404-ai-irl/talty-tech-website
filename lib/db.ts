import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/db.types'

// Check that environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables')
}

// Create a singleton Supabase client for the entire app
// This helps prevent multiple instances warning
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabase = () => {
  if (supabaseInstance) {
    return supabaseInstance;
  }
  
  supabaseInstance = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  return supabaseInstance;
}

// Expose the client directly for backward compatibility
export const db = getSupabase();

// Define types matching your schema for better type safety
export type ServiceCategory = Database['public']['Tables']['service_categories']['Row']
export type Service = Database['public']['Tables']['services']['Row'] 
export type ServiceDetail = Database['public']['Tables']['service_details']['Row']

// Helper functions for common queries
export async function getServiceCategories() {
  try {
    console.log('getServiceCategories: Starting...');
    const { data, error } = await db
      .from('service_categories')
      .select('*')
      .order('category_name')
    
    if (error) {
      console.error('getServiceCategories: Error fetching categories:', error)
      return []
    }
    
    console.log(`getServiceCategories: Found ${data?.length || 0} categories`);
    return data || []
  } catch (err) {
    console.error('getServiceCategories: Exception:', err);
    return [];
  }
}

export async function getServicesByCategory(categoryId: string, limit?: number) {
  try {
    console.log(`getServicesByCategory: Getting services for category ${categoryId}`);
    let query = db
      .from('services')
      .select('*')
      .eq('category_id', categoryId)
      .order('title')
    
    if (limit) {
      query = query.limit(limit)
      console.log(`getServicesByCategory: Limiting to ${limit} results`);
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error(`getServicesByCategory: Error fetching services for category ${categoryId}:`, error)
      return []
    }
    
    console.log(`getServicesByCategory: Found ${data?.length || 0} services for category ${categoryId}`);
    return data || []
  } catch (err) {
    console.error(`getServicesByCategory: Exception for category ${categoryId}:`, err);
    return [];
  }
}

export async function getAllServicesByCategory(limit: number = 4) {
  try {
    console.log('getAllServicesByCategory: Starting...');
    // Get all categories
    const categories = await getServiceCategories();
    console.log(`getAllServicesByCategory: Got ${categories.length} categories`);
    
    if (!categories || categories.length === 0) {
      console.log('getAllServicesByCategory: No categories found, returning empty array');
      return [];
    }
    
    // Get services for each category
    console.log('getAllServicesByCategory: Fetching services for each category...');
    const result = await Promise.all(
      categories.map(async (category) => {
        try {
          console.log(`getAllServicesByCategory: Fetching services for category ${category.category_name} (${category.id})`);
          const services = await getServicesByCategory(category.id, limit);
          console.log(`getAllServicesByCategory: Found ${services.length} services for category ${category.category_name}`);
          
          return {
            category,
            services
          };
        } catch (err) {
          console.error(`getAllServicesByCategory: Error fetching services for category ${category.category_name}:`, err);
          return {
            category,
            services: []
          };
        }
      })
    );
    
    console.log(`getAllServicesByCategory: Completed with ${result.length} categories`);
    return result;
  } catch (error) {
    console.error('Error in getAllServicesByCategory:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await db
    .from('services')
    .select('*')
    .eq('url-slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching service by slug:', error)
    return null
  }
  
  return data
}

export async function getServiceWithDetails(serviceId: number) {
  const { data, error } = await db
    .from('service_details')
    .select('*')
    .eq('service_id', serviceId)
    .single()
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching service details:', error)
    return null
  }
  
  return data
}
