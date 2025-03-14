import Link from "next/link"
import React, { memo } from "react"
import { Menu, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import FancyLogo from "@/components/globals/fancy-logo"
import { ThemeToggle } from "@/components/theme-toggle"

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

/**
 * Header component with responsive navigation for desktop and mobile
 */
const Header: React.FC = () => {
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
            <DropdownMenuContent align="start" className="w-[500px] p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 
                    className="text-sm font-medium text-muted-foreground"
                    id="services-navigation-categories"
                  >
                    SERVICE CATEGORIES
                  </h3>
                  <ul 
                    className="space-y-3"
                    aria-labelledby="services-navigation-categories"
                  >
                    <li>
                      <Link href="/services" className="text-sm transition-colors hover:text-primary">
                        All Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/category/web-development" className="text-sm transition-colors hover:text-primary">
                        Web Development
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/category/ai-integration" className="text-sm transition-colors hover:text-primary">
                        AI Integration
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/category/workflow-optimization" className="text-sm transition-colors hover:text-primary">
                        Workflow Optimization
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 
                    className="text-sm font-medium text-muted-foreground"
                    id="services-navigation-specific"
                  >
                    FEATURED SERVICES
                  </h3>
                  <ul 
                    className="space-y-3"
                    aria-labelledby="services-navigation-specific"
                  >
                    <li>
                      <Link href="/services/ai-assistants" className="text-sm transition-colors hover:text-primary">
                        AI Assistants
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/web-development" className="text-sm transition-colors hover:text-primary">
                        Website Development
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/process-automation" className="text-sm transition-colors hover:text-primary">
                        Process Automation
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/custom-software" className="text-sm transition-colors hover:text-primary">
                        Custom Software
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
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
          <SheetContent side="right" className="overflow-y-auto">
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
                    <div className="mt-3 mb-2 pl-4">
                      <h3 
                        className="text-sm font-medium text-muted-foreground mb-3"
                        id="mobile-services-categories"
                      >SERVICE CATEGORIES</h3>
                      <ul className="space-y-3 mb-4" aria-labelledby="mobile-services-categories">
                        <li>
                          <Link href="/services" className="text-sm hover:text-primary">
                            All Services
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/category/web-development" className="text-sm hover:text-primary">
                            Web Development
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/category/ai-integration" className="text-sm hover:text-primary">
                            AI Integration
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/category/workflow-optimization" className="text-sm hover:text-primary">
                            Workflow Optimization
                          </Link>
                        </li>
                      </ul>
                      
                      <h3 
                        className="text-sm font-medium text-muted-foreground mb-3"
                        id="mobile-services-specific"
                      >FEATURED SERVICES</h3>
                      <ul className="space-y-3" aria-labelledby="mobile-services-specific">
                        <li>
                          <Link href="/services/ai-assistants" className="text-sm hover:text-primary">
                            AI Assistants
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/web-development" className="text-sm hover:text-primary">
                            Website Development
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/process-automation" className="text-sm hover:text-primary">
                            Process Automation
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/custom-software" className="text-sm hover:text-primary">
                            Custom Software
                          </Link>
                        </li>
                      </ul>
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