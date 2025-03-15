-- Create new service_categories table
CREATE TABLE "public"."service_categories" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "category_name" text NOT NULL,
    "category_slug" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    UNIQUE ("category_slug")
);

-- Enable row level security
ALTER TABLE "public"."service_categories" ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access for service_categories"
ON "public"."service_categories"
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- Grant permissions to roles
GRANT SELECT ON TABLE "public"."service_categories" TO anon;
GRANT SELECT ON TABLE "public"."service_categories" TO authenticated;
GRANT ALL ON TABLE "public"."service_categories" TO service_role;

-- Insert the predefined categories
INSERT INTO "public"."service_categories" ("category_name", "category_slug") VALUES
('Custom AI Solutions', 'custom_ai'),
('Automation', 'automation'),
('Web Development', 'web_dev'),
('Lead Funnels', 'lead_funnels'),
('Consulting', 'consulting');

-- Add category_id column to services table
ALTER TABLE "public"."services" 
ADD COLUMN "category_id" uuid REFERENCES "public"."service_categories"("id");

-- Create an index for faster lookups
CREATE INDEX "idx_services_category_id" ON "public"."services" ("category_id");

-- Note: This migration doesn't remove the old 'category' column or migrate existing data.
-- You may want to write a data migration script to populate the new category_id field
-- based on existing category values before making the new column required.
