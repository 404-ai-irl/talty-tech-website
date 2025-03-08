import Link from "next/link"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function ServiceNotFound() {
  return (
    <div className="container py-12 mx-auto">
      <div className="flex flex-col gap-8 items-center text-center">
        <Alert className="max-w-2xl">
          <AlertTitle className="text-2xl font-bold">Service Details Coming Soon</AlertTitle>
          <AlertDescription className="mt-2 text-lg">
            We&apos;re currently working on detailed service pages to provide you with more information.
            Please check back soon or contact us for immediate assistance.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4 mt-4">
          <Button asChild variant="default">
            <Link href="/services">Back to Services</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}