import { AppError } from '@/common/errors'
import { generateUniqueId } from '@/common/utils'
import { prisma } from '@/config/prisma'
import { ListingInput } from './listings.schema'

export const addListingService = async (userId: string, listingData: ListingInput) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new AppError('User not found', 404)

  const listingId = await generateUniqueId('lst', 'listing', 'id')

  const newListing = await prisma.listing.create({
    data: {
      id: listingId,
      ...listingData,
      sellerId: user.id,
    },
  })

  return {
    message: 'Listing created successsfully',
    listing: newListing,
  }
}

export const updateListingService = async (
  userId: string,
  listingId: string,
  listingData: ListingInput
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new AppError('User not found', 404)

  const existingListing = await prisma.listing.findUnique({
    where: { id: listingId },
  })
  if (!existingListing) throw new AppError('Listing not found', 404)

  if (existingListing.sellerId !== user.id) {
    throw new AppError('You are not authorized to update this listing', 403)
  }

  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data: listingData,
  })

  return {
    message: 'Listing updated successfully',
    listing: updatedListing,
  }
}

export const deleteListingService = async (listingId: string) => {
  await prisma.listing.delete({ where: { id: listingId } })

  return {
    message: 'Listing deleted successfully',
  }
}

export const getLoggedUserListingsService = async (userId: string) => {
  const listings = await prisma.listing.findMany({
    where: { sellerId: userId },
    orderBy: { createdAt: 'desc' },
    include: {
      seller: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
        },
      },
    },
  })

  return {
    listings,
  }
}

export const getSingleListingService = async (listingId: string) => {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: {
      seller: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
        },
      },
    },
  })

  return {
    listing,
  }
}

export const getUserListingsService = async (userId: string) => {
  const listings = await prisma.listing.findMany({
    where: { sellerId: userId },
    orderBy: { createdAt: 'desc' },
    include: {
      seller: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
        },
      },
    },
  })

  return {
    listings,
  }
}

export const getAllListingsService = async () => {
  const listings = await prisma.listing.findMany({
    include: {
      seller: {
        select: {
          id: true,
          business: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return { listings }
}
