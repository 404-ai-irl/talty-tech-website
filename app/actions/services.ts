"use server"

import { createClient } from "@/lib/supabase/ssr"
import type { Database } from "@/lib/types/db.types"
import { ServiceCategoryEnum } from "@/lib/types"

export type Service = Database["public"]["Tables"]["services"]["Row"]

export async function getServices(category?: ServiceCategoryEnum | null): Promise<Service[]> {
  const supabase = await createClient()

  let query = supabase.from("services").select("*")

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query.order("title")

  if (error) {
    console.error("Error fetching services:", error)
    throw new Error("Failed to fetch services")
  }

  return data || []
}

export async function getServiceCategories(): Promise<ServiceCategoryEnum[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("services")
    .select("category")
    .order("category")

  if (error) {
    console.error("Error fetching service categories:", error)
    throw new Error("Failed to fetch service categories")
  }

  // Extract unique categories
  const categories = [...new Set(data.map(service => service.category))] as ServiceCategoryEnum[]
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
