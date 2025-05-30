"use client";

import Link from "next/link";
import React, { memo, useState, useEffect } from "react";
import { Menu, ChevronDown, Brain, Settings, LaptopIcon, Zap, Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FancyLogo from "@/components/globals/fancy-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Database } from "@/lib/types/db.types";
import { getSupabase } from "@/lib/db";

// Define types for database objects
type ServiceCategory = Database["public"]["Tables"]["service_categories"]["Row"];
type Service = Database["public"]["Tables"]["services"]["Row"];

// Define service icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "custom_ai": <Brain className="h-4 w-4 text-primary" />,
  "website_development": <LaptopIcon className="h-4 w-4 text-primary" />,
  "automation": <Settings className="h-4 w-4 text-primary" />,
  "default": <Zap className="h-4 w-4 text-primary" />
};

/**
 * Navigation link with optional dropdown for desktop view
 */
interface NavItemProps {
  text: string;
  href?: string;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ text, href, children }) => {
  if (children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger 
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
          aria-label={`${text} menu`}
        >
          {text} <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        {children}
      </DropdownMenu>
    );
  }
  
  return (
    <Link href={href || "/"} className="text-sm font-medium transition-colors hover:text-primary">
      {text}
    </Link>
  );
};

// Client component for services menu
const ServiceMenuContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesWithServices, setCategoriesWithServices] = useState<{
    category: ServiceCategory;
    services: Service[];
  }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Use the shared Supabase client
        const supabase = getSupabase();
        
        // Fetch categories
        const { data: categories, error: categoriesError } = await supabase
          .from("service_categories")
          .select("*")
          .order("category_name");
          
        if (categoriesError) {
          throw new Error(`Error fetching categories: ${categoriesError.message}`);
        }
        
        if (!categories || categories.length === 0) {
          setCategoriesWithServices([]);
          setIsLoading(false);
          return;
        }
        
        // Fetch services for each category
        const result = await Promise.all(
          categories.map(async (category) => {
            const { data: services, error: servicesError } = await supabase
              .from("services")
              .select("*")
              .eq("category_id", category.id)
              .order("title")
              .limit(4);
              
            if (servicesError) {
              console.error(`Error fetching services for category ${category.category_name}:`, servicesError);
              return { category, services: [] };
            }
            
            return {
              category,
              services: services || []
            };
          })
        );
        
        setCategoriesWithServices(result);
      } catch (err: unknown) {
        console.error("Error fetching services:", err);
        setError(err instanceof Error ? err.message : "Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return <ServiceMenuSkeleton />;
  }
  
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">There was an error loading services.</p>
        <Link
          href="/services"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all services →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <Link
          href="/services"
          className="flex select-none flex-col gap-1 rounded-md bg-gradient-to-br from-muted/50 to-muted p-4 hover:bg-muted/80"
        >
          <div className="flex items-center gap-2 font-medium">
            <Code className="h-4 w-4" />
            <span>All Services</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Browse our complete service offerings
          </p>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categoriesWithServices.map((categoryWithServices) => (
          <div key={categoryWithServices.category.id} className="space-y-3">
            <Link 
              href={`/services/category/${categoryWithServices.category.category_slug}`} 
              className="group flex items-center gap-2 font-medium text-sm hover:text-primary"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                {categoryIcons[categoryWithServices.category.category_slug] || categoryIcons.default}
              </div>
              <span className="group-hover:underline">{categoryWithServices.category.category_name}</span>
            </Link>
            
            <ul className="space-y-2 border-l pl-6">
              {categoryWithServices.services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service["url-slug"]}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              
              {categoryWithServices.services.length > 0 && (
                <li>
                  <Link
                    href={`/services/category/${categoryWithServices.category.category_slug}`}
                    className="block text-xs font-medium text-primary hover:underline"
                  >
                    View all →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <Button asChild className="w-full md:w-auto">
          <Link href="/contact">Get Started with Talty Tech</Link>
        </Button>
      </div>
    </div>
  );
}

function ServiceMenuSkeleton() {
  return (
    <div className="space-y-6 w-full">
      <div className="mb-4">
        <div className="h-24 bg-muted animate-pulse rounded-md" />
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-muted/70 animate-pulse" />
              <div className="h-5 w-32 bg-muted/70 animate-pulse rounded-md" />
            </div>
            <div className="space-y-2 border-l pl-6">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-4 w-full bg-muted/50 animate-pulse rounded-md" style={{ width: `${70 + Math.random() * 20}%` }}/>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t">
        <div className="h-10 w-full bg-primary/60 animate-pulse rounded-md" />
      </div>
    </div>
  );
}

/**
 * Header component with responsive navigation for desktop and mobile
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <FancyLogo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <NavItem text="About">
            <DropdownMenuContent align="start" className="w-[500px] p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Learn more about Talty Tech
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Discover how our innovative approach and dedication to excellence sets us apart from the
                    competition.
                  </p>
                  <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                    <Link href="/about">
                      Read our story <span aria-hidden="true">→</span>
                    </Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground" id="about-navigation">EXPLORE</h3>
                  <ul className="space-y-3" aria-labelledby="about-navigation">
                    <li>
                      <Link href="/about" className="text-sm transition-colors hover:text-primary">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/about/mission" className="text-sm transition-colors hover:text-primary">
                        Mission & Values
                      </Link>
                    </li>
                    <li>
                      <Link href="/about/story" className="text-sm transition-colors hover:text-primary">
                        Our Story
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </DropdownMenuContent>
          </NavItem>

          <NavItem text="Services">
            <DropdownMenuContent align="start" className="w-[650px] p-6 lg:w-[750px]">
              <ServiceMenuContent />
            </DropdownMenuContent>
          </NavItem>

          <Button variant="default" size="sm" className="px-5 py-2 font-medium" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
          <ThemeToggle />
        </nav> 

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open mobile menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto w-full max-w-md">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8">
              {/* Mobile About with accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="about" className="border-none">
                  <AccordionTrigger className="py-2 text-base font-medium hover:text-primary">About</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-3 mb-2 pl-4">
                      <h3 className="font-medium mb-2">The Talty Tech difference</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Discover our innovative approach and dedication.
                      </p>
                      <Button variant="link" size="sm" className="px-0 mb-3" asChild>
                        <Link href="/about">
                          Read our story <span aria-hidden="true">→</span>
                        </Link>
                      </Button>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground" id="mobile-about-nav">EXPLORE</h4>
                        <ul className="space-y-3" aria-labelledby="mobile-about-nav">
                          <li>
                            <Link href="/about" className="text-sm hover:text-primary">
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/mission" className="text-sm hover:text-primary">
                              Mission & Values
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/story" className="text-sm hover:text-primary">
                              Our Story
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Mobile Services with accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="services" className="border-none">
                  <AccordionTrigger className="py-2 text-base font-medium hover:text-primary">
                    Services
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-3 mb-2">
                      {/* Use the same dynamic content as desktop */}
                      <ServiceMenuContent />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button variant="default" className="mt-2" size="sm" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <div className="mt-4 flex items-center">
                <span className="text-sm mr-2">Toggle theme:</span>
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Header);
