export const dynamic = 'force-dynamic';

import Link from 'next/link'
import { Metadata } from 'next'
import { getAllServicesByCategory } from '@/lib/db'
import { Brain, LaptopIcon, Settings, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Services - Talty Tech',
  description: 'Browse our technology services including AI development, website creation, and automation solutions.',
}

// Define service icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "custom_ai": <Brain className="h-6 w-6 text-primary" />,
  "website_development": <LaptopIcon className="h-6 w-6 text-primary" />,
  "automation": <Settings className="h-6 w-6 text-primary" />,
  "default": <Zap className="h-6 w-6 text-primary" />
};

export default async function ServicesPage() {
  const categoriesWithServices = await getAllServicesByCategory();
  
  const hasCategories = categoriesWithServices && categoriesWithServices.length > 0;
  
  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            From custom AI solutions to web development and business automation, 
            we offer a range of technology services to help your business grow.
          </p>
        </div>
        
        {hasCategories ? (
          categoriesWithServices.map((category) => (
            <div key={category.category.id} className="space-y-6 py-6 border-t first:border-t-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  {categoryIcons[category.category.category_slug] || categoryIcons.default}
                </div>
                <h2 className="text-2xl font-bold">{category.category.category_name}</h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service) => (
                  <Link 
                    key={service.id} 
                    href={`/services/${service["url-slug"]}`} 
                    className="p-6 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors space-y-2"
                  >
                    <h3 className="text-xl font-medium">{service.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{service.description}</p>
                    <p className="text-primary font-medium text-sm">Learn more →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="text-muted-foreground">No services found</div>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        )}
        
        <div className="pt-8 border-t text-center space-y-6">
          <h2 className="text-2xl font-bold">Need a custom solution?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t see exactly what you&apos;re looking for? Our team can build custom solutions
            tailored to your specific business needs.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
