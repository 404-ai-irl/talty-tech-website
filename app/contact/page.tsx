import LeadForm from '@/components/forms/LeadForm';
import { H1, H2, P } from '@/components/ui/typography';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <H1 className="text-3xl font-bold mb-8">Contact Us</H1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <H2 className="text-xl font-semibold mb-4">Get in Touch</H2>
          <P className="mb-6">
            Have a question or want to discuss a project? Fill out the form and we&apos;ll get back to you as soon as possible.
          </P>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Email</h3>
              <P>contact@taltytech.com</P>
            </div>
            
            <div>
              <h3 className="font-medium">Location</h3>
              <P>Talty, Texas</P>
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