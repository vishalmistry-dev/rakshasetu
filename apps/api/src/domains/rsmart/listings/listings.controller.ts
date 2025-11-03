import { AppError } from '@/common/errors'
import { asyncHandler, sendResponse } from '@/common/utils'
import { prisma } from '@/config/prisma'
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from '@/integrations/storage/cloudinary/cloudinary.service'
import {
  addListingService,
  deleteListingService,
  getAllListingsService,
  getLoggedUserListingsService,
  getSingleListingService,
  getUserListingsService,
  updateListingService,
} from './listings.service'

export const addListing = asyncHandler(async (req, res, next) => {
  try {
    const userId = req?.user?.id

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Not authorized' })
    }

    const data = req.body

    let mediaFiles: Express.Multer.File[] = []

    if (Array.isArray(req.files)) {
      mediaFiles = req.files
    } else if (req.files && Array.isArray(req.files['media'])) {
      mediaFiles = req.files['media']
    }

    if (mediaFiles.length > 0) {
      const uploadPromises = mediaFiles.map((file) =>
        uploadOnCloudinary(file.path, 'rakshasetu/listing-media')
      )

      const uploadResults = await Promise.all(uploadPromises)

      const uploadedMedia = uploadResults
        .map((result, index) => {
          const file = mediaFiles[index]
          if (result?.url) {
            return {
              type: file.mimetype, // ✅ capture MIME type
              url: result.url,
            }
          }
          return null
        })
        .filter(Boolean)

      data.media = uploadedMedia
    }

    data.price = parseFloat(data.price.toString())

    // Proceed to service layer to store in DB
    const { message, listing } = await addListingService(userId, data)

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message,
      data: { listing },
    })
  } catch (err) {
    next(err)
  }
})

export const updateListing = asyncHandler(async (req, res, next) => {
  try {
    const userId = req?.user?.id
    const listingId = req.params.listingId

    if (!userId) throw new AppError('Unauthorized: user id not found', 401)
    if (!listingId) throw new AppError('listing id not found', 401)

    const data = req.body

    let mediaFiles: Express.Multer.File[] = []

    if (Array.isArray(req.files)) {
      mediaFiles = req.files
    } else if (req.files && Array.isArray(req.files['media'])) {
      mediaFiles = req.files['media']
    }

    const existingListing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { media: true },
    })

    const oldMedia = Array.isArray(existingListing?.media) ? existingListing.media : []

    let newMedia: string[] = []
    if (mediaFiles.length > 0) {
      const uploadPromises = mediaFiles.map((file) =>
        uploadOnCloudinary(file.path, 'rakshasetu/listing-media')
      )

      const uploadResults = await Promise.all(uploadPromises)

      newMedia = uploadResults.filter((result) => !!result?.url).map((result) => result!.url)
    }

    data.media = [...oldMedia, ...newMedia]

    data.price = parseFloat(data.price.toString())

    const { listing, message } = await updateListingService(userId, listingId, data)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message,
      data: { listing },
    })
  } catch (err) {
    next(err)
  }
})

export const deleteListing = asyncHandler(async (req, res, next) => {
  try {
    const userId = req?.user?.id
    const listingId = req.params.listingId

    if (!userId) throw new AppError('Unauthorized: user id not found', 401)
    if (!listingId) throw new AppError('listing id not found', 401)

    const existingListing = await prisma.listing.findUnique({
      where: { id: listingId },
    })

    if (!existingListing) throw new AppError('Listing not found', 404)

    if (existingListing.sellerId !== userId) {
      throw new AppError('You are not authorized to delete this listing', 403)
    }

    if (Array.isArray(existingListing.media) && existingListing.media.length > 0) {
      const deletePromises = existingListing.media.map((mediaItem) => {
        if (typeof mediaItem !== 'string' || !mediaItem) return Promise.resolve()

        try {
          const url = mediaItem as string
          const parts = url.split('/')
          const fileNameWithExt = parts.slice(-1)[0] // "abc123xyz.jpg"
          const fileName = fileNameWithExt.split('.')[0] // "abc123xyz"
          const folderPath = parts.slice(-2, -1)[0] // "listing-media"
          const publicId = `rakshasetu/${folderPath}/${fileName}` // full public ID

          return deleteFromCloudinary(publicId)
        } catch {
          return Promise.resolve() // fallback if parsing fails
        }
      })

      await Promise.all(deletePromises)
    }

    // Proceed to delete
    const { message } = await deleteListingService(listingId)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message,
    })
  } catch (err) {
    next(err)
  }
})

export const getLoggedUserListings = asyncHandler(async (req, res, next) => {
  try {
    const userId = req?.user?.id

    if (!userId) throw new AppError('Unauthorized: user id not found', 401)

    const { listings } = await getLoggedUserListingsService(userId)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: { listings },
    })
  } catch (err) {
    next(err)
  }
})

export const getSingleListing = asyncHandler(async (req, res, next) => {
  try {
    const listingId = req.params.listingId

    if (!listingId) throw new AppError('listing id not found', 401)

    const { listing } = await getSingleListingService(listingId)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      data: {
        listing,
      },
    })
  } catch (err) {
    next(err)
  }
})

export const getUserListings = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.userId

    if (!userId) throw new AppError('Unauthorized: user id not found', 401)

    const { listings } = await getUserListingsService(userId)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: { listings },
    })
  } catch (err) {
    next(err)
  }
})

export const getAllListings = asyncHandler(async (req, res, next) => {
  try {
    const listings = await getAllListingsService()

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: { listings },
    })
  } catch (err) {
    next(err)
  }
})
