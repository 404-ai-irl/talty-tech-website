"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ServiceCategory, getServiceCategories } from "@/app/actions/serviceCategories"

export function ServiceCategoryFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")
  const [categories, setCategories] = useState<ServiceCategory[]>([])

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

  const handleCategoryChange = (category: string | null) => {
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
          key={category.category_slug}
          variant={currentCategory === category.category_slug ? "default" : "outline"}
          onClick={() => handleCategoryChange(category.category_slug)}
        >
          {category.category_name}
        </Button>
      ))}
    </div>
  )
}

