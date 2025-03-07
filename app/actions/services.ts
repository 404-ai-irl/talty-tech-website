"use server"

import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/types/database.types"
import type { ServiceCategoryEnum } from "@/lib/types"

export type Service = Database["public"]["Tables"]["services"]["Row"]
export type ServiceWithCategory = Service & {
  service_category: Database["public"]["Tables"]["service_categories"]["Row"]
}

export async function getServices(category?: ServiceCategoryEnum): Promise<Service[]> {
  const supabase = createClient()

  let query = supabase.from("services").select(`
    *
  `)

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

export async function getServiceCategories() {
  const supabase = createClient()

  const { data, error } = await supabase.from("service_categories").select("*").order("name")

  if (error) {
    console.error("Error fetching service categories:", error)
    throw new Error("Failed to fetch service categories")
  }

  return data || []
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("services").select("*").eq("href", `/services/${slug}`).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // Not found
    }
    console.error("Error fetching service:", error)
    throw new Error("Failed to fetch service")
  }

  return data
}

