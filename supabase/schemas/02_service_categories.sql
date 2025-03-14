-- Creates the service_categories table for organizing services by category
CREATE TABLE IF NOT EXISTS "public"."service_categories" (
    "id" SERIAL PRIMARY KEY,
    "category_name" TEXT NOT NULL,
    "category_slug" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add comment to table
COMMENT ON TABLE "public"."service_categories" IS 'Service categories for grouping related services';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "service_categories_category_slug_idx" ON "public"."service_categories" ("category_slug");

-- Enable row-level security
ALTER TABLE "public"."service_categories" ENABLE ROW LEVEL SECURITY;