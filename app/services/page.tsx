import { Suspense } from "react"
import { getServices } from "@/app/actions/services"
import { getServiceCategories } from "@/app/actions/serviceCategories"
import { ServiceCard } from "@/components/service-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { H1, H2, P, Lead } from "@/components/ui/typography"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart, Brain, Globe, Laptop, Rocket, Workflow } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Services | Talty Tech",
  description: "Explore our comprehensive range of web development, workflow optimization, and AI integration services.",
}

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 -mt-6 -mx-6 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">Expert Solutions</Badge>
          <H1 className="!border-none mb-4">Innovative Technology Services</H1>
          <Lead className="mb-6">
            Empowering Texas businesses with custom web development, workflow optimization, 
            and AI integrations designed to streamline operations and drive growth.
          </Lead>
          <Button asChild>
            <Link href="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Core Service Areas */}
      <section>
        <H2>Core Service Areas</H2>
        <P className="text-muted-foreground mb-8">
          With 10 years of experience across various industries, I specialize in three primary service areas 
          designed to help your business thrive in the digital landscape.
        </P>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-muted/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Laptop className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Web Development</h3>
              </div>
              <P className="text-muted-foreground">
                Custom websites and applications using modern technologies like React, Next.js, and Tailwind CSS. 
                From business websites to complex web applications and e-commerce solutions.
              </P>
            </CardContent>
          </Card>

          <Card className="bg-muted/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Workflow className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Workflow Optimization</h3>
              </div>
              <P className="text-muted-foreground">
                Analyze existing business processes to identify inefficiencies and implement tools and strategies 
                to enhance productivity and streamline operations.
              </P>
            </CardContent>
          </Card>

          <Card className="bg-muted/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">AI Integration</h3>
              </div>
              <P className="text-muted-foreground">
                Incorporate AI solutions to automate and enhance business processes, analyze data, predict trends, 
                and provide actionable insights to drive informed decisions.
              </P>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* All Services Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <H2>All Services</H2>
            <P className="text-muted-foreground">
              Browse our complete range of services designed to help your business succeed
            </P>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
              Texas-based
            </Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
              Remote-friendly
            </Badge>
          </div>
        </div>

        <Suspense fallback={<ServicesSkeleton />}>
          <AllServices />
        </Suspense>
      </section>

      {/* Why Choose Section */}
      <section className="bg-muted/30 rounded-lg p-8 mt-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-2">Why Choose Talty Tech</Badge>
            <H2 className="!border-none mb-4">Expert Technical Background</H2>
            <P className="mb-2">
              With a decade of experience in software engineering and a strong educational background in Computer Science 
              and Full-Stack Development, I bring technical expertise and business acumen to every project.
            </P>
            <P className="mb-6">
              From building multimillion-dollar Salesforce systems to developing custom CRM platforms, my diverse 
              project experience ensures that I can deliver the right solution for your specific business needs.
            </P>
            <Button variant="outline" asChild>
              <Link href="/about">Learn More About Me</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-md p-6 text-center shadow-sm flex flex-col items-center">
              <Globe className="h-8 w-8 text-primary mb-2" />
              <div className="text-lg font-semibold">Modern Tech Stack</div>
            </div>
            <div className="bg-background rounded-md p-6 text-center shadow-sm flex flex-col items-center">
              <Rocket className="h-8 w-8 text-primary mb-2" />
              <div className="text-lg font-semibold">Rapid Deployment</div>
            </div>
            <div className="bg-background rounded-md p-6 text-center shadow-sm flex flex-col items-center">
              <Brain className="h-8 w-8 text-primary mb-2" />
              <div className="text-lg font-semibold">AI Expertise</div>
            </div>
            <div className="bg-background rounded-md p-6 text-center shadow-sm flex flex-col items-center">
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <div className="text-lg font-semibold">Data-Driven</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

async function AllServices() {
  try {
    const [services, categories] = await Promise.all([
      getServices(),
      getServiceCategories()
    ])

    if (services.length === 0) {
      return (
        <Alert>
          <AlertTitle>No services found</AlertTitle>
          <AlertDescription>There are currently no services available. Please check back later.</AlertDescription>
        </Alert>
      )
    }

    // If there are categories, organize services by category
    if (categories.length > 0) {
      return (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Services</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.category_slug}>
                {category.category_name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.category_slug} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((service) => service.service_categories?.category_slug === category.category_slug)
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )
    }

    // If no categories, just display services in a grid
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching services:", error)
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was an error fetching the services. Please try again later.</AlertDescription>
      </Alert>
    )
  }
}

function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  )
}
