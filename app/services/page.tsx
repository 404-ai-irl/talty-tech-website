import { Suspense } from "react"
import { getServices } from "@/app/actions/services"
import { ServiceCard } from "@/components/service-card"
import { ServiceCategoryFilter } from "@/components/service-category-filter"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ServicesPage() {
  return (
    <div className="container py-12 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
          <p className="text-muted-foreground max-w-3xl">
            We offer a range of services to help businesses leverage modern web technologies and digital strategies.
          </p>
        </div>

        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesContent />
        </Suspense>
      </div>
    </div>
  )
}

async function ServicesContent() {
  try {
    const services = await getServices()

    if (services.length === 0) {
      return (
        <Alert>
          <AlertTitle>No services found</AlertTitle>
          <AlertDescription>There are currently no services available. Please check back later.</AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="space-y-8">
        <ServiceCategoryFilter />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
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
    <div className="space-y-8">
      <div className="flex gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-10 w-32 bg-muted animate-pulse rounded-md" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  )
}

