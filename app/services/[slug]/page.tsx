import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { db, getServiceBySlug, getServiceWithDetails, getServicesByCategory, Service } from '@/lib/db'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { CheckCircle, ChevronRight, ArrowRight } from 'lucide-react'

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  // Properly await the params object to fix Next.js 15 warning
  const { slug } = await params;
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    }
  }
  
  return {
    title: `${service.title} - Talty Tech`,
    description: service.description
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  // Properly await the params object to fix Next.js 15 warning
  const { slug } = await params;
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }
  
  // Get service details if available
  const serviceDetails = service.id ? await getServiceWithDetails(service.id) : null
  
  // Get service category
  const { data: category } = await db
    .from('service_categories')
    .select('*')
    .eq('id', service.category_id)
    .single()
  
  // Get related services (from same category)
  let relatedServices: Service[] = []
  
  if (service.category_id) {
    // If service details has related_services, use those
    if (serviceDetails?.related_services && serviceDetails.related_services.length > 0) {
      const { data } = await db
        .from('services')
        .select('*')
        .in('id', serviceDetails.related_services)
        .neq('id', service.id)
        .limit(3)
      
      if (data && data.length > 0) {
        relatedServices = data
      }
    }
    
    // If no related services were found, get from same category
    if (relatedServices.length === 0) {
      relatedServices = await getServicesByCategory(service.category_id, 3)
    }
  }
  
  // Parse benefits and process steps if available
  const benefits = serviceDetails?.benefits ? 
    (typeof serviceDetails.benefits === 'string' ? 
      JSON.parse(serviceDetails.benefits as string) : 
      serviceDetails.benefits) : 
    []
  
  const processSteps = serviceDetails?.process ? 
    (typeof serviceDetails.process === 'string' ? 
      JSON.parse(serviceDetails.process as string) : 
      serviceDetails.process) : 
    []
  
  return (
    <Container className="py-12">
      <div className="space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/services" className="hover:text-foreground">Services</Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link 
                href={`/services/category/${category.category_slug}`}
                className="hover:text-foreground"
              >
                {category.category_name}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{service.title}</span>
        </div>
        
        {/* Service header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <p className="text-xl text-muted-foreground">{service.description}</p>
        </div>
        
        {/* Benefits section */}
        {benefits && benefits.length > 0 && (
          <div className="space-y-6 py-8 border-t">
            <h2 className="text-2xl font-bold">Benefits</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit: { title: string, description: string }, index: number) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Process section */}
        {processSteps && processSteps.length > 0 && (
          <div className="space-y-6 py-8 border-t">
            <h2 className="text-2xl font-bold">Our Process</h2>
            <div className="space-y-8">
              {processSteps.map((step: { title: string, description: string }, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 h-10 w-10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA section */}
        <div className="py-8 border-t border-b space-y-6 text-center">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contact us today to discuss your project requirements and how we can help you achieve your goals.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
        
        {/* Related services */}
        {relatedServices.length > 0 && (
          <div className="space-y-6 py-8">
            <h2 className="text-2xl font-bold">Related Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((relatedService) => (
                <Link 
                  key={relatedService.id} 
                  href={`/services/${relatedService["url-slug"]}`}
                  className="p-6 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors space-y-2"
                >
                  <h3 className="text-xl font-medium">{relatedService.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{relatedService.description}</p>
                  <div className="flex items-center gap-1 text-primary font-medium text-sm">
                    Learn more 
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
