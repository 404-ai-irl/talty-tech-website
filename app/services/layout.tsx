import { Suspense } from "react"
import { getServiceCategories } from "@/app/actions/serviceCategories"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ServicesLayoutProps {
  children: React.ReactNode
}

export default async function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <div className="container py-12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-24 space-y-4">
            <h2 className="text-xl font-semibold">Service Categories</h2>
            <Suspense fallback={<NavSkeleton />}>
              <ServiceNav />
            </Suspense>
          </div>
        </aside>
        <main className="md:col-span-3">
          {children}
        </main>
      </div>
    </div>
  )
}

async function ServiceNav() {
  const categories = await getServiceCategories()

  return (
    <div className="flex flex-col gap-2">
      <Button variant="ghost" asChild className="justify-start">
        <Link href="/services">All Services</Link>
      </Button>
      
      {categories.map((category) => (
        <Button key={category.id} variant="ghost" asChild className="justify-start">
          <Link href={`/services/category/${category.category_slug}`}>
            {category.category_name}
          </Link>
        </Button>
      ))}
    </div>
  )
}

function NavSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 bg-muted animate-pulse rounded-md" />
      ))}
    </div>
  )
}
