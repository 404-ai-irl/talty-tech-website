import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, serviceCategories, servicesIconMap } from '../data';
import {
  H1,
  P
} from '@/components/ui/typography';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Find the category from the URL parameter
  const categorySlug = params.category;
  
  // Find the matching category from our data
  const category = serviceCategories.find(
    cat => cat.href === `/services/${categorySlug}`
  );
  
  // If category doesn't exist, show 404
  if (!category) {
    notFound();
  }
  
  // Filter services by the selected category
  const categoryServices = services.filter(
    service => service.category.href === category.href
  );
  
  // If no services found for this category, show 404
  if (categoryServices.length === 0) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/services" className="text-blue-600 hover:text-blue-800">
          ← Back to all services
        </Link>
      </div>
      
      <H1 className="mb-4">{category.name} Services</H1>
      
      <P className="text-lg text-slate-600 mb-8">
        {category.name === "Consulting"
          ? "Our expert consultants work closely with your team to understand your business goals and challenges, providing tailored recommendations and strategies to help you leverage technology effectively."
          : category.name === "Development"
            ? "From concept to deployment, our development team builds robust, scalable solutions using the latest technologies and best practices to ensure your project's success."
            : "We offer comprehensive training programs to help your team master new technologies and tools, ensuring you can maintain and extend your digital solutions independently."}
      </P>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categoryServices.map((service, index) => {
          const Icon = servicesIconMap[service.icon];
          
          return (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {Icon && <Icon className="h-6 w-6 mr-2 text-blue-600" />}
                <h2 className="text-xl font-semibold">{service.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{service.description}</p>
              <Link
                href={service.href}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn more →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Generate static paths for all categories
export function generateStaticParams() {
  return serviceCategories.map(category => ({
    category: category.href.split('/').pop(),
  }));
}