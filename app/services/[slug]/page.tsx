import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServiceWithDetailsBySlug } from "@/app/actions/services"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Code, ShoppingCart, Layers, Cog, Brain, Activity, BarChart, Search, Lightbulb, Shield, RefreshCw, Settings, type LucideIcon } from "lucide-react"

// Icon mapping
const servicesIconMap: Record<string, LucideIcon> = {
  code: Code,
  "shopping-cart": ShoppingCart,
  layers: Layers,
  cog: Cog,
  brain: Brain,
  robot: Brain, // Fallback to Brain if Robot isn't available
  chart: BarChart,
  search: Search,
  lightbulb: Lightbulb,
  shield: Shield,
  repeat: RefreshCw,
  settings: Settings,
  update: Activity // Using Activity instead of Update
}

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const serviceSlug = params.slug
  
  return (
    <div className="space-y-8">
      <Suspense fallback={<ServiceDetailsSkeleton />}>
        <ServiceDetails slug={serviceSlug} />
      </Suspense>
    </div>
  )
}

async function ServiceDetails({ slug }: { slug: string }) {
  const service = await getServiceWithDetailsBySlug(slug)
  
  if (!service) {
    notFound()
  }
  
  const Icon = servicesIconMap[service.icon] || Layers
  // Get category info from the service_categories if it exists, otherwise use defaults
  const categoryName = service.service_categories?.category_name || "Service"
  const categorySlug = service.service_categories?.category_slug || "services"
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Link href={`/services/category/${categorySlug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {categoryName}
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
        <p className="text-muted-foreground max-w-3xl">
          {service.description}
        </p>
      </div>

      {service.details && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Benefits Section */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
              <CardDescription>Here's what you'll gain from our {service.title} service</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {service.details.benefits.map((benefit, index) => (
                  <li key={index} className="space-y-1">
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Process Section */}
          <Card>
            <CardHeader>
              <CardTitle>Our Process</CardTitle>
              <CardDescription>How we implement {service.title} for your business</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {service.details.process.map((step, index) => (
                  <li key={index} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center bg-primary/10 text-primary w-6 h-6 rounded-full text-sm font-medium">
                        {index + 1}
                      </span>
                      <h3 className="font-medium">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground ml-8">{step.description}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contact CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Ready to explore {service.title}?</CardTitle>
          <CardDescription>Get in touch with our team to discuss your specific requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>Request a Consultation</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Related Services */}
      {service.related_services_data.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.related_services_data.map((relatedService) => (
              <ServiceCard key={relatedService.id} service={relatedService} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ServiceDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-8 w-64 bg-muted animate-pulse rounded-md" />
        <div className="h-6 w-full max-w-3xl bg-muted animate-pulse rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>

      <div className="h-40 bg-muted animate-pulse rounded-lg" />

      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
