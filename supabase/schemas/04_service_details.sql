-- Creates the service_details table for storing additional information about services
CREATE TABLE IF NOT EXISTS "public"."service_details" (
    "id" SERIAL PRIMARY KEY,
    "service_id" INTEGER NOT NULL REFERENCES "public"."services"("id") ON DELETE CASCADE,
    "benefits" JSONB NOT NULL,
    "process" JSONB NOT NULL,
    "related_services" INTEGER[] NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add comment to table
COMMENT ON TABLE "public"."service_details" IS 'Detailed information about services including benefits, process, and related services';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "service_details_service_id_idx" ON "public"."service_details" ("service_id");
CREATE INDEX IF NOT EXISTS "service_details_gin_benefits_idx" ON "public"."service_details" USING GIN ("benefits");
CREATE INDEX IF NOT EXISTS "service_details_gin_process_idx" ON "public"."service_details" USING GIN ("process");

-- Enable row-level security
ALTER TABLE "public"."service_details" ENABLE ROW LEVEL SECURITY;