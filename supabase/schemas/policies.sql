-- Define RLS policies for service_categories
CREATE POLICY "Allow public read access to service_categories" 
ON "public"."service_categories"
FOR SELECT 
TO public 
USING (true);

-- Define RLS policies for services
CREATE POLICY "Allow public read access to services" 
ON "public"."services"
FOR SELECT 
TO public 
USING (active = true);

-- Define RLS policies for service_details
CREATE POLICY "Allow public read access to service_details" 
ON "public"."service_details"
FOR SELECT 
TO public 
USING (EXISTS (
    SELECT 1 FROM "public"."services" 
    WHERE "services"."id" = "service_details"."service_id" AND "services"."active" = true
));