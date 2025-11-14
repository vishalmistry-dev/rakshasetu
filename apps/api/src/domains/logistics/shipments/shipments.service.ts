import { AppError } from '@/common/errors'
import { generateUniqueId, logger } from '@/common/utils'
import { prisma } from '@/config/prisma'
import {
  CourierFactory,
  CourierProviderName,
} from '@/integrations/courier-partners/courier.factory'
import { CreateShipmentInput } from './shipments.types'

// ========================== CREATE SHIPMENT ==========================
export const createShipment = async (merchantId: string, input: CreateShipmentInput) => {
  try {
    // Get order details
    const order = await prisma.shopOrder.findFirst({
      where: {
        id: input.orderId,
        merchantId,
      },
      include: {
        store: true,
        merchant: true,
      },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    // Get merchant pickup address
    const pickupAddress = await prisma.address.findFirst({
      where: {
        merchantId,
        type: 'PICKUP',
        isDefault: true,
      },
    })

    if (!pickupAddress) {
      throw new AppError('Merchant pickup address not found. Please add pickup address.', 400)
    }

    // Step 1: Create Logistics entry
    const logisticsId = await generateUniqueId('log', 'logistics')

    const logistics = await prisma.logistics.create({
      data: {
        id: logisticsId,
        orderId: order.id,
        packageDetails: {
          weight: input.weight,
          pieces: input.pieces,
          dimensions: input.dimensions,
          commodity: input.commodity,
          invoiceValue: input.invoiceValue,
        },
        pickupAddress: {
          line1: pickupAddress.line1,
          line2: pickupAddress.line2,
          city: pickupAddress.city,
          state: pickupAddress.state,
          pincode: pickupAddress.pincode,
          phone: pickupAddress.phone,
        },
        dropoffAddress: input.consigneeAddress,
        estimatedCharge: 0, // Will update after quote selection
        status: 'CREATED',
        preferredPickupDate: input.pickupDate ? new Date(input.pickupDate) : null,
        preferredPickupTime: input.pickupTime,
      },
    })

    // Step 2: Get courier quotes
    let selectedCourierId: string
    let courierProviderName: CourierProviderName
    let trackingNumber: string
    let labelBuffer: Buffer | undefined

    if (input.courierProvider) {
      // Use specified courier
      courierProviderName = input.courierProvider
    } else {
      // Auto-select best courier
      try {
        const quotes = await CourierFactory.getBestQuote({
          originPincode: pickupAddress.pincode,
          destinationPincode: input.consigneeAddress.pincode,
          weight: input.weight,
          paymentMode: input.paymentMode,
          collectableAmount: input.collectableAmount,
        })

        courierProviderName = quotes[0].courierName.toLowerCase() as CourierProviderName
        logger.info(`Auto-selected courier: ${courierProviderName}`)
      } catch (error) {
        logger.warn('Failed to get quotes, using default courier (bluedart)')
        courierProviderName = 'bluedart'
      }
    }

    // Step 3: Create courier quote entry
    const quoteId = await generateUniqueId('cqt', 'courierQuote')

    const courierQuote = await prisma.courierQuote.create({
      data: {
        id: quoteId,
        logisticsId: logistics.id,
        courierCode: courierProviderName.toUpperCase(),
        courierName: courierProviderName === 'bluedart' ? 'BlueDart' : 'Delhivery',
        serviceName: 'Express',
        shippingCharge: 0, // Will be updated with actual charge
        estimatedDeliveryDays: 3,
      },
    })

    selectedCourierId = courierQuote.id

    // Step 4: Create actual shipment with courier
    const courier = CourierFactory.getProvider(courierProviderName)

    const shipmentResult = await courier.createShipment({
      // Consignee
      consigneeName: input.consigneeName,
      consigneeAddress: `${input.consigneeAddress.line1}, ${input.consigneeAddress.line2 || ''}`,
      consigneePincode: input.consigneeAddress.pincode,
      consigneeCity: input.consigneeAddress.city,
      consigneeState: input.consigneeAddress.state,
      consigneeMobile: input.consigneePhone,
      consigneeEmail: input.consigneeEmail,

      // Shipper (merchant)
      shipperCode: order.merchant.id,
      shipperName: order.merchant.businessName,
      shipperAddress: pickupAddress.line1,
      shipperPincode: pickupAddress.pincode,
      shipperCity: pickupAddress.city,
      shipperState: pickupAddress.state,
      shipperMobile: pickupAddress.phone || order.merchant.phone,

      // Package
      weight: input.weight,
      pieces: input.pieces,
      dimensions: input.dimensions,
      commodity: input.commodity,
      invoiceValue: input.invoiceValue,

      // Payment
      paymentMode: input.paymentMode,
      collectableAmount: input.collectableAmount,

      // Pickup
      schedulePickup: input.schedulePickup,
      pickupDate: input.pickupDate,
      pickupTime: input.pickupTime,
    })

    trackingNumber = shipmentResult.trackingNumber
    labelBuffer = shipmentResult.label

    // Step 5: Create Shipping entry
    const shippingId = await generateUniqueId('shp', 'shipping')

    const shipping = await prisma.shipping.create({
      data: {
        id: shippingId,
        logisticsId: logistics.id,
        selectedCourierQuoteId: selectedCourierId,
        orderId: order.id,
        trackingId: trackingNumber,
        shippingSource: 'ORDER',
        deliveryAddress: input.consigneeAddress,
        weight: input.weight,
        length: input.dimensions?.length,
        width: input.dimensions?.width,
        height: input.dimensions?.height,
        codAmount: input.collectableAmount,
        status: 'PENDING',
        trackingUrl: `https://track.bluedart.com/${trackingNumber}`, // TODO: Make dynamic
      },
    })

    // Step 6: Update logistics with selected courier
    await prisma.logistics.update({
      where: { id: logistics.id },
      data: {
        selectedCourierId,
        status: input.schedulePickup ? 'PICKUP_SCHEDULED' : 'SHIPMENT_REGISTERED',
        pickupScheduledAt: input.schedulePickup ? new Date() : null,
      },
    })

    // Step 7: Update order status
    await prisma.shopOrder.update({
      where: { id: order.id },
      data: {
        status: 'READY_FOR_PICKUP',
      },
    })

    return {
      shipping,
      trackingNumber,
      courierName: courierQuote.courierName,
      label: labelBuffer,
      estimatedDelivery: shipmentResult.estimatedDelivery,
    }
  } catch (error) {
    logger.error('Failed to create shipment:', error)
    throw error
  }
}

// ========================== GET SHIPMENT ==========================
export const getShipmentById = async (shipmentId: string, merchantId: string) => {
  const shipment = await prisma.shipping.findFirst({
    where: {
      id: shipmentId,
      order: {
        merchantId,
      },
    },
    include: {
      order: {
        select: {
          id: true,
          name: true,
          totalPrice: true,
          customerName: true,
        },
      },
      logistics: {
        include: {
          selectedCourier: true,
        },
      },
      trackingEvents: {
        orderBy: {
          timestamp: 'desc',
        },
      },
    },
  })

  if (!shipment) {
    throw new AppError('Shipment not found', 404)
  }

  return shipment
}

// ========================== LIST SHIPMENTS ==========================
export const listShipments = async (
  merchantId: string,
  filters: {
    status?: string
    orderId?: string
    page?: number
    limit?: number
  }
) => {
  const { status, orderId, page = 1, limit = 20 } = filters
  const skip = (page - 1) * limit

  const where: any = {
    order: {
      merchantId,
    },
  }

  if (status) where.status = status
  if (orderId) where.orderId = orderId

  const [shipments, total] = await Promise.all([
    prisma.shipping.findMany({
      where,
      include: {
        order: {
          select: {
            id: true,
            name: true,
            customerName: true,
          },
        },
        logistics: {
          include: {
            selectedCourier: {
              select: {
                courierName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.shipping.count({ where }),
  ])

  return {
    shipments,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// ========================== TRACK SHIPMENT ==========================
export const trackShipment = async (shipmentId: string, merchantId: string) => {
  const shipment = await prisma.shipping.findFirst({
    where: {
      id: shipmentId,
      order: {
        merchantId,
      },
    },
    include: {
      logistics: {
        include: {
          selectedCourier: true,
        },
      },
    },
  })

  if (!shipment || !shipment.trackingId) {
    throw new AppError('Shipment not found or tracking not available', 404)
  }

  const courierName = shipment.logistics?.selectedCourier?.courierName.toLowerCase()
  if (!courierName) {
    throw new AppError('Courier information not found', 404)
  }

  // Get courier provider
  const courier = CourierFactory.getProvider(courierName as CourierProviderName)

  // Fetch latest tracking data
  const tracking = await courier.trackShipment(shipment.trackingId)

  // Update shipment status based on tracking
  let newStatus = shipment.status
  if (tracking.statusCode.includes('DELIVERED')) {
    newStatus = 'DELIVERED'
  } else if (tracking.statusCode.includes('OUT_FOR_DELIVERY')) {
    newStatus = 'OUT_FOR_DELIVERY'
  } else if (tracking.statusCode.includes('TRANSIT')) {
    newStatus = 'SHIPPED'
  }

  await prisma.shipping.update({
    where: { id: shipment.id },
    data: {
      status: newStatus,
      trackingStatus: newStatus,
    },
  })

  // Save tracking events
  for (const scan of tracking.scans) {
    const timestamp = new Date(`${scan.date} ${scan.time}`)
    const eventId = await generateUniqueId('trk', 'trackingEvent')

    try {
      await prisma.trackingEvent.create({
        data: {
          id: eventId,
          shippingId: shipment.id,
          status: newStatus,
          location: scan.location,
          remarks: scan.description, // ✅ Changed from 'description' to 'remarks'
          timestamp,
        },
      })
    } catch (error) {
      // Event might already exist, skip
      logger.debug('Skipped duplicate tracking event')
    }
  }

  return tracking
}

// ========================== CANCEL SHIPMENT ==========================
export const cancelShipment = async (shipmentId: string, merchantId: string) => {
  const shipment = await prisma.shipping.findFirst({
    where: {
      id: shipmentId,
      order: {
        merchantId,
      },
    },
  })

  if (!shipment) {
    throw new AppError('Shipment not found', 404)
  }

  if (!['PENDING'].includes(shipment.status)) {
    throw new AppError('Cannot cancel shipment in current status', 400)
  }

  // Update shipment status
  await prisma.shipping.update({
    where: { id: shipment.id },
    data: {
      status: 'FAILED',
      returnReason: 'Cancelled by merchant',
    },
  })

  return { success: true }
}
