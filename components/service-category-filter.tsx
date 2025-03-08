"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ServiceCategoryEnum } from "@/lib/types/index"
import { Button } from "@/components/ui/button"
import { getServiceCategories } from "@/app/(frontend)/actions/services"

export function ServiceCategoryFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") as ServiceCategoryEnum | null
  const [categories, setCategories] = useState<ServiceCategoryEnum[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await getServiceCategories()
        setCategories(categoriesList)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

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
      <Button
        variant={!currentCategory ? "default" : "outline"}
        onClick={() => handleCategoryChange(null)}
      >
        All Services
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={currentCategory === category ? "default" : "outline"}
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

