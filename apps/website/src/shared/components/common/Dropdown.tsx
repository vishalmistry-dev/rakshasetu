import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/form/Button'
import { MoreVertical } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export interface DropdownItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  destructive?: boolean
  disabled?: boolean
  divider?: boolean
}

export interface DropdownProps {
  /** Dropdown items */
  items: DropdownItem[]
  /** Custom trigger */
  trigger?: React.ReactNode
  /** Align dropdown */
  align?: 'left' | 'right'
  /** Custom styling */
  className?: string
}

export function Dropdown({
  items,
  trigger,
  align = 'right',
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick()
      setIsOpen(false)
    }
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      )}

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider ? (
                  <div className="my-1 border-t border-gray-200" />
                ) : (
                  <button
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors',
                      item.disabled
                        ? 'cursor-not-allowed text-gray-400'
                        : item.destructive
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
