import { Suspense } from "react"
import { getServiceCategoryBySlug } from "@/app/actions/serviceCategories"
import { getServices } from "@/app/actions/services"
import { ServiceCard } from "@/components/service-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { H1, P } from "@/components/ui/typography"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getServiceCategoryBySlug(params.slug)
  
  if (!category) {
    notFound()
  }
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" className="px-0 mb-4" asChild>
        <Link href="/services">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all services
        </Link>
      </Button>
    
      <div>
        <H1>{category.category_name}</H1>
        <P className="text-muted-foreground">
          Explore our specialized services in {category.category_name.toLowerCase()}.
        </P>
      </div>
      
      <Suspense fallback={<ServicesSkeleton />}>
        <CategoryServices categorySlug={category.category_slug} />
      </Suspense>
    </div>
  )
}

async function CategoryServices({ categorySlug }: { categorySlug: string }) {
  try {
    const services = await getServices(categorySlug)
    
    if (services.length === 0) {
      return (
        <Alert>
          <AlertTitle>No services found</AlertTitle>
          <AlertDescription>There are currently no services available in this category. Please check back later.</AlertDescription>
        </Alert>
      )
    }
    
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
