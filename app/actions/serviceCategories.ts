"use server"

import { createClient } from "@/utils/supabase/ssr"

export type ServiceCategory = {
  id: string;
  category_name: string;
  category_slug: string;
  created_at: string;
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .order("category_name")

  if (error) {
    console.error("Error fetching service categories:", error)
    throw new Error("Failed to fetch service categories")
  }

  return data || []
}

export async function getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .eq("category_slug", slug)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // Not found
    }
    console.error("Error fetching service category:", error)
    throw new Error("Failed to fetch service category")
  }

  return data
}
