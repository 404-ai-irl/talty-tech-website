-- Create the service_details table
CREATE TABLE "public"."service_details" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "service_id" integer NOT NULL REFERENCES "public"."services"("id") ON DELETE CASCADE,
    "benefits" jsonb NOT NULL DEFAULT '[]'::jsonb,
    "process" jsonb NOT NULL DEFAULT '[]'::jsonb,
    "related_services" integer[] NOT NULL DEFAULT '{}'::integer[],
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    UNIQUE ("service_id")
);

-- Enable row level security
ALTER TABLE "public"."service_details" ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access for service_details"
ON "public"."service_details"
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

-- Grant permissions to roles
GRANT SELECT ON TABLE "public"."service_details" TO anon;
GRANT SELECT ON TABLE "public"."service_details" TO authenticated;
GRANT ALL ON TABLE "public"."service_details" TO service_role;
