import Link from "next/link"
import React, { memo } from "react"
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FancyLogo from "@/components/fancy-logo"

/**
 * Footer link component for consistent styling
 */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, className }) => (
  <Link 
    href={href} 
    className={`text-muted-foreground transition-colors hover:text-foreground ${className || ''}`}
  >
    {children}
  </Link>
);

/**
 * Contact item with icon component
 */
interface ContactItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, children }) => (
  <li className="flex items-start gap-2">
    {React.createElement(icon, { 
      className: "mt-0.5 h-4 w-4 text-muted-foreground", 
      "aria-hidden": "true" 
    })}
    <span className="text-muted-foreground">{children}</span>
  </li>
);

/**
 * Footer section with title
 */
interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children, id }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium" id={id}>{title}</h3>
    {children}
  </div>
);

/**
 * Footer component with company information, navigation links, and contact details
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <FancyLogo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Bringing innovative technology solutions to local businesses since we were founded in 2025. We help you compete, grow, and
              thrive in the digital age.
            </p>
          </div>

          {/* Company Links */}
          <FooterSection title="Company" id="company-links">
            <ul className="space-y-2 text-sm" aria-labelledby="company-links">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/about/team">Our Team</FooterLink>
              </li>
              <li>
                <FooterLink href="/about/careers">Careers</FooterLink>
              </li>
              <li>
                <FooterLink href="/about/mission">Mission & Values</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">Blog</FooterLink>
              </li>
            </ul>
          </FooterSection>

          {/* Services Links */}
          <FooterSection title="Services" id="services-links">
            <ul className="space-y-2 text-sm" aria-labelledby="services-links">
              <li>
                <FooterLink href="/services/developing">Developing</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/consulting">Consulting</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/training">Training & Education</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/security">Security Solutions</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/cloud">Cloud Services</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/mobile">Mobile Development</FooterLink>
              </li>
            </ul>
          </FooterSection>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium" id="contact-info">Contact Us</h3>
            <ul className="space-y-3 text-sm" aria-labelledby="contact-info">
              <ContactItem icon={MapPin}>
                123 Tech Avenue, Suite 400
                <br />
                San Francisco, CA 94107
              </ContactItem>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <FooterLink href="tel:+15551234567" className="inline-flex">(555) 123-4567</FooterLink>
              </li>
              <li className="flex items-center gap-2"> 
                <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <FooterLink href="mailto:info@taltytech.com">info@taltytech.com</FooterLink>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium" id="newsletter-signup">Subscribe to our newsletter</h4>
              <form className="flex gap-2" aria-labelledby="newsletter-signup">
                <Input 
                  type="email" 
                  placeholder="Email address" 
                  className="max-w-[180px]" 
                  aria-label="Email address for newsletter"
                  required
                />
                <Button variant="default" size="sm" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Talty Tech. All rights reserved.
            </p>
            <nav aria-label="Legal links">
              <div className="flex gap-4">
                <FooterLink href="/privacy" className="text-xs">
                  Privacy Policy
                </FooterLink>
                <FooterLink href="/terms" className="text-xs">
                  Terms of Service
                </FooterLink>
                <FooterLink href="/cookies" className="text-xs">
                  Cookie Policy
                </FooterLink>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Footer);