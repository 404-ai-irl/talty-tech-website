"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HeaderNav() {
  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {/* About Section */}
          <NavigationMenuItem>
            <Link
              href="/about"
              className="block P-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
            >
              About
            </Link>
          </NavigationMenuItem>

          {/* Services Section */}
          <NavigationMenuItem>
            <Link href="/services">Services</Link>
          </NavigationMenuItem>

          {/* Contact Section */}
          <NavigationMenuItem>
            <Link
              href="/contact"
              className="block P-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
            >
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <ThemeToggle />
    </div>
  );
}
