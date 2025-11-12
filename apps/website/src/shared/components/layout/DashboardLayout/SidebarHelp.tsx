"use client"

import { Headphones } from "lucide-react"
import Link from "next/link"

interface SidebarHelpProps {
  tenant: "merchant" | "admin" | "user"
  isCollapsed: boolean
}

export function SidebarHelp({ tenant, isCollapsed }: SidebarHelpProps) {
  return (
    <div
      className={`rounded-md bg-gray-50 ${isCollapsed
        ? "flex items-center justify-center h-12 w-full"
        : "p-4"
        }`}
    >
      {isCollapsed ? (
        <Link
          href={`/${tenant}/support`}
          className="flex items-center justify-center h-8 w-8 rounded-md bg-gray-50 hover:bg-white transition"
        >
          <Headphones className="h-6 w-6 text-gray-500" />
        </Link>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white">
              <Headphones className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Help Center
              </h4>
              <p className="text-xs text-gray-500">
                How can we help you?
              </p>
            </div>
          </div>
          <Link
            href={`/${tenant}/support`}
            className="mt-4 block w-full text-center text-xs font-medium bg-orange-600 text-white px-3 py-1.5 rounded-md hover:bg-orange-700 transition"
          >
            Get Support
          </Link>
        </>
      )}
    </div>
  )
}
