"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ServiceCategoryEnum } from "@/lib/types"
import { Button } from "@/components/ui/button"

export function ServiceCategoryFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") as ServiceCategoryEnum | null

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams],
  )

  const handleCategoryChange = (category: ServiceCategoryEnum | null) => {
    const query = createQueryString("category", category)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={!currentCategory ? "default" : "outline"} onClick={() => handleCategoryChange(null)}>
        All Services
      </Button>

      <Button
        variant={currentCategory === ServiceCategoryEnum.DEVELOPMENT ? "default" : "outline"}
        onClick={() => handleCategoryChange(ServiceCategoryEnum.DEVELOPMENT)}
      >
        Development
      </Button>

      <Button
        variant={currentCategory === ServiceCategoryEnum.CONSULTING ? "default" : "outline"}
        onClick={() => handleCategoryChange(ServiceCategoryEnum.CONSULTING)}
      >
        Consulting
      </Button>
    </div>
  )
}

