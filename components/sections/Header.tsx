import HeaderNav from '@/components/segments/HeaderNav'
import Link from 'next/link'

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
          <Link
            href="/contact"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}