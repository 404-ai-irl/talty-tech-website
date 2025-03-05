import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">About Talty Tech</h1>
      
      <section id="mission" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          At Talty Tech, our mission is to empower Texas businesses with innovative web development 
          and AI solutions. We believe in combining cutting-edge technology with thoughtful design 
          to create digital experiences that drive business growth and enhance user engagement.
        </p>
        <p>
          We're committed to delivering high-quality, scalable solutions that address the unique 
          challenges and opportunities of our clients, helping them thrive in an increasingly 
          digital world.
        </p>
      </section>
      
      <section id="founder" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Founder</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {/* Placeholder for founder image */}
            <div className="bg-slate-200 w-full aspect-square rounded-md flex items-center justify-center">
              <span className="text-slate-500">Founder Image</span>
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-medium mb-2">John Talty</h3>
            <p className="mb-4">
              John Talty founded Talty Tech with a vision to bring enterprise-level technology 
              solutions to businesses of all sizes in Texas. With over 15 years of experience 
              in software development and a deep understanding of business needs, John has 
              built a company that combines technical expertise with a client-first approach.
            </p>
            <p>
              Prior to founding Talty Tech, John worked with several Fortune 500 companies, 
              leading digital transformation initiatives and developing innovative solutions 
              to complex business challenges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}