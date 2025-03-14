-- Create function to automatically update 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for service_categories table
CREATE TRIGGER update_service_categories_updated_at
BEFORE UPDATE ON "public"."service_categories"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create triggers for services table
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON "public"."services"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create triggers for service_details table
CREATE TRIGGER update_service_details_updated_at
BEFORE UPDATE ON "public"."service_details"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();