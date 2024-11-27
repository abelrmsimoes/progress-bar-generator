'use client'

import { generateProgressBarSVG } from '@/lib/progressBar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ProgressBarGenerator() {
  const [progress, setProgress] = useState(50)
  const [title, setTitle] = useState('')
  const [suffix, setSuffix] = useState('%')
  const [scale, setScale] = useState(100)
  const [width, setWidth] = useState(180)
  const [color, setColor] = useState('428bca')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState('')
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const generateUrl = useCallback(() => {
    let url = `/${progress}/`
    const params = []

    if (title) params.push(`title=${encodeURIComponent(title)}`)
    if (suffix !== '%') params.push(`suffix=${encodeURIComponent(suffix)}`)
    if (scale !== 100) params.push(`scale=${scale}`)
    if (width !== 180) params.push(`width=${width}`)
    if (color !== '428bca') params.push(`color=${color}`)

    if (params.length > 0) {
      url += `?${params.join('&')}`
    }
    return url
  }, [progress, title, suffix, scale, width, color])

  const handleOpenUrl = () => {
    window.open(generatedUrl, '_blank')
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl)
      toast.success('URL copied to clipboard!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to copy URL to clipboard')
    }
  }

  const previewSvg = generateProgressBarSVG({
    progress,
    title,
    suffix,
    scale,
    width,
    color,
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [colorPickerRef])

  useEffect(() => {
    setGeneratedUrl(`${window.location.origin}${generateUrl()}`)
  }, [progress, title, suffix, scale, width, color, generateUrl])

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 shadow-md">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Form Fields */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </label>
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              min="0"
              max={scale}
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Scale
            </label>
            <input
              type="number"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              min="1"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Suffix
            </label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter suffix"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Width
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              min="10"
            />
          </div>
          {/* Color Picker */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Color
            </label>
            <div className="relative" ref={colorPickerRef}>
              <div className="mt-2 flex items-center space-x-3">
                <input
                  type="text"
                  value={color}
                  onFocus={() => setShowColorPicker(true)}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  placeholder="Hex color without #"
                />
              </div>
              {showColorPicker && (
                <div className="absolute top-12 left-0">
                  <HexColorPicker
                    color={`#${color}`}
                    onChange={(newColor) => setColor(newColor.replace('#', ''))}
                  />
                  <button
                    onClick={() => setShowColorPicker(false)}
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded-md shadow-lg hover:bg-red-600 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Preview
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded p-4 border border-gray-200 dark:border-gray-700 flex justify-center">
          <div dangerouslySetInnerHTML={{ __html: previewSvg }} />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Generated URL
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={generatedUrl}
            readOnly
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={handleCopyUrl}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Copy URL
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleOpenUrl}
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Open in New Tab
        </button>
      </div>

      <ToastContainer
        position="bottom-right"
        theme={
          typeof window !== 'undefined' && localStorage.theme === 'dark'
            ? 'dark'
            : 'light'
        }
      />
    </div>
  )
}
