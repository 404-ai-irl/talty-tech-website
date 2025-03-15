import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { db } from '@/lib/db'
import { Container } from '@/components/ui/container'
import { Brain, LaptopIcon, Settings, Zap, ChevronRight } from 'lucide-react'

// Define service icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "custom_ai": <Brain className="h-6 w-6 text-primary" />,
  "website_development": <LaptopIcon className="h-6 w-6 text-primary" />,
  "automation": <Settings className="h-6 w-6 text-primary" />,
  "default": <Zap className="h-6 w-6 text-primary" />
};

type CategoryPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // Properly await the params object to fix Next.js 15 warning
  const { slug } = await params;
  const { data: category } = await db
    .from('service_categories')
    .select('*')
    .eq('category_slug', slug)
    .single()
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested service category could not be found.'
    }
  }
  
  return {
    title: `${category.category_name} Services - Talty Tech`,
    description: `Explore our ${category.category_name.toLowerCase()} services and solutions`
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Properly await the params object to fix Next.js 15 warning
  const { slug } = await params;
  
  // Get category
  const { data: category, error: categoryError } = await db
    .from('service_categories')
    .select('*')
    .eq('category_slug', slug)
    .single()
  
  if (categoryError || !category) {
    notFound()
  }
  
  // Get services in this category
  const { data: services } = await db
    .from('services')
    .select('*')
    .eq('category_id', category.id)
    .order('title')
  
  const hasServices = services && services.length > 0
  
  return (
    <Container className="py-12">
      <div className="space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/services" className="hover:text-foreground">Services</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{category.category_name}</span>
        </div>
        
        {/* Category header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {categoryIcons[category.category_slug] || categoryIcons.default}
            </div>
            <h1 className="text-3xl font-bold">{category.category_name} Services</h1>
          </div>
          
          <p className="text-muted-foreground text-lg">
            Explore our range of {category.category_name.toLowerCase()} services and solutions designed to help your business thrive.
          </p>
        </div>
        
        {/* Services grid */}
        {hasServices ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-6">
            {services.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service["url-slug"]}`} 
                className="p-6 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors space-y-3"
              >
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <p className="text-primary font-medium text-sm">Learn more →</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground">No services found in this category</div>
          </div>
        )}
        
        {/* Return to all services */}
        <div className="text-center pt-8 border-t">
          <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
            <ChevronRight className="h-4 w-4 rotate-180" />
            View all services
          </Link>
        </div>
      </div>
    </Container>
  )
}
