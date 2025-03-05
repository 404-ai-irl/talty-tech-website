import React from 'react';
import LeadForm from '@/components/forms/LeadForm';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have a question or want to discuss a project? Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Email</h3>
              <p>contact@taltytech.com</p>
            </div>
            
            <div>
              <h3 className="font-medium">Location</h3>
              <p>Talty, Texas</p>
            </div>
          </div>
        </div>
        
        <div>
          <LeadForm />
        </div>
      </div>
    </div>
  );
}