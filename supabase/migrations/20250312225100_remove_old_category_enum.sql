-- Update any services with missing category_id
-- This ensures no services will have NULL category_id values
UPDATE "public"."services"
SET "category_id" = (
    CASE 
        WHEN "category" = 'Development' THEN 
            (SELECT id FROM "public"."service_categories" WHERE "category_slug" = 'web_dev')
        WHEN "category" = 'Consulting' THEN 
            (SELECT id FROM "public"."service_categories" WHERE "category_slug" = 'consulting')
        WHEN "category" = 'Education' THEN 
            (SELECT id FROM "public"."service_categories" WHERE "category_slug" = 'consulting')
        ELSE
            (SELECT id FROM "public"."service_categories" WHERE "category_slug" = 'web_dev')
    END
)
WHERE "category_id" IS NULL;

-- Make the category_id column required
ALTER TABLE "public"."services" 
ALTER COLUMN "category_id" SET NOT NULL;

-- Drop the old category column
ALTER TABLE "public"."services" 
DROP COLUMN "category";

-- Drop the old category enum type
DROP TYPE "public"."service_category";
