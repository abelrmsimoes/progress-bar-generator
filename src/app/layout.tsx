import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata = {
  title: 'Progress Bar Generator',
  description: 'Create custom progress bar SVGs easily',
  authors: [{ name: 'Community Project' }],
  keywords: ['progress bar', 'svg generator', 'progress visualization'],
  openGraph: {
    title: 'Progress Bar Generator',
    description: 'Create custom progress bar SVGs easily',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">
            {children}
            <Analytics />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
