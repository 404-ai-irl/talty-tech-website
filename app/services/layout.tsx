interface ServicesLayoutProps {
  children: React.ReactNode
}

export default async function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <div className="container py-12 mx-auto">
      <main>
        {children}
      </main>
    </div>
  )
}
