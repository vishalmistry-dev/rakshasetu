import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface SettingsSection {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface SettingsLayoutProps {
  title: string
  description?: string
  sections: SettingsSection[]
  children: React.ReactNode
  actions?: React.ReactNode
}

export function SettingsLayout({
  title,
  description,
  sections,
  children,
  actions,
}: SettingsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const isActive = pathname === section.href
              const Icon = section.icon

              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {section.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  )
}
