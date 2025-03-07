import HeaderNav from '@/components/segments/header-nav'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Talty Tech
          </Link>
        </div>
        
        <HeaderNav />
        
        <div className="hidden md:block">
          <Button asChild variant="default">
            <Link href="/contact">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}