import ProgressBarGenerator from '@/components/ProgressBarGenerator'

export default function Page() {
  return (
    <main className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-xl mx-auto">
        <ProgressBarGenerator />
      </div>
    </main>
  )
}
