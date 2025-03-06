import React from 'react';
import Link from 'next/link';
import { services } from './data';
import {
  H1,
  H2,
  P
} from '@/components/ui/typography';

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <H1 className="mb-8">Our Services</H1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            id={service.href.split('/').pop()}
            className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <H2 className="text-xl font-semibold mb-3 border-0">{service.title}</H2>
            <P className="text-slate-600 mb-4">{service.description}</P>
            <Link
              href={service.href}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more →
            </Link>
          </div>
        ))}
      </div>
      
      <section id="consulting" className="mt-16">
        <H2 className="mb-4">Consulting Services</H2>
        <P>
          Our expert consultants work closely with your team to understand your business goals and challenges,
          providing tailored recommendations and strategies to help you leverage technology effectively.
        </P>
      </section>
      
      <section id="development" className="mt-12">
        <H2 className="mb-4">Development Services</H2>
        <P>
          From concept to deployment, our development team builds robust, scalable solutions
          using the latest technologies and best practices to ensure your project&apos;s success.
        </P>
      </section>
      
      <section id="training" className="mt-12">
        <H2 className="mb-4">Training Services</H2>
        <P>
          We offer comprehensive training programs to help your team master new technologies
          and tools, ensuring you can maintain and extend your digital solutions independently.
        </P>
      </section>
    </div>
  );
}