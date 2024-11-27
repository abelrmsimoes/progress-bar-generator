import { FireIcon } from '@heroicons/react/20/solid'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <FireIcon className="h-8 w-8 text-red-500" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              Progress Bar Generator
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}