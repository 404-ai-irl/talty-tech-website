/**
 * This file contains TypeScript type definitions for the Supabase database schema.
 * It should be kept in sync with the actual database schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          icon: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          icon: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          icon?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_fkey"
            columns: ["category"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
          href: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          href: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          href?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          message: string
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          message: string
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          message?: string
          created_at?: string
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}