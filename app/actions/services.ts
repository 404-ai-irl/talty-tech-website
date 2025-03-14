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
