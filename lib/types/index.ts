import type { Database } from "./db.types"

export type ServiceCategoryEnum = Database["public"]["Enums"]["service_category"];

export type ServiceBenefit = {
  title: string;
  description: string;
  icon: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
  order: number;
};

export type ServiceDetails = Database['public']['Tables']['service_details']['Row'] & {
  benefits: ServiceBenefit[];
  process: ServiceProcessStep[];
};
