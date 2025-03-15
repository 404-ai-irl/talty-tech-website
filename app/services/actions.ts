"use server"

import { createClient } from "@/utils/supabase/ssr"
import type { Database } from "@/lib/types/db.types"
import { ServiceBenefit, ServiceProcessStep } from "@/lib/types"

export type Service = Database["public"]["Tables"]["services"]["Row"]
export type ServiceDetailsRow = Database["public"]["Tables"]["service_details"]["Row"]

export async function getServices(categoryId?: string | null): Promise<Service[]> {
  const supabase = await createClient()

  let query = supabase.from("services").select("*")

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error } = await query.order("title")

  if (error) {
    console.error("Error fetching services:", error)
    throw new Error("Failed to fetch services")
  }

  return data || []
}

export async function getServiceCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("service_categories")
    .select("category_name")
    .order("category_name")

  if (error) {
    console.error("Error fetching service categories:", error)
    throw new Error("Failed to fetch service categories")
  }

  // Extract category names
  const categories = data.map(category => category.category_name)
  return categories
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("services").select("*").eq("url-slug", slug).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // Not found
    }
    console.error("Error fetching service:", error)
    throw new Error("Failed to fetch service")
  }

  return data
}

export type ServiceWithDetails = Service & {
  details: {
    benefits: ServiceBenefit[];
    process: ServiceProcessStep[];
    related_services: number[];
  } | null;
  related_services_data: Service[];
};

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
      .select("*")
      .in("id", details.related_services)

    if (!relatedError && relatedServices) {
      related_services_data = relatedServices
    }
  }

  // If no related services were specified or found, get services from the same category as fallback
  if (related_services_data.length === 0) {
    const { data: categoryServices, error: categoryError } = await supabase
      .from("services")
      .select("*")
      .eq("category_id", service.category_id)
      .neq("id", service.id)
      .limit(3)

    if (!categoryError && categoryServices) {
      related_services_data = categoryServices
    }
  }

  return {
    ...service,
    details: details ? {
      benefits: details.benefits as unknown as ServiceBenefit[],
      process: details.process as unknown as ServiceProcessStep[],
      related_services: details.related_services
    } : null,
    related_services_data,
  }
}
