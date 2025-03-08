"use client"

import Link from "next/link"
import { Code, ShoppingCart, Layers, Cog, Brain, Search, Lightbulb, type LucideIcon } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Service } from "@/app/(frontend)/actions/services"

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

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = servicesIconMap[service.icon] || Layers

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{service.category}</span>
        </div>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/services/${service["url-slug"]}`}>Learn more</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

