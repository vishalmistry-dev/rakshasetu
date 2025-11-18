"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Logo } from "@/shared/components/common/Logo"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export interface SidebarLink {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  group?: string
  children?: SidebarLink[]
  defaultOpen?: boolean
}

interface SidebarProps {
  links: SidebarLink[]
  globalLinks: SidebarLink[]
  tenant: "merchant" | "admin" | "user"
}

export function Sidebar({ links, globalLinks, tenant }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  // Build full current URL with query params
  const currentFullUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname

  // Better active link detection
  const isLinkActive = (url: string, checkChildren = false): boolean => {
    // Split both URLs into path and query parts
    const [currentPath, currentQuery] = currentFullUrl.split('?')
    const [linkPath, linkQuery] = url.split('?')

    // If paths don't match, not active
    if (currentPath !== linkPath) {
      // Check for child routes only if checkChildren is true
      if (checkChildren && currentPath.startsWith(linkPath + '/')) {
        return true
      }
      return false
    }

    // Paths match - now check query params

    // If link has no query params
    if (!linkQuery) {
      // Match only if current URL also has no query params
      return !currentQuery
    }

    // If link has query params, check if they match current query params
    const currentParams = new URLSearchParams(currentQuery || '')
    const linkParams = new URLSearchParams(linkQuery)

    // Check if all link query params match current query params
    let allMatch = true
    for (const [key, value] of linkParams.entries()) {
      if (currentParams.get(key) !== value) {
        allMatch = false
        break
      }
    }

    return allMatch
  }

  // Check if any child is active (for accordion state)
  const hasActiveChild = (children?: SidebarLink[]): boolean => {
    if (!children) return false
    return children.some(child => isLinkActive(child.url, false))
  }

  // Get default accordion value
  const getDefaultAccordionValue = (item: SidebarLink): string | undefined => {
    if (isCollapsed) return undefined

    // Open if default open is true
    if (item.defaultOpen) return item.title

    // Open if link is active or has active children
    if (isLinkActive(item.url, false) || hasActiveChild(item.children)) {
      return item.title
    }

    return undefined
  }

  // Group links
  const groupedLinks = links.reduce((acc, item) => {
    const group = item.group ?? "General"
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {} as Record<string, SidebarLink[]>)

  return (
    <ShadcnSidebar
      collapsible="icon"
      className={cn(
        "bg-white border-r border-gray-200",
        isCollapsed ? "w-[72px]" : "w-[256px]"
      )}
    >
      <SidebarContent className="flex flex-col min-h-screen bg-white">
        {/* Logo */}
        <div
          className={cn(
            "border-b flex items-center",
            isCollapsed ? "h-16 justify-center" : "py-[17px] px-4 justify-start"
          )}
        >
          <Logo isCollapsed={isCollapsed} />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-2 scrollbar-thin-alt">
          {Object.entries(groupedLinks).map(([groupName, items]) => (
            <SidebarGroup key={groupName}>
              {!isCollapsed && <SidebarGroupLabel>{groupName}</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(({ title, url, icon: Icon, children, defaultOpen }) => {
                    const isActive = isLinkActive(url, false)

                    return children ? (
                      <Accordion
                        type="single"
                        collapsible
                        key={title}
                        defaultValue={getDefaultAccordionValue({ title, url, icon: Icon, children, defaultOpen })}
                      >
                        <AccordionItem value={title}>
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full rounded-md transition-colors ",
                              isActive
                                ? "bg-gray-100 text-orange-600 font-medium"
                                : "hover:bg-gray-100 text-gray-600",
                              isCollapsed ? "p-3 justify-center" : "px-2 py-1"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={isCollapsed ? "h-6 w-6" : "h-4 w-4"} />
                              {!isCollapsed && <span className="text-sm">{title}</span>}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent
                            className={isCollapsed ? "space-y-1" : "ml-4 mt-1 space-y-1"}
                          >
                            {children.map(({ title: childTitle, url: childUrl, icon: ChildIcon }) => {
                              const isChildActive = isLinkActive(childUrl, false)
                              return (
                                <Link
                                  key={childTitle}
                                  href={childUrl}
                                  className={cn(
                                    "flex items-center gap-2 rounded-md text-sm transition-colors",
                                    isChildActive
                                      ? "bg-gray-100 text-orange-600 font-medium"
                                      : "hover:bg-gray-100 text-gray-600",
                                    isCollapsed ? "justify-center p-3" : "px-2 py-1"
                                  )}
                                >
                                  <ChildIcon className={isCollapsed ? "h-6 w-6" : "h-4 w-4"} />
                                  {!isCollapsed && <span>{childTitle}</span>}
                                </Link>
                              )
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <SidebarMenuItem key={title}>
                        <Link
                          href={url}
                          className={cn(
                            "flex items-center gap-2 rounded-md transition-colors",
                            isActive
                              ? "bg-gray-100 text-orange-600 font-medium"
                              : "hover:bg-gray-100 text-gray-600",
                            isCollapsed ? "justify-center p-3" : "px-2 py-1"
                          )}
                        >
                          <Icon className={isCollapsed ? "h-6 w-6" : "h-4 w-4"} />
                          {!isCollapsed && <span className="text-sm">{title}</span>}
                        </Link>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>

        {/* Account Section */}
        <div className={cn("border-t border-gray-200", !isCollapsed && "px-4 py-3")}>
          <Accordion type="single" collapsible defaultValue={isCollapsed ? undefined : "account"}>
            <AccordionItem value="account">
              {!isCollapsed && (
                <AccordionTrigger className="w-full px-2 py-1 text-left text-sm font-medium">
                  Account
                </AccordionTrigger>
              )}
              <AccordionContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {globalLinks.map(({ title, url, icon: Icon }) => {
                        const resolvedUrl = url.replace("{tenant}", tenant)
                        const isActive = isLinkActive(resolvedUrl, false)
                        return (
                          <SidebarMenuItem key={title}>
                            <Link
                              href={resolvedUrl}
                              className={cn(
                                "flex items-center gap-2 rounded-md transition-colors",
                                isActive
                                  ? "bg-gray-100 text-orange-600 font-medium"
                                  : "hover:bg-gray-100 text-gray-600",
                                isCollapsed ? "justify-center p-3" : "px-2 py-1"
                              )}
                            >
                              <Icon className={isCollapsed ? "h-6 w-6" : "h-4 w-4"} />
                              {!isCollapsed && <span className="text-sm">{title}</span>}
                            </Link>
                          </SidebarMenuItem>
                        )
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SidebarContent>
    </ShadcnSidebar>
  )
}
