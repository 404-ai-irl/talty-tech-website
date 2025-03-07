import HeaderNav from '@/components/segments/header-nav'
import { P } from '../ui/typography'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <P>

          <Link href="/" className="text-xl font-bold">
            Talty Tech
          </Link>
          </P>
        </div>
        
        <HeaderNav />
        
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-4 py-2 "
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}