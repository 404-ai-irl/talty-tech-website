import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { getServiceWithDetailsBySlug } from "@/app/actions/services"
import { ServiceCard } from "@/components/service-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H1, H2, H3, P, Large, Lead } from "@/components/ui/typography"

// Get service category icons based on the service detail
function getCategoryIcon(iconName: string): string {
  const iconMap: Record<string, string> = {
    "code": "💻",
    "web-development": "🌐",
    "ai": "🤖",
    "workflow": "⚙️",
    "ecommerce": "🛒",
    "analytics": "📊",
    "automation": "🔄",
    "database": "🗄️",
    "security": "🔒",
    "cloud": "☁️",
    "mobile": "📱",
    "design": "🎨",
  }
  
  return iconMap[iconName] || "✨"
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const service = await getServiceWithDetailsBySlug(params.slug)

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    }
  }

  return {
    title: `${service.title} | Talty Tech Services`,
    description: service.description,
  }
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string }
}) {
  const service = await getServiceWithDetailsBySlug(params.slug)
  if (!service) {
    notFound()
  }

  const categoryName = service.service_categories?.category_name || "Service"

  return (
    <div className="space-y-10">
      {/* Back Link */}
      <div>
        <Button variant="ghost" className="px-0" asChild>
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to services
          </Link>
        </Button>
      </div>

      {/* Service Header */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <Badge variant="outline" className="mb-2">
              {categoryName}
            </Badge>
            <H1 className="!border-none">{service.title}</H1>
            <Lead className="text-muted-foreground">
              {service.description}
            </Lead>
            
            <div className="flex gap-3 pt-4">
              <Button asChild>
                <Link href="/contact">Request Quote</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Discuss Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Service Image/Icon Card */}
        <div>
          <Card className="bg-muted/20 border-border/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-8 rounded-full mb-6">
                  <div className="text-6xl">
                    {getCategoryIcon(service.icon)}
                  </div>
                </div>
                <H3 className="mb-3">{service.title}</H3>
                <P className="text-sm text-muted-foreground">
                  Experienced {service.title} services for Texas businesses with
                  10+ years of professional expertise.
                </P>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Service Details */}
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          {/* Service Content */}
          <div>
            <H2>Overview</H2>
            <P>
              {service.description || `At Talty Tech, I offer comprehensive {service.title} services designed to meet the unique needs of your business. With a decade of experience in software engineering and development, I bring a wealth of knowledge and expertise to every project.`}
            </P>
            <P>
              Whether you're looking to enhance your online presence, optimize your business workflows, or integrate advanced AI solutions, my ${service.title} services are tailored to help you achieve your goals and drive growth for your business.
            </P>
          </div>

          {/* Process Steps - if available */}
          {service.details?.process && service.details.process.length > 0 && (
            <div>
              <H2>Our Process</H2>
              <P className="mb-6">
                Here's how we'll work together to deliver exceptional {service.title} solutions for your business:
              </P>
              
              <div className="space-y-6">
                {service.details.process
                  .sort((a, b) => a.order - b.order)
                  .map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <H3 className="text-xl">{step.title}</H3>
                        <P className="text-muted-foreground">
                          {step.description}
                        </P>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Benefits Sidebar */}
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Key Benefits</CardTitle>
              <CardDescription>
                Why choose our {service.title} service
              </CardDescription>
            </CardHeader>
            <CardContent>
              {service.details?.benefits && service.details.benefits.length > 0 ? (
                <ul className="space-y-4">
                  {service.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                      <div>
                        <Large className="font-medium">{benefit.title}</Large>
                        <P className="text-sm text-muted-foreground mt-1">
                          {benefit.description}
                        </P>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <div>
                      <Large className="font-medium">Expert Knowledge</Large>
                      <P className="text-sm text-muted-foreground mt-1">
                        Over 10 years of experience in software engineering and development
                      </P>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <div>
                      <Large className="font-medium">Tailored Solutions</Large>
                      <P className="text-sm text-muted-foreground mt-1">
                        Custom-built solutions designed specifically for your business needs
                      </P>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <div>
                      <Large className="font-medium">Modern Technology</Large>
                      <P className="text-sm text-muted-foreground mt-1">
                        Utilizing the latest technologies and best practices
                      </P>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <div>
                      <Large className="font-medium">Ongoing Support</Large>
                      <P className="text-sm text-muted-foreground mt-1">
                        Comprehensive support and maintenance after project completion
                      </P>
                    </div>
                  </li>
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/30 rounded-lg p-8 my-12">
        <div className="text-center max-w-2xl mx-auto">
          <H2 className="!border-none">Ready to Get Started?</H2>
          <P className="mb-6">
            Contact me today to discuss your {service.title} needs and how I can help take your business to the next level.
          </P>
          <Button size="lg" asChild>
            <Link href="/contact">Request a Free Consultation</Link>
          </Button>
        </div>
      </div>

      {/* Related Services */}
      {service.related_services_data && service.related_services_data.length > 0 && (
        <div>
          <H2>Related Services</H2>
          <P className="text-muted-foreground mb-6">
            Explore other services that may complement your {service.title} project
          </P>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.related_services_data.slice(0, 3).map((relatedService) => (
              <ServiceCard key={relatedService.id} service={relatedService} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
