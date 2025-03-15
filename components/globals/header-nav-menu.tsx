// This is a server component that fetches data
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import Link from "next/link";
import { Code } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { getAllServicesByCategory } from "@/lib/db";
import NavClientWrapper, { categoryIcons, ServiceCategoriesSkeleton } from "./nav-client-wrapper";

export default function HeaderNav() {
  return (
    <NavClientWrapper
      servicesContent={
        <Suspense fallback={<ServiceCategoriesSkeleton />}>
          <ServiceCategoriesNav />
        </Suspense>
      }
    />
  );
}

async function ServiceCategoriesNav() {
  console.log('ServiceCategoriesNav server component rendering');
  
  try {
    // Log environment variables (without revealing full keys)
    console.log('Checking environment variables:');
    console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log('URL preview:', process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 15) + '...');
    }
    
    // Fetch services directly from the database
    console.log('About to call getAllServicesByCategory');
    const categoriesWithServices = await getAllServicesByCategory(4);
    console.log(`Fetched ${categoriesWithServices?.length || 0} categories with services`);
    
    if (!categoriesWithServices || categoriesWithServices.length === 0) {
      console.log('No categories found');
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
          
          <div className="mt-6 pt-6 border-t">
            <Button asChild>
              <Link href="/contact">Get Started with Talty Tech</Link>
            </Button>
          </div>
        </div>
      );
    }
    
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
          {categoriesWithServices
            .filter(cat => cat.category && cat.services && cat.services.length > 0)
            .map((categoryWithServices) => (
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
  } catch (error) {
    console.error('Error in ServiceCategoriesNav:', error);
    // Return minimal fallback UI in case of error
    return (
      <div>
        <div className="mb-4">
          <Link
            href="/services"
            className="flex select-none flex-col gap-1 rounded-md bg-gradient-to-br from-muted/50 to-muted p-4 hover:bg-muted/80"
          >
            <div className="flex items-center gap-2 font-medium">
              <Code className="h-4 w-4" />
              <span>View All Services</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Browse our complete service offerings
            </p>
          </Link>
        </div>
      </div>
    );
  }
}


