"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Search,
  X
} from "lucide-react"
import * as React from "react"

// ==========================================
// TYPES
// ==========================================

export interface DataTableColumn<T = any> {
  key: string
  header: string | React.ReactNode
  sortable?: boolean
  render?: (row: T, index: number) => React.ReactNode
  width?: string
  align?: "left" | "center" | "right"
  sortFn?: (a: any, b: any) => number
}

export interface DataTablePagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface DataTableProps<T = any> {
  data: T[]
  columns: DataTableColumn<T>[]
  loading?: boolean
  emptyMessage?: string

  // Selection
  selectable?: boolean
  selectedRows?: Set<string>
  onSelectionChange?: (selected: Set<string>) => void
  getRowId?: (row: T) => string

  // Client-side features
  clientSort?: boolean
  clientSearch?: boolean

  // Server-side features
  sortBy?: string
  sortDirection?: "asc" | "desc"
  onSort?: (key: string) => void

  // Pagination (can be client or server)
  pagination?: DataTablePagination
  onPageChange?: (page: number) => void
  clientPagination?: boolean
  pageSize?: number

  // Search
  searchable?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string

  // Actions
  actions?: React.ReactNode
  onRowClick?: (row: T, index: number) => void

  // Styling
  className?: string
}

// ==========================================
// COMPONENT
// ==========================================

export function DataTable<T = any>({
  data,
  columns,
  loading = false,
  emptyMessage = "No data found",

  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  getRowId = (row: any) => row.id,

  clientSort = true,
  clientSearch = true,

  sortBy: externalSortBy,
  sortDirection: externalSortDirection = "asc",
  onSort: externalOnSort,

  pagination,
  onPageChange,
  clientPagination = false,
  pageSize = 10,

  searchable = false,
  searchValue: externalSearchValue = "",
  onSearchChange: externalOnSearchChange,
  searchPlaceholder = "Search...",

  actions,
  onRowClick,

  className,
}: DataTableProps<T>) {
  // ==========================================
  // STATE
  // ==========================================

  const [internalSearch, setInternalSearch] = React.useState(externalSearchValue)
  const [internalSortBy, setInternalSortBy] = React.useState<string>()
  const [internalSortDirection, setInternalSortDirection] = React.useState<"asc" | "desc">("asc")
  const [internalPage, setInternalPage] = React.useState(1)

  // Determine if using client or server features
  const sortBy = clientSort ? internalSortBy : externalSortBy
  const sortDirection = clientSort ? internalSortDirection : externalSortDirection
  const currentPage = clientPagination ? internalPage : (pagination?.page || 1)

  // ==========================================
  // SELECTION
  // ==========================================

  const allSelected = React.useMemo(() => {
    if (data.length === 0) return false
    return data.every((row) => selectedRows.has(getRowId(row)))
  }, [data, selectedRows, getRowId])

  const handleSelectAll = () => {
    const newSelected = new Set(selectedRows)
    if (allSelected) {
      data.forEach((row) => newSelected.delete(getRowId(row)))
    } else {
      data.forEach((row) => newSelected.add(getRowId(row)))
    }
    onSelectionChange?.(newSelected)
  }

  const handleSelectRow = (rowId: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId)
    } else {
      newSelected.add(rowId)
    }
    onSelectionChange?.(newSelected)
  }

  // ==========================================
  // SEARCH
  // ==========================================

  const searchValue = clientSearch ? internalSearch : externalSearchValue

  React.useEffect(() => {
    if (!clientSearch) {
      const timer = setTimeout(() => {
        externalOnSearchChange?.(internalSearch)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [internalSearch, clientSearch, externalOnSearchChange])

  React.useEffect(() => {
    setInternalSearch(externalSearchValue)
  }, [externalSearchValue])

  // ==========================================
  // CLIENT-SIDE FILTERING
  // ==========================================

  const filteredData = React.useMemo(() => {
    if (!clientSearch || !searchValue) return data

    return data.filter((row: any) => {
      const searchLower = searchValue.toLowerCase()
      return columns.some(col => {
        const value = row[col.key]
        if (value == null) return false
        return String(value).toLowerCase().includes(searchLower)
      })
    })
  }, [data, searchValue, columns, clientSearch])

  // ==========================================
  // CLIENT-SIDE SORTING
  // ==========================================

  const sortedData = React.useMemo(() => {
    if (!clientSort || !sortBy) return filteredData

    const sorted = [...filteredData].sort((a: any, b: any) => {
      const column = columns.find(col => col.key === sortBy)

      // Use custom sort function if provided
      if (column?.sortFn) {
        return column.sortFn(a[sortBy], b[sortBy])
      }

      // Default sort
      const aVal = a[sortBy]
      const bVal = b[sortBy]

      if (aVal == null) return 1
      if (bVal == null) return -1

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal
      }

      return String(aVal).localeCompare(String(bVal))
    })

    return sortDirection === "desc" ? sorted.reverse() : sorted
  }, [filteredData, sortBy, sortDirection, columns, clientSort])

  // ==========================================
  // CLIENT-SIDE PAGINATION
  // ==========================================

  const paginatedData = React.useMemo(() => {
    if (!clientPagination) return sortedData

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return sortedData.slice(start, end)
  }, [sortedData, currentPage, pageSize, clientPagination])

  const totalPages = clientPagination
    ? Math.ceil(sortedData.length / pageSize)
    : (pagination?.totalPages || 1)

  const displayData = clientPagination ? paginatedData : sortedData

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleSort = (key: string) => {
    if (clientSort) {
      if (internalSortBy === key) {
        setInternalSortDirection(internalSortDirection === "asc" ? "desc" : "asc")
      } else {
        setInternalSortBy(key)
        setInternalSortDirection("asc")
      }
    } else {
      externalOnSort?.(key)
    }
  }

  const handlePageChange = (page: number) => {
    if (clientPagination) {
      setInternalPage(page)
    } else {
      onPageChange?.(page)
    }
  }

  // ==========================================
  // RENDER HELPERS
  // ==========================================

  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4 text-orange-600" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4 text-orange-600" />
    )
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      {(searchable || actions) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={internalSearch}
                onChange={(e) => setInternalSearch(e.target.value)}
                className="pl-10 pr-10"
              />
              {internalSearch && (
                <button
                  onClick={() => setInternalSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "font-medium text-gray-700",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable && "cursor-pointer select-none hover:text-gray-900"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading */}
            {loading && (
              <>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={`loading-${idx}`}>
                    {selectable && (
                      <TableCell>
                        <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        <div className="h-4 bg-gray-200 animate-pulse rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}

            {/* Empty */}
            {!loading && displayData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-32 text-center text-gray-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              displayData.map((row, index) => {
                const rowId = getRowId(row)
                const isSelected = selectedRows.has(rowId)

                return (
                  <TableRow
                    key={rowId}
                    className={cn(
                      "group hover:bg-gray-50",
                      isSelected && "bg-blue-50",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectRow(rowId)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          "relative",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right"
                        )}
                      >
                        {column.render
                          ? column.render(row, index)
                          : (row as any)[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {(pagination || clientPagination) && !loading && displayData.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-600">
            {clientPagination ? (
              <>Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results</>
            ) : (
              <>Page {currentPage} of {totalPages}</>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
