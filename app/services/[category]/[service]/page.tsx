import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, servicesIconMap } from '../../data';
import {
  H1,
  H2,
  H3,
  P,
  List
} from '@/components/ui/typography';

interface ServicePageProps {
  params: {
    category: string;
    service: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const { category, service: serviceSlug } = params;
  
  // Find the specific service based on URL parameters
  const service = services.find(s => {
    const parts = s.href.split('/');
    return parts[2] === category && parts[3] === serviceSlug;
  });
  
  // If service doesn't exist, show 404
  if (!service) {
    notFound();
  }
  
  // Get the icon component for this service
  const Icon = servicesIconMap[service.icon];
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link 
          href={`/services/${category}`} 
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to {service.category.name} services
        </Link>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          {Icon && <Icon className="h-8 w-8 mr-3 text-blue-600" />}
          <H1>{service.title}</H1>
        </div>
        
        <div className="max-w-none">
          <P className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            {service.description}
          </P>
          
          {/* Additional service details - this would typically come from a CMS or more detailed data source */}
          <H2>What We Offer</H2>
          <P>
            Our {service.title} service is designed to help businesses achieve their goals through
            innovative technology solutions. We work closely with you to understand your specific needs
            and deliver tailored solutions that drive results.
          </P>
          
          <H2>Our Approach</H2>
          <P>
            We follow a collaborative, iterative approach to ensure that the final product meets your
            expectations and business requirements. Our team of experts will guide you through every
            step of the process, from initial consultation to final delivery and beyond.
          </P>
          
          <H2>Why Choose Us</H2>
          <List>
            <li>Experienced team with deep technical expertise</li>
            <li>Proven track record of successful projects</li>
            <li>Client-focused approach with clear communication</li>
            <li>Commitment to quality and best practices</li>
            <li>Ongoing support and maintenance options</li>
          </List>
          
          <div className="mt-12 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
            <H3 className="mb-4">Ready to get started?</H3>
            <P>Contact us today to discuss how our {service.title} service can benefit your business.</P>
            <Link
              href="/contact"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for all services
export function generateStaticParams() {
  return services.map(service => {
    const parts = service.href.split('/');
    return {
      category: parts[2],
      service: parts[3],
    };
  });
}