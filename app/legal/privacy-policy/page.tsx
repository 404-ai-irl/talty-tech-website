import { H1, H2, P } from "@/components/ui/typography";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy | Watchtower Web',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-grow pt-24">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <H1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</H1>
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
              At Watchtower Web, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </P>

            <H2>Information We Collect</H2>
            <P>
              We collect information that you provide directly to us. For example, we collect information when you:
            </P>
            <ul>
              <li>Fill out a form on our website</li>
              <li>Create an account</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a quote</li>
              <li>Participate in a survey</li>
              <li>Contact us with questions or feedback</li>
            </ul>

            <P>
              The types of information we may collect include your name, email address, postal address, phone number, company information, and any other information you choose to provide.
            </P>

            <h3>Automatically Collected Information</h3>
            <P>
              When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages that you view, what websites or search terms referred you to the site, and information about how you interact with the site.
            </P>

            <H2>How We Use Your Information</H2>
            <P>
              We use the information we collect to:
            </P>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Provide news and information we think will be of interest to you</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve the services and provide content or features that match user profiles or interests</li>
            </ul>

            <H2>Sharing of Information</H2>
            <P>
              We may share information about you as follows or as otherwise described in this Privacy Policy:
            </P>
            <ul>
              <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
              <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
              <li>If we believe your actions are inconsistent with the spirit or language of our user agreements or policies, or to protect the rights, property, and safety of Watchtower Web or others</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</li>
              <li>With your consent or at your direction, including if we notify you that the information you provide will be shared in a particular manner and you provide such information</li>
            </ul>

            <H2>Data Security</H2>
            <P>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no Internet or email transmission is ever fully secure or error-free. In particular, email sent to or from the services may not be secure. Therefore, you should take special care in deciding what information you send to us via email.
            </P>

            <H2>Your Choices</H2>
            <h3>Account Information</h3>
            <P>
              You may update, correct, or delete information about you at any time by logging into your online account or emailing us at privacy@watchtowerweb.com. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.
            </P>

            <h3>Cookies</h3>
            <P>
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our services.
            </P>

            <h3>Promotional Communications</h3>
            <P>
              You may opt out of receiving promotional emails from Watchtower Web by following the instructions in those emails or by emailing us. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
            </P>

            <H2>Changes to this Privacy Policy</H2>
            <P>
              We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification). We encourage you to review the privacy policy whenever you access the services to stay informed about our information practices and the ways you can help protect your privacy.
            </P>

            <H2>Contact Us</H2>
            <P>
              If you have any questions about this privacy policy, please contact us at:
            </P>
            <address>
              Watchtower Web<br />
              123 Tech Boulevard, Suite 456<br />
              San Francisco, CA 94105<br />
              Email: privacy@watchtowerweb.com<br />
              Phone: (415) 555-0123
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}