"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ChevronDown,
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
  cellClassName?: string
  headerClassName?: string
  width?: string
  align?: "left" | "center" | "right"
}

export interface DataTablePagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface DataTableProps<T = any>
  extends VariantProps<typeof tableVariants> {
  // Data
  data: T[]
  columns: DataTableColumn<T>[]
  loading?: boolean
  emptyMessage?: string
  emptyIcon?: React.ReactNode

  // Selection
  selectable?: boolean
  selectedRows?: Set<string>
  onSelectionChange?: (selected: Set<string>) => void
  getRowId?: (row: T) => string

  // Sorting
  sortBy?: string
  sortDirection?: "asc" | "desc"
  onSort?: (key: string) => void

  // Pagination
  pagination?: DataTablePagination
  onPageChange?: (page: number) => void
  showPagination?: boolean

  // Search
  searchable?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  searchDebounce?: number

  // Styling
  className?: string
  tableClassName?: string
  headerClassName?: string
  rowClassName?: string | ((row: T, index: number) => string)
  cellClassName?: string

  // Actions
  actions?: React.ReactNode
  onRowClick?: (row: T, index: number) => void

  // Behavior
  stickyHeader?: boolean
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  bordered?: boolean

  // Loading
  loadingRows?: number
}

// ==========================================
// VARIANTS
// ==========================================

const tableVariants = cva("w-full", {
  variants: {
    size: {
      sm: "text-xs",
      base: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "base",
  },
})

// ==========================================
// COMPONENT
// ==========================================

export function DataTable<T = any>({
  // Data
  data,
  columns,
  loading = false,
  emptyMessage = "No data found",
  emptyIcon,

  // Selection
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  getRowId = (row: any) => row.id,

  // Sorting
  sortBy,
  sortDirection = "asc",
  onSort,

  // Pagination
  pagination,
  onPageChange,
  showPagination = true,

  // Search
  searchable = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  searchDebounce = 300,

  // Styling
  className,
  tableClassName,
  headerClassName,
  rowClassName,
  cellClassName,

  // Actions
  actions,
  onRowClick,

  // Behavior
  stickyHeader = false,
  striped = false,
  hoverable = true,
  compact = false,
  bordered = false,

  // Loading
  loadingRows = 5,

  // Variants
  size = "base",
}: DataTableProps<T>) {
  // ==========================================
  // STATE
  // ==========================================

  const [debouncedSearch, setDebouncedSearch] = React.useState(searchValue)

  // ==========================================
  // SELECTION LOGIC
  // ==========================================

  const allSelected = React.useMemo(() => {
    if (data.length === 0) return false
    return data.every((row) => selectedRows.has(getRowId(row)))
  }, [data, selectedRows, getRowId])

  const someSelected = React.useMemo(() => {
    return data.some((row) => selectedRows.has(getRowId(row))) && !allSelected
  }, [data, selectedRows, allSelected, getRowId])

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
  // SEARCH DEBOUNCE
  // ==========================================

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange?.(debouncedSearch)
    }, searchDebounce)
    return () => clearTimeout(timer)
  }, [debouncedSearch, searchDebounce, onSearchChange])

  // ==========================================
  // SORT ICON
  // ==========================================

  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <ChevronsUpDown className="ml-1 h-4 w-4 text-muted-foreground" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    )
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      {(searchable || actions) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          {searchable && (
            <div className="relative w-full sm:w-[320px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={debouncedSearch}
                onChange={(e) => setDebouncedSearch(e.target.value)}
                className="pl-9 pr-9"
              />
              {debouncedSearch && (
                <button
                  onClick={() => setDebouncedSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Actions */}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Table Container */}
      <div
        className={cn(
          "rounded-md border bg-background overflow-auto",
          bordered && "border-2"
        )}
      >
        <Table className={cn(tableVariants({ size }), tableClassName)}>
          {/* Header */}
          <TableHeader
            className={cn(stickyHeader && "sticky top-0 bg-background z-10", headerClassName)}
          >
            <TableRow>
              {/* Selection Column */}
              {selectable && (
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
              )}

              {/* Data Columns */}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    column.headerClassName,
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable && "cursor-pointer select-none",
                    compact && "py-2"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && onSort?.(column.key)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {/* Loading State */}
            {loading && (
              <>
                {Array.from({ length: loadingRows }).map((_, idx) => (
                  <TableRow key={`loading-${idx}`}>
                    {selectable && (
                      <TableCell>
                        <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={column.key} className={cn(compact && "py-2")}>
                        <div className="h-4 bg-muted animate-pulse rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}

            {/* Empty State */}
            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    {emptyIcon}
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Data Rows */}
            {!loading &&
              data.map((row, index) => {
                const rowId = getRowId(row)
                const isSelected = selectedRows.has(rowId)
                const computedRowClassName =
                  typeof rowClassName === "function"
                    ? rowClassName(row, index)
                    : rowClassName

                return (
                  <TableRow
                    key={rowId}
                    className={cn(
                      striped && index % 2 === 1 && "bg-muted/50",
                      hoverable && "hover:bg-muted/50",
                      isSelected && "bg-muted",
                      onRowClick && "cursor-pointer",
                      computedRowClassName
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {/* Selection Cell */}
                    {selectable && (
                      <TableCell className={cn(compact && "py-2")}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectRow(rowId)}
                          aria-label={`Select row ${index + 1}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}

                    {/* Data Cells */}
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          column.cellClassName,
                          cellClassName,
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
                          compact && "py-2"
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
      {showPagination && pagination && !loading && data.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => onPageChange?.(pagination.page - 1)}
            >
              Previous
            </Button>
            <span className="text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange?.(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// USAGE EXAMPLES
// ==========================================

/*
// 1. SIMPLE TABLE
<DataTable
  data={orders}
  columns={[
    { key: "id", header: "Order ID" },
    { key: "customer", header: "Customer" },
    { key: "amount", header: "Amount", render: (row) => `₹${row.amount}` },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ]}
/>

// 2. TABLE WITH SORTING & PAGINATION
<DataTable
  data={orders}
  columns={[
    { key: "id", header: "ID", sortable: true },
    { key: "date", header: "Date", sortable: true },
  ]}
  sortBy={sortBy}
  sortDirection={sortDirection}
  onSort={handleSort}
  pagination={{
    page: 1,
    pageSize: 10,
    total: 100,
    totalPages: 10,
  }}
  onPageChange={setPage}
/>

// 3. TABLE WITH SELECTION
const [selected, setSelected] = useState(new Set())

<DataTable
  data={orders}
  columns={columns}
  selectable
  selectedRows={selected}
  onSelectionChange={setSelected}
/>

// 4. TABLE WITH SEARCH & ACTIONS
<DataTable
  data={orders}
  columns={columns}
  searchable
  searchValue={search}
  onSearchChange={setSearch}
  actions={
    <>
      <Button onClick={handleExport}>Export</Button>
      <Button onClick={handleCreate}>Create</Button>
    </>
  }
/>

// 5. FULLY CUSTOMIZED
<DataTable
  data={orders}
  columns={columns}
  loading={loading}
  selectable
  searchable
  stickyHeader
  striped
  hoverable
  compact
  bordered
  size="sm"
  onRowClick={(row) => router.push(`/orders/${row.id}`)}
  rowClassName={(row) => row.status === 'urgent' ? 'bg-red-50' : ''}
/>
*/
