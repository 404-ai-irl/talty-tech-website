"use server"

import { createClient } from "@/utils/supabase/ssr"
import type { Database } from "@/lib/types/db.types"
import { ServiceBenefit, ServiceProcessStep } from "@/lib/types"
import type { ServiceCategory } from "./serviceCategories"

export type Service = Database["public"]["Tables"]["services"]["Row"] & {
  service_categories?: ServiceCategory
}

export type ServiceDetailsRow = Database["public"]["Tables"]["service_details"]["Row"]

export async function getServices(categorySlug?: string | null): Promise<Service[]> {
  const supabase = await createClient()

  try {
    // If a category slug is provided, first find the category ID
    let categoryId: string | undefined = undefined;
    
    if (categorySlug) {
      const { data: category, error: categoryError } = await supabase
        .from("service_categories")
        .select("id")
        .eq("category_slug", categorySlug)
        .single();
      
      if (categoryError) {
        if (categoryError.code !== "PGRST116") {
          console.error("Error fetching category:", categoryError);
        }
        return [];
      }
      
      categoryId = category.id;
    }
    
    // Fetch services, filtered by category if needed
    let servicesQuery = supabase.from("services").select("*");
    
    if (categoryId) {
      servicesQuery = servicesQuery.eq("category_id", categoryId);
    }
    
    const { data: services, error: servicesError } = await servicesQuery.order("title");
    
    if (servicesError) {
      console.error("Error fetching services:", servicesError);
      throw new Error("Failed to fetch services");
    }
    
    if (!services || services.length === 0) {
      return [];
    }
    
    // For each service, fetch its category
    const servicesWithCategories = await Promise.all(
      services.map(async (service) => {
        const { data: serviceCategory, error: serviceCategoryError } = await supabase
          .from("service_categories")
          .select("*")
          .eq("id", service.category_id)
          .single();
        
        return {
          ...service,
          service_categories: serviceCategoryError ? undefined : serviceCategory
        };
      })
    );
    
    console.log('Returning servicesWithCategories:', 
      servicesWithCategories.map(item => ({
        category: item.service_categories?.category_name || 'Unknown',
        // Remove services_count since 'services' property doesn't exist on this object
        title: item.title
      })));
    return servicesWithCategories;
  } catch (error) {
    console.error("Error in getServices:", error);
    throw new Error("Failed to fetch services");
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient()

  // First get the service
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("url-slug", slug)
    .single()

  if (serviceError) {
    if (serviceError.code === "PGRST116") {
      return null // Not found
    }
    console.error("Error fetching service:", serviceError)
    throw new Error("Failed to fetch service")
  }

  // Then get the category separately
  const { data: category, error: categoryError } = await supabase
    .from("service_categories")
    .select("*")
    .eq("id", service.category_id)
    .single()

  if (categoryError && categoryError.code !== "PGRST116") {
    console.error("Error fetching service category:", categoryError)
    // Continue even if category fetch fails
  }

  return {
    ...service,
    service_categories: categoryError ? undefined : category
  }
}

export type ServiceWithDetails = Service & {
  details: {
    benefits: ServiceBenefit[];
    process: ServiceProcessStep[];
    related_services: number[];
    id: string;
    created_at: string;
    service_id: number;
  } | null;
  related_services_data: Service[];
}

export async function getServicesByCategoryWithLimit(limit: number = 5): Promise<{category: ServiceCategory, services: Service[]}[]> {
  console.log('getServicesByCategoryWithLimit called with limit:', limit);
  const supabase = await createClient();

  try {
    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from("service_categories")
      .select("*")
      .order("category_name");

    if (categoriesError) {
      console.error('Error fetching categories in getServicesByCategoryWithLimit:', categoriesError);
      console.error("Error fetching categories:", categoriesError);
      throw new Error("Failed to fetch categories");
    }

    console.log('Categories fetched:', categories?.length || 0);
    if (!categories || categories.length === 0) {
      console.log('No categories found, returning empty array');
      return [];
    }

    // Get services for each category
    const servicesWithCategories = await Promise.all(
      categories.map(async (category) => {
        try {
          console.log(`Fetching services for category: ${category.category_name} (ID: ${category.id})`);
          const { data: services, error: servicesError } = await supabase
            .from("services")
            .select("*")
            .eq("category_id", category.id)
            .order("title")
            .limit(limit);

          if (servicesError) {
            console.error(`Error fetching services for category ${category.category_name}:`, servicesError);
            return { category, services: [] };
          }

          console.log(`Found ${services?.length || 0} services for category ${category.category_name}`);
          return {
            category,
            services: services || []
          };
        } catch (err) {
          console.error(`Exception fetching services for category ${category?.category_name || 'unknown'}:`, err);
          return { category, services: [] };
        }
      })
    );

    console.log('Final result:', servicesWithCategories.map(c => `${c.category?.category_name || 'Unknown'}: ${c.services?.length || 0} services`));
    return servicesWithCategories;
  } catch (error) {
    console.error("Error in getServicesByCategory:", error);
    // Return empty array instead of throwing error to prevent breaking the UI
    return [];
  }
}

export async function getServiceWithDetailsBySlug(slug: string): Promise<ServiceWithDetails | null> {
  const supabase = await createClient()

  // Fetch the service by slug
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("url-slug", slug)
    .single()

  if (serviceError) {
    if (serviceError.code === "PGRST116") {
      return null // Not found
    }
    console.error("Error fetching service:", serviceError)
    throw new Error("Failed to fetch service")
  }
  
  // Then get the category separately
  const { data: category, error: categoryError } = await supabase
    .from("service_categories")
    .select("*")
    .eq("id", service.category_id)
    .single()

  if (categoryError && categoryError.code !== "PGRST116") {
    console.error("Error fetching service category:", categoryError)
    // Continue even if category fetch fails
  }
  
  // Add the category to the service object
  const serviceWithCategory = {
    ...service,
    service_categories: categoryError ? undefined : category
  }

  // Fetch the service details
  const { data: details, error: detailsError } = await supabase
    .from("service_details")
    .select("*")
    .eq("service_id", service.id)
    .single()

  if (detailsError && detailsError.code !== "PGRST116") {
    console.error("Error fetching service details:", detailsError)
    throw new Error("Failed to fetch service details")
  }

  // Fetch related services
  let related_services_data: Service[] = []
  if (details && details.related_services && details.related_services.length > 0) {
    const { data: relatedServices, error: relatedError } = await supabase
      .from("services")
      .select(`
        *,
        service_categories(*)
      `)
      .in("id", details.related_services)

    if (!relatedError && relatedServices) {
      related_services_data = relatedServices
    }
  }

  // If no related services were specified or found, get services from the same category as fallback
  if (related_services_data.length === 0) {
    try {
      // Get services from the same category
      const { data: categoryServicesRaw, error: categoryError } = await supabase
        .from("services")
        .select("*")
        .eq("category_id", service.category_id)
        .neq("id", service.id)
        .limit(3)

      // For each service, fetch its category
      if (!categoryError && categoryServicesRaw && categoryServicesRaw.length > 0) {
        const servicesWithCategories = await Promise.all(
          categoryServicesRaw.map(async (svc) => {
            const { data: svcCat } = await supabase
              .from("service_categories")
              .select("*")
              .eq("id", svc.category_id)
              .single()
              
            return {
              ...svc,
              service_categories: svcCat || undefined
            }
          })
        )
        related_services_data = servicesWithCategories
      }
    } catch (error) {
      console.error("Error fetching related services by category:", error)
      // Continue even if this fails
    }
  }

  return {
    ...serviceWithCategory,
    details: details ? {
      ...details,
      benefits: details.benefits as unknown as ServiceBenefit[],
      process: details.process as unknown as ServiceProcessStep[],
      related_services: details.related_services
    } : null,
    related_services_data,
  }
}
