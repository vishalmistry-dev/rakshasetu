"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface SearchResult {
  title: string
  source: string
  href: string
}

interface TopbarSearchProps {
  searchIndex: SearchResult[]
  placeholder?: string
}

function highlightMatch(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return text
  return (
    <>
      {text.slice(0, index)}
      <span className="text-orange-600 font-semibold">
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </>
  )
}

export function TopbarSearch({ searchIndex, placeholder = "Search..." }: TopbarSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
      setIsTyping(false)
    }, 300)

    setIsTyping(true)
    return () => clearTimeout(timer)
  }, [query])

  // Search results
  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setResults([])
      return
    }

    const filtered = searchIndex.filter(({ title }) =>
      title.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    setResults(filtered)
  }, [debouncedQuery, searchIndex])

  return (
    <div className="relative w-80">
      <div className="flex items-center border rounded-md overflow-hidden bg-white">
        <div className="pl-3 text-gray-400">
          <Search size={18} />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 !border-none focus:!border-none focus:!ring-0 focus:!outline-none focus:!shadow-none !shadow-none text-sm !ring-0
  !outline-none"
        />
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            className="px-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50 max-h-64 overflow-y-auto">
          {isTyping ? (
            <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            results.map(({ title, source, href }, idx) => (
              <Link
                key={idx}
                href={href}
                onClick={() => setQuery("")}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer block"
              >
                <p className="text-sm font-medium text-gray-900">
                  {highlightMatch(title, debouncedQuery)}
                </p>
                <p className="text-xs text-gray-500">from {source}</p>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
