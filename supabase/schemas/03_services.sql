-- Creates the services table for individual service offerings
CREATE TABLE IF NOT EXISTS "public"."services" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url-slug" TEXT NOT NULL UNIQUE,
    "icon" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL REFERENCES "public"."service_categories"("id") ON DELETE CASCADE,
    "active" BOOLEAN DEFAULT TRUE NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add comment to table
COMMENT ON TABLE "public"."services" IS 'Individual service offerings provided by the company';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "services_category_id_idx" ON "public"."services" ("category_id");
CREATE INDEX IF NOT EXISTS "services_url_slug_idx" ON "public"."services" ("url-slug");

-- Enable row-level security
ALTER TABLE "public"."services" ENABLE ROW LEVEL SECURITY;