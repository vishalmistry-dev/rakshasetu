import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'
import { cloudinaryService } from '@/integrations/storage/cloudinary/cloudinary.service'
import fs from 'fs'

// ========================== UPLOAD FILE ==========================
export const uploadFile = async (
  file: Express.Multer.File,
  uploadedBy: {
    userId?: string
    merchantId?: string
    adminId?: string
  },
  metadata?: any
) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinaryService.uploadFile(file.path)

    // Delete local file
    fs.unlinkSync(file.path)

    // Save to database
    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const uploadedFile = await prisma.file.create({
      data: {
        id: fileId,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        filePath: result.secure_url,
        cloudinaryId: result.public_id,
        uploadedByUserId: uploadedBy.userId,
        uploadedByMerchantId: uploadedBy.merchantId,
        uploadedByAdminId: uploadedBy.adminId,
        metadata,
      },
    })

    logger.info(`File uploaded: ${fileId}`)

    return uploadedFile
  } catch (error) {
    // Clean up file if upload fails
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path)
    }
    logger.error('Failed to upload file:', error)
    throw error
  }
}

// ========================== UPLOAD MULTIPLE FILES ==========================
export const uploadMultipleFiles = async (
  files: Express.Multer.File[],
  uploadedBy: {
    userId?: string
    merchantId?: string
    adminId?: string
  },
  metadata?: any
) => {
  try {
    const uploadedFiles = await Promise.all(
      files.map((file) => uploadFile(file, uploadedBy, metadata))
    )

    logger.info(`${uploadedFiles.length} files uploaded`)

    return uploadedFiles
  } catch (error) {
    logger.error('Failed to upload multiple files:', error)
    throw error
  }
}

// ========================== GET FILE ==========================
export const getFileById = async (fileId: string) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    })

    if (!file) {
      throw new AppError('File not found', 404)
    }

    return file
  } catch (error) {
    logger.error('Failed to get file:', error)
    throw error
  }
}

// ========================== LIST FILES ==========================
export const listFiles = async (filters: {
  userId?: string
  merchantId?: string
  adminId?: string
  fileType?: string
  page?: number
  limit?: number
}) => {
  try {
    const { userId, merchantId, adminId, fileType, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const where: any = {}

    if (userId) where.uploadedByUserId = userId
    if (merchantId) where.uploadedByMerchantId = merchantId
    if (adminId) where.uploadedByAdminId = adminId
    if (fileType) where.fileType = { contains: fileType }

    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where,
        orderBy: { uploadedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.file.count({ where }),
    ])

    logger.info(`Listed ${files.length} files`)

    return {
      files,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    logger.error('Failed to list files:', error)
    throw error
  }
}

// ========================== DELETE FILE ==========================
export const deleteFile = async (fileId: string) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    })

    if (!file) {
      throw new AppError('File not found', 404)
    }

    // Delete from Cloudinary
    if (file.cloudinaryId) {
      await cloudinaryService.deleteFile(file.cloudinaryId)
    }

    // Delete from database
    await prisma.file.delete({
      where: { id: fileId },
    })

    logger.info(`File deleted: ${fileId}`)

    return { success: true }
  } catch (error) {
    logger.error('Failed to delete file:', error)
    throw error
  }
}

// ========================== GENERATE INVOICE ==========================
export const generateInvoice = async (orderId: string) => {
  try {
    const order = await prisma.shopOrder.findUnique({
      where: { id: orderId },
      include: {
        merchant: {
          include: {
            account: true,
            addresses: true,
          },
        },
        store: true,
        lineItems: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML(order)

    // TODO: Convert HTML to PDF using a library like puppeteer or pdfkit
    // For now, return HTML
    const invoiceId = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Save invoice metadata
    const invoice = await prisma.file.create({
      data: {
        id: invoiceId,
        fileName: `invoice-${order.name}.html`,
        fileType: 'text/html',
        fileSize: Buffer.byteLength(invoiceHTML),
        filePath: `/invoices/${invoiceId}.html`,
        uploadedByMerchantId: order.merchantId,
        metadata: {
          orderId: order.id,
          type: 'INVOICE',
        },
      },
    })

    logger.info(`Invoice generated for order: ${orderId}`)

    return {
      invoice,
      html: invoiceHTML,
    }
  } catch (error) {
    logger.error('Failed to generate invoice:', error)
    throw error
  }
}

// Helper function to generate invoice HTML
function generateInvoiceHTML(order: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${order.name}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .info { margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .total { font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1>INVOICE</h1>
    <p>Order: ${order.name}</p>
    <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
  </div>

  <div class="info">
    <h3>From:</h3>
    <p><strong>${order.merchant.businessName}</strong></p>
    <p>${order.merchant.email}</p>
    <p>${order.merchant.phone}</p>
  </div>

  <div class="info">
    <h3>To:</h3>
    <p><strong>${order.customerName}</strong></p>
    <p>${order.customerEmail}</p>
    <p>${order.customerPhone}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${order.lineItems
        .map(
          (item: any) => `
        <tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price}</td>
          <td>₹${(item.quantity * item.price).toFixed(2)}</td>
        </tr>
      `
        )
        .join('')}
      <tr class="total">
        <td colspan="3">Subtotal</td>
        <td>₹${order.subtotalPrice || order.totalPrice}</td>
      </tr>
      ${
        order.totalTax
          ? `
      <tr>
        <td colspan="3">Tax</td>
        <td>₹${order.totalTax}</td>
      </tr>
      `
          : ''
      }
      ${
        order.shippingCharge
          ? `
      <tr>
        <td colspan="3">Shipping</td>
        <td>₹${order.shippingCharge}</td>
      </tr>
      `
          : ''
      }
      ${
        order.codCharge
          ? `
      <tr>
        <td colspan="3">COD Charge</td>
        <td>₹${order.codCharge}</td>
      </tr>
      `
          : ''
      }
      <tr class="total">
        <td colspan="3"><strong>TOTAL</strong></td>
        <td><strong>₹${order.totalPrice}</strong></td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 40px;">
    <p>Thank you for your business!</p>
    <p><small>This is a computer generated invoice.</small></p>
  </div>
</body>
</html>
  `
}

// ========================== GENERATE SHIPPING LABEL ==========================
export const generateShippingLabel = async (shippingId: string) => {
  try {
    const shipping = await prisma.shipping.findUnique({
      where: { id: shippingId },
      include: {
        order: {
          include: {
            merchant: true,
          },
        },
        logistics: true,
      },
    })

    if (!shipping) {
      throw new AppError('Shipping not found', 404)
    }

    // Generate label HTML
    const labelHTML = generateLabelHTML(shipping)

    const labelId = `label_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Save label metadata
    const label = await prisma.file.create({
      data: {
        id: labelId,
        fileName: `label-${shipping.awbNumber}.html`,
        fileType: 'text/html',
        fileSize: Buffer.byteLength(labelHTML),
        filePath: `/labels/${labelId}.html`,
        uploadedByMerchantId: shipping.order.merchantId,
        metadata: {
          shippingId: shipping.id,
          type: 'SHIPPING_LABEL',
        },
      },
    })

    logger.info(`Shipping label generated: ${shippingId}`)

    return {
      label,
      html: labelHTML,
    }
  } catch (error) {
    logger.error('Failed to generate shipping label:', error)
    throw error
  }
}

// Helper function to generate label HTML
function generateLabelHTML(shipping: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Shipping Label - ${shipping.awbNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .label { border: 2px solid #000; padding: 20px; max-width: 600px; }
    .section { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #ccc; }
    .barcode { text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="label">
    <div class="section">
      <h2>FROM:</h2>
      <p><strong>${shipping.order.merchant.businessName}</strong></p>
      <p>${shipping.pickupAddress?.address || 'N/A'}</p>
      <p>${shipping.pickupAddress?.city || ''}, ${shipping.pickupAddress?.state || ''} - ${shipping.pickupAddress?.pincode || ''}</p>
      <p>Phone: ${shipping.order.merchant.phone}</p>
    </div>

    <div class="section">
      <h2>TO:</h2>
      <p><strong>${shipping.order.customerName}</strong></p>
      <p>${shipping.deliveryAddress?.address || 'N/A'}</p>
      <p>${shipping.deliveryAddress?.city || ''}, ${shipping.deliveryAddress?.state || ''} - ${shipping.deliveryAddress?.pincode || ''}</p>
      <p>Phone: ${shipping.order.customerPhone}</p>
    </div>

    <div class="barcode">
      <p>AWB: ${shipping.awbNumber}</p>
      <p style="font-size: 14px;">Tracking: ${shipping.trackingId}</p>
    </div>

    <div class="section">
      <p><strong>Weight:</strong> ${shipping.weight || 'N/A'} kg</p>
      <p><strong>Payment:</strong> ${shipping.order.paymentType || 'N/A'}</p>
      ${shipping.codAmount ? `<p><strong>COD Amount:</strong> ₹${shipping.codAmount}</p>` : ''}
    </div>
  </div>
</body>
</html>
  `
}

// ========================== BULK EXPORT ==========================
export const exportOrders = async (
  merchantId: string,
  format: 'csv' | 'excel',
  startDate?: Date,
  endDate?: Date
) => {
  try {
    const where: any = { merchantId }

    if (startDate) where.createdAt = { gte: startDate }
    if (endDate) where.createdAt = { ...where.createdAt, lte: endDate }

    const orders = await prisma.shopOrder.findMany({
      where,
      include: {
        lineItems: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Convert to CSV
    const csv = convertOrdersToCSV(orders)

    logger.info(`Exported ${orders.length} orders for merchant: ${merchantId}`)

    return {
      data: csv,
      contentType: 'text/csv',
      filename: `orders-${Date.now()}.csv`,
    }
  } catch (error) {
    logger.error('Failed to export orders:', error)
    throw error
  }
}

function convertOrdersToCSV(orders: any[]): string {
  const headers = [
    'Order ID',
    'Order Name',
    'Customer Name',
    'Customer Email',
    'Total Price',
    'Status',
    'Payment Type',
    'Created At',
  ]

  const rows = orders.map((order) => [
    order.id,
    order.name,
    order.customerName,
    order.customerEmail,
    order.totalPrice,
    order.status,
    order.paymentType,
    new Date(order.createdAt).toLocaleDateString(),
  ])

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

  return csvContent
}
