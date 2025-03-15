"use client";

import Link from "next/link";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesFallback() {
  return (
    <div className="p-4 space-y-6">
      <div className="mb-4">
        <Link
          href="/services"
          className="flex select-none flex-col gap-1 rounded-md bg-gradient-to-br from-muted/50 to-muted p-4 hover:bg-muted/80"
        >
          <div className="flex items-center gap-2 font-medium">
            <Code className="h-4 w-4" />
            <span>View All Services</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Browse our complete service offerings
          </p>
        </Link>
      </div>
      
      <div className="text-center pt-4">
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
