"use client";

import Link from "next/link";
import { Brain, Code, LaptopIcon, Settings, Zap } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { getServicesByCategoryWithLimit } from "@/app/actions/services";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Define service icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "custom_ai": <Brain className="h-4 w-4 text-primary" />,
  "website_development": <LaptopIcon className="h-4 w-4 text-primary" />,
  "automation": <Settings className="h-4 w-4 text-primary" />,
  "default": <Zap className="h-4 w-4 text-primary" />
};

export default function HeaderNav() {
  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {/* About Section */}
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Services Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[650px] p-6 lg:w-[750px]">
                <Suspense fallback={<ServiceCategoriesSkeleton />}>
                  <ServiceCategoriesNav />
                </Suspense>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Contact Section */}
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <ThemeToggle />
    </div>
  );
}

async function ServiceCategoriesNav() {
  const categoriesWithServices = await getServicesByCategoryWithLimit(4);

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
        <Button asChild>
          <Link href="/contact">Get Started with Talty Tech</Link>
        </Button>
      </div>
    </div>
  );
}

function ServiceCategoriesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
