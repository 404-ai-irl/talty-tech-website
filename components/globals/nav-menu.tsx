import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { use, Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getServiceCategories } from "@/app/actions/serviceCategories"

// Component to display service categories in the dropdown menu
function ServiceCategoriesMenu() {
  const categoriesPromise = getServiceCategories();
  const categories = use(categoriesPromise);
  
  return (
    <>
      {/* All Services link at the top */}
      <ul className="space-y-3">
        <li>
          <Link href="/services" className="text-sm transition-colors hover:text-primary font-medium">
            All Services
          </Link>
        </li>
        {/* Categories list */}
        {categories.map((category) => (
          <li key={category.id}>
            <Link 
              href={`/services/category/${category.category_slug}`} 
              className="text-sm transition-colors hover:text-primary"
            >
              {category.category_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// Component to display service categories in the mobile accordion
function ServiceCategoriesMobileMenu() {
  const categoriesPromise = getServiceCategories();
  const categories = use(categoriesPromise);
  
  return (
    <ul className="space-y-3">
      <li>
        <Link href="/services" className="text-sm hover:text-primary font-medium">
          All Services
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link 
            href={`/services/category/${category.category_slug}`} 
            className="text-sm hover:text-primary"
          >
            {category.category_name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Skeleton loading state for service categories
function ServiceCategoriesSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-5 w-40 bg-muted/50 animate-pulse rounded-md" />
      ))}
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            YourBrand
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* About with dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              About <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[500px] p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Learn more about the talty tech difference</h3>
                  <p className="text-muted-foreground text-sm">
                    Discover how our innovative approach and dedication to excellence sets us apart from the
                    competition.
                  </p>
                  <Button variant="link" size="sm" className="px-0 mt-2">
                    <Link href="/about/our-difference">Read our story →</Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">EXPLORE</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/about/team" className="text-sm transition-colors hover:text-primary">
                        Our Team
                      </Link>
                    </li>
                    <li>
                      <Link href="/about/mission" className="text-sm transition-colors hover:text-primary">
                        Mission & Values
                      </Link>
                    </li>
                    <li>
                      <Link href="/about/careers" className="text-sm transition-colors hover:text-primary">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Services with dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              Services <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[320px] p-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">OUR SERVICES</h3>
                <Suspense fallback={<ServiceCategoriesSkeleton />}>
                  <ServiceCategoriesMenu />
                </Suspense>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {/* Mobile About with accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="about" className="border-none">
                  <AccordionTrigger className="py-2 text-base font-medium hover:text-primary">About</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-3 mb-2 pl-4">
                      <h3 className="font-medium mb-2">The talty tech difference</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Discover our innovative approach and dedication.
                      </p>
                      <Button variant="link" size="sm" className="px-0 mb-3">
                        <Link href="/about/our-difference">Read our story →</Link>
                      </Button>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">EXPLORE</h4>
                        <ul className="space-y-3">
                          <li>
                            <Link href="/about/team" className="text-sm hover:text-primary">
                              Our Team
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/mission" className="text-sm hover:text-primary">
                              Mission & Values
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/careers" className="text-sm hover:text-primary">
                              Careers
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
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">OUR SERVICES</h3>
                      <Suspense fallback={<ServiceCategoriesSkeleton />}>
                        <ServiceCategoriesMobileMenu />
                      </Suspense>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link href="/contact" className="py-2 text-base font-medium transition-colors hover:text-primary">
                Contact
              </Link>
              <Button className="mt-2" size="sm">
                Get Started
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

