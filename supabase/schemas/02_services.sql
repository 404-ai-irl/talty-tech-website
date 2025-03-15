-- Create the service category enum type
CREATE TYPE service_category AS ENUM (
    'custom_ai',
    'automation',
    'website_development'
);

-- Creates the consolidated services table
CREATE TABLE IF NOT EXISTS "public"."services" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url_slug" TEXT NOT NULL UNIQUE,
    "icon" TEXT NOT NULL,
    "category" service_category NOT NULL,
    "category_name" TEXT NOT NULL,
    "benefits" JSONB NOT NULL,
    "process" JSONB NOT NULL,
    "related_services" INTEGER[] NOT NULL,
    "active" BOOLEAN DEFAULT TRUE NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add comment to table
COMMENT ON TABLE "public"."services" IS 'Consolidated services table with detailed information about service offerings';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "services_category_idx" ON "public"."services" ("category");
CREATE INDEX IF NOT EXISTS "services_url_slug_idx" ON "public"."services" ("url_slug");
CREATE INDEX IF NOT EXISTS "services_gin_benefits_idx" ON "public"."services" USING GIN ("benefits");
CREATE INDEX IF NOT EXISTS "services_gin_process_idx" ON "public"."services" USING GIN ("process");

-- Enable row-level security
ALTER TABLE "public"."services" ENABLE ROW LEVEL SECURITY;

-- Create function to update timestamp on record update
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_services_modtime
BEFORE UPDATE ON "public"."services"
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
