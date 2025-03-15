import type { Database } from "./db.types"

// No enums in the database schema

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

export type ServiceDetails = Omit<Database['public']['Tables']['service_details']['Row'], 'benefits' | 'process'> & {
  benefits: ServiceBenefit[];
  process: ServiceProcessStep[];
};
