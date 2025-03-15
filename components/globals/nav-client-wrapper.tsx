"use client";

import Link from "next/link";
import { Brain, LaptopIcon, Settings, Zap } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReactNode, Suspense } from "react";
import ServicesFallback from "../services-fallback";
import { ErrorBoundary } from "../error-boundary";

// Define service icons mapping for client component
export const categoryIcons: Record<string, React.ReactNode> = {
  "custom_ai": <Brain className="h-4 w-4 text-primary" />,
  "website_development": <LaptopIcon className="h-4 w-4 text-primary" />,
  "automation": <Settings className="h-4 w-4 text-primary" />,
  "default": <Zap className="h-4 w-4 text-primary" />
};

type NavClientWrapperProps = {
  servicesContent: ReactNode;
}

export default function NavClientWrapper({ servicesContent }: NavClientWrapperProps) {
  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {/* About Section */}
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Services Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[650px] p-6 lg:w-[750px]">
                <ErrorBoundary fallback={<ServicesFallback />}>
                  <Suspense fallback={<ServiceCategoriesSkeleton />}>
                    {servicesContent}
                  </Suspense>
                </ErrorBoundary>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Contact Section */}
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <ThemeToggle />
    </div>
  );
}

export function ServiceCategoriesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-24 bg-muted animate-pulse rounded-md" />
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-muted/70 animate-pulse" />
              <div className="h-5 w-32 bg-muted/70 animate-pulse rounded-md" />
            </div>
            <div className="space-y-2 border-l pl-6">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-4 w-full bg-muted/50 animate-pulse rounded-md" style={{ width: `${70 + Math.random() * 20}%` }}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
