"use client"

import Link from "next/link"
import { Code, ShoppingCart, Layers, Cog, Brain, RefreshCw, BarChart, Search, Lightbulb, Shield, Settings, Activity, type LucideIcon } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Service } from "@/app/actions/services"

// Icon mapping
const servicesIconMap: Record<string, LucideIcon> = {
  code: Code,
  "shopping-cart": ShoppingCart,
  layers: Layers,
  cog: Cog,
  brain: Brain,
  robot: Brain, // Fallback to Brain
  chart: BarChart,
  search: Search,
  lightbulb: Lightbulb,
  shield: Shield,
  repeat: RefreshCw,
  settings: Settings,
  update: Activity // Using Activity instead of Update
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = servicesIconMap[service.icon] || Layers
  
  // Extract category name from the service_categories property if it exists
  const categoryName = service.service_categories?.category_name || service.category || "Service"

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{categoryName}</span>
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
