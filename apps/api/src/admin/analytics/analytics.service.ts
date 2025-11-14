import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== MERCHANT ANALYTICS ==========================
export const getMerchantAnalytics = async (
  merchantId: string,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate || new Date()

    // Revenue & Orders
    const [orderStats, revenueByDay, topProducts, ordersByStatus] = await Promise.all([
      // Overall stats
      prisma.shopOrder.aggregate({
        where: {
          merchantId,
          createdAt: { gte: start, lte: end },
        },
        _count: { id: true },
        _sum: { totalPrice: true },
        _avg: { totalPrice: true },
      }),

      // Revenue by day
      prisma.$queryRaw`
        SELECT
          DATE("createdAt") as date,
          COUNT(*) as orders,
          SUM("totalPrice") as revenue
        FROM shop_orders
        WHERE "merchantId" = ${merchantId}
          AND "createdAt" >= ${start}
          AND "createdAt" <= ${end}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,

      // Top selling products
      prisma.shopOrderItem.groupBy({
        by: ['productId', 'title'],
        where: {
          order: {
            merchantId,
            createdAt: { gte: start, lte: end },
            status: 'DELIVERED',
          },
        },
        _sum: {
          quantity: true,
          price: true,
        },
        orderBy: {
          _sum: {
            quantity: 'desc',
          },
        },
        take: 10,
      }),

      // Orders by status
      prisma.shopOrder.groupBy({
        by: ['status'],
        where: {
          merchantId,
          createdAt: { gte: start, lte: end },
        },
        _count: { id: true },
      }),
    ])

    logger.info(`Analytics fetched for merchant: ${merchantId}`)

    return {
      summary: {
        totalOrders: orderStats._count.id,
        totalRevenue: orderStats._sum.totalPrice || 0,
        averageOrderValue: orderStats._avg.totalPrice || 0,
      },
      revenueByDay,
      topProducts: topProducts.map((item) => ({
        productId: item.productId,
        title: item.title,
        quantitySold: item._sum.quantity || 0,
        revenue: item._sum.price || 0,
      })),
      ordersByStatus: ordersByStatus.map((item) => ({
        status: item.status,
        count: item._count.id,
      })),
    }
  } catch (error) {
    logger.error('Failed to get merchant analytics:', error)
    throw error
  }
}

// ========================== REVENUE REPORT ==========================
export const getRevenueReport = async (
  merchantId: string,
  period: 'daily' | 'weekly' | 'monthly' = 'daily',
  startDate?: Date,
  endDate?: Date
) => {
  try {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate || new Date()

    let dateFormat: string
    switch (period) {
      case 'daily':
        dateFormat = 'YYYY-MM-DD'
        break
      case 'weekly':
        dateFormat = 'IYYY-IW'
        break
      case 'monthly':
        dateFormat = 'YYYY-MM'
        break
    }

    const report = await prisma.$queryRaw`
      SELECT
        TO_CHAR("createdAt", ${dateFormat}) as period,
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'DELIVERED' THEN 1 END) as completed_orders,
        COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END) as cancelled_orders,
        SUM("totalPrice") as gross_revenue,
        SUM(CASE WHEN status = 'DELIVERED' THEN "totalPrice" ELSE 0 END) as net_revenue,
        SUM("platformFee") as platform_fees,
        SUM("shippingCharge") as shipping_charges,
        AVG("totalPrice") as avg_order_value
      FROM shop_orders
      WHERE "merchantId" = ${merchantId}
        AND "createdAt" >= ${start}
        AND "createdAt" <= ${end}
      GROUP BY period
      ORDER BY period ASC
    `

    logger.info(`Revenue report generated for merchant: ${merchantId}`)

    return report
  } catch (error) {
    logger.error('Failed to generate revenue report:', error)
    throw error
  }
}

// ========================== PRODUCT PERFORMANCE ==========================
export const getProductPerformance = async (
  merchantId: string,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate || new Date()

    const performance = await prisma.$queryRaw`
      SELECT
        p.id,
        p.title,
        p.price,
        p.status,
        COUNT(DISTINCT oi."orderId") as orders_count,
        SUM(oi.quantity) as total_quantity_sold,
        SUM(oi.quantity * oi.price) as total_revenue,
        AVG(oi.price) as avg_selling_price,
        COUNT(CASE WHEN o.status = 'DELIVERED' THEN 1 END) as successful_orders,
        COUNT(CASE WHEN rr.id IS NOT NULL THEN 1 END) as returns_count
      FROM shop_products p
      LEFT JOIN shop_order_items oi ON p.id = oi."productId"
      LEFT JOIN shop_orders o ON oi."orderId" = o.id
      LEFT JOIN return_requests rr ON oi.id = rr."itemId"
      WHERE p."merchantId" = ${merchantId}
        AND o."createdAt" >= ${start}
        AND o."createdAt" <= ${end}
      GROUP BY p.id, p.title, p.price, p.status
      ORDER BY total_revenue DESC NULLS LAST
    `

    logger.info(`Product performance fetched for merchant: ${merchantId}`)

    return performance
  } catch (error) {
    logger.error('Failed to get product performance:', error)
    throw error
  }
}

// ========================== CUSTOMER INSIGHTS ==========================
export const getCustomerInsights = async (merchantId: string, startDate?: Date, endDate?: Date) => {
  try {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate || new Date()

    const [newCustomers, repeatCustomers, topCustomers] = await Promise.all([
      // New customers
      prisma.$queryRaw`
        SELECT COUNT(DISTINCT "customerEmail") as count
        FROM shop_orders
        WHERE "merchantId" = ${merchantId}
          AND "createdAt" >= ${start}
          AND "createdAt" <= ${end}
          AND "customerEmail" NOT IN (
            SELECT DISTINCT "customerEmail"
            FROM shop_orders
            WHERE "merchantId" = ${merchantId}
              AND "createdAt" < ${start}
              AND "customerEmail" IS NOT NULL
          )
      `,

      // Repeat customers
      prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM (
          SELECT "customerEmail"
          FROM shop_orders
          WHERE "merchantId" = ${merchantId}
            AND "createdAt" >= ${start}
            AND "createdAt" <= ${end}
            AND "customerEmail" IS NOT NULL
          GROUP BY "customerEmail"
          HAVING COUNT(*) > 1
        ) as repeat_customers
      `,

      // Top customers
      prisma.$queryRaw`
        SELECT
          "customerName",
          "customerEmail",
          COUNT(*) as order_count,
          SUM("totalPrice") as total_spent,
          AVG("totalPrice") as avg_order_value,
          MAX("createdAt") as last_order_date
        FROM shop_orders
        WHERE "merchantId" = ${merchantId}
          AND "createdAt" >= ${start}
          AND "createdAt" <= ${end}
          AND "customerEmail" IS NOT NULL
        GROUP BY "customerName", "customerEmail"
        ORDER BY total_spent DESC
        LIMIT 20
      `,
    ])

    logger.info(`Customer insights fetched for merchant: ${merchantId}`)

    return {
      newCustomers: (newCustomers as any)[0]?.count || 0,
      repeatCustomers: (repeatCustomers as any)[0]?.count || 0,
      topCustomers,
    }
  } catch (error) {
    logger.error('Failed to get customer insights:', error)
    throw error
  }
}

// ========================== SHIPPING ANALYTICS ==========================
export const getShippingAnalytics = async (
  merchantId: string,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate || new Date()

    const analytics = await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT s.id) as total_shipments,
        COUNT(CASE WHEN s.status = 'DELIVERED' THEN 1 END) as delivered,
        COUNT(CASE WHEN s.status = 'RETURNED' THEN 1 END) as returned,
        COUNT(CASE WHEN s.status = 'FAILED' THEN 1 END) as failed,
        AVG(EXTRACT(EPOCH FROM (s."deliveredAt" - s."createdAt")) / 86400) as avg_delivery_days,
        SUM(o."shippingCharge") as total_shipping_charges,
        AVG(o."shippingCharge") as avg_shipping_charge
      FROM shippings s
      JOIN shop_orders o ON s."orderId" = o.id
      WHERE o."merchantId" = ${merchantId}
        AND s."createdAt" >= ${start}
        AND s."createdAt" <= ${end}
    `

    // Courier performance
    const courierPerformance = await prisma.$queryRaw`
      SELECT
        l."selectedCourierId" as courier_id,
        cq."courierName" as courier_name,
        COUNT(s.id) as shipments,
        COUNT(CASE WHEN s.status = 'DELIVERED' THEN 1 END) as delivered,
        AVG(EXTRACT(EPOCH FROM (s."deliveredAt" - s."createdAt")) / 86400) as avg_delivery_days
      FROM shippings s
      JOIN shop_orders o ON s."orderId" = o.id
      JOIN logistics l ON s."logisticsId" = l.id
      LEFT JOIN courier_quotes cq ON l."selectedCourierId" = cq.id
      WHERE o."merchantId" = ${merchantId}
        AND s."createdAt" >= ${start}
        AND s."createdAt" <= ${end}
      GROUP BY l."selectedCourierId", cq."courierName"
      ORDER BY shipments DESC
    `

    logger.info(`Shipping analytics fetched for merchant: ${merchantId}`)

    return {
      summary: (analytics as any)[0],
      courierPerformance,
    }
  } catch (error) {
    logger.error('Failed to get shipping analytics:', error)
    throw error
  }
}

// ========================== EXPORT DATA ==========================
export const exportAnalyticsData = async (
  merchantId: string,
  reportType: string,
  format: 'csv' | 'json',
  startDate?: Date,
  endDate?: Date
) => {
  try {
    let data: any

    switch (reportType) {
      case 'revenue':
        data = await getRevenueReport(merchantId, 'daily', startDate, endDate)
        break
      case 'products':
        data = await getProductPerformance(merchantId, startDate, endDate)
        break
      case 'customers':
        data = await getCustomerInsights(merchantId, startDate, endDate)
        break
      case 'shipping':
        data = await getShippingAnalytics(merchantId, startDate, endDate)
        break
      default:
        throw new AppError('Invalid report type', 400)
    }

    if (format === 'csv') {
      // Convert to CSV
      const csv = convertToCSV(data)
      return { data: csv, contentType: 'text/csv' }
    }

    return { data, contentType: 'application/json' }
  } catch (error) {
    logger.error('Failed to export analytics data:', error)
    throw error
  }
}

// Helper function to convert to CSV
function convertToCSV(data: any[]): string {
  if (!data || data.length === 0) return ''

  const headers = Object.keys(data[0])
  const csvRows = []

  // Add headers
  csvRows.push(headers.join(','))

  // Add rows
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header]
      return typeof value === 'string' ? `"${value}"` : value
    })
    csvRows.push(values.join(','))
  }

  return csvRows.join('\n')
}

// ========================== COMPARISON ANALYTICS ==========================
export const getComparisonAnalytics = async (
  merchantId: string,
  currentStart: Date,
  currentEnd: Date,
  previousStart: Date,
  previousEnd: Date
) => {
  try {
    const [currentPeriod, previousPeriod] = await Promise.all([
      prisma.shopOrder.aggregate({
        where: {
          merchantId,
          createdAt: { gte: currentStart, lte: currentEnd },
        },
        _count: { id: true },
        _sum: { totalPrice: true },
      }),
      prisma.shopOrder.aggregate({
        where: {
          merchantId,
          createdAt: { gte: previousStart, lte: previousEnd },
        },
        _count: { id: true },
        _sum: { totalPrice: true },
      }),
    ])

    const ordersChange =
      ((currentPeriod._count.id - previousPeriod._count.id) / (previousPeriod._count.id || 1)) * 100
    const revenueChange =
      (((currentPeriod._sum.totalPrice || 0) - (previousPeriod._sum.totalPrice || 0)) /
        (previousPeriod._sum.totalPrice || 1)) *
      100

    logger.info(`Comparison analytics generated for merchant: ${merchantId}`)

    return {
      current: {
        orders: currentPeriod._count.id,
        revenue: currentPeriod._sum.totalPrice || 0,
      },
      previous: {
        orders: previousPeriod._count.id,
        revenue: previousPeriod._sum.totalPrice || 0,
      },
      change: {
        orders: ordersChange,
        revenue: revenueChange,
      },
    }
  } catch (error) {
    logger.error('Failed to get comparison analytics:', error)
    throw error
  }
}
