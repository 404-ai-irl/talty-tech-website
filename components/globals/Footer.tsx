import Link from "next/link"
import React, { memo, use, Suspense } from "react"
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, type LucideIcon } from "lucide-react"
import { getServiceCategories } from "@/app/actions/serviceCategories"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import FancyLogo from "@/components/globals/fancy-logo"

/**
 * Footer link component for consistent styling
 */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Footer Services Categories Component
 */
function FooterServiceCategories() {
  const categoriesPromise = getServiceCategories();
  const categories = use(categoriesPromise);
  
  return (
    <ul className="space-y-2 text-sm" aria-labelledby="services-links">
      <li>
        <FooterLink href="/services">All Services</FooterLink>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <FooterLink href={`/services/category/${category.category_slug}`}>
            {category.category_name}
          </FooterLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * Footer Services Skeleton for loading state
 */
function FooterServicesSkeleton() {
  return (
    <ul className="space-y-2 text-sm">
      {[...Array(5)].map((_, i) => (
        <li key={i}>
          <div className="h-5 w-28 bg-muted/50 animate-pulse rounded-md" />
        </li>
      ))}
    </ul>
  );
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, className }) => (
  <Link 
    href={href} 
    className={`text-muted-foreground transition-colors hover:text-primary ${className || ''}`}
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
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, children, href }) => {
  const item = (
    <div className="flex items-start gap-2">
      {React.createElement(icon, { 
        className: "mt-0.5 h-4 w-4 text-muted-foreground", 
        "aria-hidden": "true" 
      })}
      <span className="text-muted-foreground">{children}</span>
    </div>
  );

  if (href) {
    return (
      <li className="mb-3">
        <Link href={href} className="hover:text-primary transition-colors">
          {item}
        </Link>
      </li>
    );
  }

  return <li className="mb-3">{item}</li>;
};

/**
 * Social media icon component
 */
interface SocialIconProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href, label }) => (
  <Link 
    href={href} 
    aria-label={label}
    className="bg-muted/50 p-2 rounded-full hover:bg-primary/10 transition-colors flex items-center justify-center"
  >
    {React.createElement(icon, { 
      className: "h-5 w-5 text-muted-foreground hover:text-primary", 
      "aria-hidden": "true" 
    })}
  </Link>
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
    <footer className="bg-background border-t">
      <div className="container max-w-7xl mx-auto px-4 py-12 sm:px-6 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <FancyLogo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Bringing innovative technology solutions to businesses across Texas. Let's harness the power of web development, 
              workflow optimization, and AI integration to drive your growth.
            </p>
            
            <div className="flex gap-3 pt-2">
              <SocialIcon 
                icon={Github} 
                href="https://github.com/taltytech" 
                label="Talty Tech on GitHub"
              />
              <SocialIcon 
                icon={Linkedin} 
                href="https://linkedin.com/in/taltytech" 
                label="Talty Tech on LinkedIn"
              />
              <SocialIcon 
                icon={Twitter} 
                href="https://twitter.com/taltytech" 
                label="Talty Tech on Twitter"
              />
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links" id="company-links">
            <ul className="space-y-2 text-sm" aria-labelledby="company-links">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/services">Services</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
              <li>
                <FooterLink href="/about/mission">Our Mission</FooterLink>
              </li>
              <li>
                <FooterLink href="/about/story">Our Story</FooterLink>
              </li>
            </ul>
          </FooterSection>

          {/* Services Links */}
          <FooterSection title="Services" id="services-links">
            <Suspense fallback={<FooterServicesSkeleton />}>
              <FooterServiceCategories />
            </Suspense>
          </FooterSection>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium" id="contact-info">Contact Us</h3>
            <ul className="mt-3" aria-labelledby="contact-info">
              <ContactItem icon={MapPin}>
                Talty, TX 75162
              </ContactItem>
              <ContactItem icon={Phone} href="tel:+14697974677">
                (469) 797-4677
              </ContactItem>
              <ContactItem icon={Mail} href="mailto:andrew@taltytech.com">
                andrew@taltytech.com
              </ContactItem>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="space-y-2 pt-4">
              <h4 className="text-sm font-medium" id="newsletter-signup">Get the latest updates</h4>
              <form className="flex gap-2" aria-labelledby="newsletter-signup">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="max-w-[180px]" 
                  aria-label="Email address for newsletter"
                  required
                />
                <Button variant="default" size="sm" type="submit">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                We'll never share your email. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Talty Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary" asChild>
              <Link href="/legal/privacy-policy">Privacy</Link>
            </Button>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary" asChild>
              <Link href="/legal/terms-of-service">Terms</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Footer);