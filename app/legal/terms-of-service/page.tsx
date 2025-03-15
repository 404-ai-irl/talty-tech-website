import { H1, H2, P } from '@/components/ui/typography';
import React from 'react';

export const metadata = {
  title: 'Terms of Service | Talty Tech',
  description: 'Our terms of service outline the rules, guidelines, and legal agreements between Talty Tech and our clients.',
};

export default function TermsOfServicePage() {
  return (
    <main className="flex-grow pt-24">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <H1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</H1>
          <P className="text-lg text-slate-300 max-w-3xl mx-auto">
            Last Updated: March 1, 2025
          </P>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
            <P>
              Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the website operated by Talty Tech (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
            </P>
            
            <P>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </P>
            
            <P>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </P>

            <H2>1. Services</H2>
            <P>
              Talty Tech provides web development, workflow optimization, AI integration, custom software development, and related technology services to clients. The specific services to be provided will be outlined in a separate agreement or statement of work between Talty Tech and the client.
            </P>

            <H2>2. Client Responsibilities</H2>
            <P>
              Clients are responsible for:
            </P>
            <ul>
              <li>Providing accurate and complete information necessary for the completion of the services</li>
              <li>Reviewing and approving work at designated milestones</li>
              <li>Providing feedback in a timely manner</li>
              <li>Paying invoices according to the agreed-upon payment schedule</li>
              <li>Obtaining any necessary third-party permissions or licenses for materials provided to Talty Tech</li>
            </ul>

            <H2>3. Intellectual Property</H2>
            <h3>3.1 Client Materials</h3>
            <P>
              Clients retain all ownership rights to materials they provide to Talty Tech, including logos, images, text, and other content. By providing these materials, clients grant Talty Tech a license to use them for the purpose of providing the agreed-upon services.
            </P>

            <h3>3.2 Deliverables</h3>
            <P>
              Upon full payment of all invoices, clients will receive ownership rights to the final deliverables as specified in the project agreement. Unless otherwise specified in writing, Talty Tech retains ownership of all preliminary designs, code, and other materials created during the development process but not included in the final deliverables.
            </P>

            <h3>3.3 Talty Tech Materials</h3>
            <P>
              Talty Tech retains ownership of all proprietary tools, processes, and methodologies used in the development process. In some cases, Talty Tech may license third-party materials (such as stock photos, plugins, or libraries) for use in client projects. The terms of these licenses will be communicated to clients.
            </P>

            <H2>4. Payment Terms</H2>
            <P>
              Payment terms will be specified in the project agreement or statement of work. Typically, projects require a deposit before work begins, with remaining payments due at specified milestones or on a regular schedule. Invoices are due upon receipt unless otherwise specified.
            </P>

            <P>
              If a client fails to make a payment when due, Talty Tech reserves the right to suspend work on the project until payment is received. For overdue payments, Talty Tech may charge interest at a rate of 1.5% per month.
            </P>

            <H2>5. Project Changes and Cancellation</H2>
            <h3>5.1 Change Requests</h3>
            <P>
              Changes to the project scope, timeline, or deliverables must be requested in writing. Talty Tech will evaluate change requests and provide an estimate of any additional costs or timeline adjustments. Work on approved changes will not begin until the client has agreed to the revised terms in writing.
            </P>

            <h3>5.2 Cancellation</h3>
            <P>
              Either party may terminate a project by providing written notice to the other party. If a client cancels a project, they are responsible for paying for all work completed up to the date of cancellation, plus any non-refundable expenses incurred by Talty Tech.
            </P>

            <H2>6. Confidentiality</H2>
            <P>
              Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the project. This includes business strategies, customer data, technical specifications, and other non-public information. This obligation continues after the completion or termination of the project.
            </P>

            <H2>7. Warranties and Limitations</H2>
            <P>
              Talty Tech warrants that the services will be performed in a professional manner consistent with industry standards. Talty Tech does not warrant that the services will be error-free or that the operation of any deliverable will be uninterrupted.
            </P>

            <P>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TALTY TECH DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </P>

            <H2>8. Limitation of Liability</H2>
            <P>
              IN NO EVENT SHALL TALTY TECH BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
            </P>

            <P>
              IN ANY CASE, TALTY TECH&apos;S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY THE CLIENT FOR THE SERVICES.
            </P>

            <H2>9. Indemnification</H2>
            <P>
              Clients agree to indemnify and hold harmless Talty Tech and its employees, contractors, and affiliates from any claims, damages, liabilities, costs, or expenses (including reasonable attorney&apos;s fees) arising from the client&apos;s breach of these Terms or the client&apos;s use of the deliverables.
            </P>

            <H2>10. Governing Law</H2>
            <P>
              These Terms shall be governed and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any dispute arising from or relating to these Terms shall be resolved in the courts located in Kaufman County, Texas.
            </P>

            <H2>11. Changes to Terms</H2>
            <P>
              Talty Tech reserves the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </P>

            <H2>12. Contact Us</H2>
            <P>
              If you have any questions about these Terms, please contact us at:
            </P>
            <address>
              Talty Tech<br />
              Talty, TX 75162<br />
              Email: andrew@taltytech.com<br />
              Phone: (469) 797-4677
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}