"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Avatar } from "@/shared/components/common/Avatar"
import { LogOut, User as UserIcon } from "lucide-react"
import Link from "next/link"

interface AccountDropdownProps {
  user: {
    image?: string | null
    firstName?: string | null
    lastName?: string | null
    businessName?: string | null
  } | null
  tenant: "merchant" | "admin" | "user"
  onLogout: () => void
  showRoleSwitch?: boolean
  currentRole?: string
  onRoleSwitch?: (role: string) => void
  roles?: Array<{ label: string; value: string; icon: React.ComponentType<{ className?: string }> }>
  loading?: boolean
}

export function AccountDropdown({
  user,
  tenant,
  onLogout,
  showRoleSwitch,
  currentRole,
  onRoleSwitch,
  roles = [],
  loading = false,
}: AccountDropdownProps) {

  const getInitials = () => {
    // MERCHANT → use businessName
    if (tenant === "merchant") {
      const name = user?.businessName?.trim() || ""

      if (!name) return "U"

      const parts = name.split(" ").filter(Boolean)

      // If only one word → use first letter twice (like Instagram)
      if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase()
      }

      // Otherwise → first + last
      const first = parts[0][0] || ""
      const last = parts[parts.length - 1][0] || ""

      const initials = `${first}${last}`.toUpperCase()
      return initials || "U"
    }

    // ADMIN / OTHER TENANTS → firstName + lastName
    const first = user?.firstName?.[0] || ""
    const last = user?.lastName?.[0] || ""

    const initials = `${first}${last}`.toUpperCase()
    return initials || "U"
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Avatar
            src={user?.image || undefined}
            fallback={getInitials()}
            size="sm"
            className="hover:ring-2 hover:ring-gray-200 rounded-full transition-all"
            shape="circle"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-1 bg-white">
        {/* Role Switcher */}
        {showRoleSwitch && roles.length > 0 && (
          <div className="px-3 py-2 border-b">
            <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-2">
              Switch Role
            </p>
            <div className="flex gap-1">
              {roles.map(({ label, value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => onRoleSwitch?.(value)}
                  disabled={loading}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex-1",
                    currentRole === value
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    loading && "opacity-50 pointer-events-none"
                  )}
                >
                  {loading && currentRole !== value ? (
                    <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Icon className="h-3 w-3" />
                  )}
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Account Section */}
        <div className="p-1">
          <Link href={`/${tenant}/profile`}>
            <DropdownMenuItem className="cursor-pointer hover:!bg-gray-100 text-secondary hover:!text-primary">
              <UserIcon className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
          </Link>

          <button onClick={onLogout} className="w-full">
            <DropdownMenuItem className="cursor-pointer text-red-600 hover:!bg-red-50 hover:!text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
2
