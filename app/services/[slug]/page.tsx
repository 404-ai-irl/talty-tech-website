import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/app/actions/services"
import { Code, ShoppingCart, Layers, Cog, Brain, Search, Lightbulb, type LucideIcon } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import React from "react"

// Icon mapping
const servicesIconMap: Record<string, LucideIcon> = {
  Code,
  ShoppingCart,
  Layers,
  Cog,
  Brain,
  Search,
  Lightbulb,
}

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found - Talty Tech'
    }
  }
  
  return {
    title: `${service.title} - Talty Tech Services`,
    description: service.description
  }
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }
  
  return (
    <div className="container max-w-4xl py-12">
      <Card className="overflow-hidden">
        <CardHeader className="pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-md bg-primary/10">
              {React.createElement(servicesIconMap[service.icon] || Layers, {
                className: "h-6 w-6 text-primary"
              })}
            </div>
            <span className="text-sm font-medium text-muted-foreground">{service.category}</span>
          </div>
          <CardTitle className="text-3xl mb-4">{service.title}</CardTitle>
          <CardDescription className="text-lg">{service.description}</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <Button asChild variant="default" className="mt-4">
            <Link href="/contact">Request this service</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}