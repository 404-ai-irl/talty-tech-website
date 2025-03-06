"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { serviceCategories } from "@/app/services/data";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HeaderNav() {
  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {/* About Section */}
          <NavigationMenuItem>
            <Link href="/about" className="block P-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              About
            </Link>
          </NavigationMenuItem>

          {/* Services Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 P-4 w-[200px]">
                {serviceCategories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={category.href}
                      className="block P-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Contact Section */}
          <NavigationMenuItem>
            <Link href="/contact" className="block P-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <ThemeToggle />
    </div>
  );
}
