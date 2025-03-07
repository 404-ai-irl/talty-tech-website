"use server"

import { supabase } from "@/lib/supabase"
import { leadFormSchema, type LeadFormValues } from "@/db/leadSchema"

export async function submitLeadForm(formData: LeadFormValues) {
  try {
    // Validate form data
    const validatedData = leadFormSchema.parse(formData)

    // Add timestamp
    const leadData = {
      ...validatedData,
      created_at: new Date().toISOString(),
    }

    // Insert into Supabase
    const { error } = await supabase.from("leads").insert([leadData])

    if (error) {
      console.error("Error submitting lead:", error)
      return { success: false, message: "Failed to submit your information. Please try again." }
    }

    return {
      success: true,
      message: "Thank you for your interest! We will contact you soon.",
    }
  } catch (error) {
    console.error("Error in submitLeadForm:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

