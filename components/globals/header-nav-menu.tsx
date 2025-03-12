"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
import { getServiceCategories } from "@/app/actions/serviceCategories";
import { Suspense } from "react";

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
              <div className="w-[400px] p-4">
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
  const categories = await getServiceCategories();

  return (
    <ul className="grid gap-3">
      <li>
        <Link
          href="/services"
          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="text-sm font-medium">All Services</div>
          <div className="text-sm text-muted-foreground">
            Browse our complete service offerings
          </div>
        </Link>
      </li>
      
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/services/category/${category.category_slug}`}
            className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="text-sm font-medium">{category.category_name}</div>
            <div className="text-sm text-muted-foreground">
              Explore our specialized {category.category_name.toLowerCase()} offerings
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ServiceCategoriesSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-3 space-y-2">
          <div className="h-5 w-40 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
        </div>
      ))}
    </div>
  );
}
