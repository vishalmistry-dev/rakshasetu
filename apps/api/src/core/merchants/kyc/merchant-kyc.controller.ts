// src/core/merchants/kyc/merchant-kyc.controller.ts

import { asyncHandler } from '@/common/utils/asyncHandler.utils'
import { sendResponse } from '@/common/utils/sendResponse.utils'
import { Request, Response } from 'express'
import { merchantKYCService } from './merchant-kyc.service'

export class MerchantKYCController {
  initiateDigiLocker = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { documents, purpose } = req.body

    const result = await merchantKYCService.initiateDigiLocker(merchantId, documents, purpose)

    sendResponse(res, {
      statusCode: 200,
      message: 'DigiLocker verification initiated',
      data: result,
    })
  })

  getDigiLockerStatus = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { requestId } = req.params

    const result = await merchantKYCService.getDigiLockerStatus(merchantId, requestId)

    sendResponse(res, {
      statusCode: 200,
      message: 'DigiLocker status retrieved',
      data: result,
    })
  })

  fetchDigiLockerDocuments = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { requestId } = req.params

    const result = await merchantKYCService.fetchDigiLockerDocuments(merchantId, requestId)

    sendResponse(res, {
      statusCode: 200,
      message: 'Documents fetched successfully',
      data: result,
    })
  })

  verifyPAN = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { pan } = req.body

    const result = await merchantKYCService.verifyPAN(merchantId, pan)

    sendResponse(res, {
      statusCode: 200,
      message: 'PAN verified successfully',
      data: result,
    })
  })

  searchGSTIN = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { pan, state_code } = req.body

    const result = await merchantKYCService.searchGSTIN(merchantId, pan, state_code)

    sendResponse(res, {
      statusCode: 200,
      message: 'GSTIN search completed',
      data: result,
    })
  })

  verifyGSTIN = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { gstin } = req.body

    const result = await merchantKYCService.verifyGSTIN(merchantId, gstin)

    sendResponse(res, {
      statusCode: 200,
      message: 'GSTIN verified successfully',
      data: result,
    })
  })

  verifyBankAccount = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { account_number, ifsc, name } = req.body

    const result = await merchantKYCService.verifyBankAccount(
      merchantId,
      account_number,
      ifsc,
      name
    )

    sendResponse(res, {
      statusCode: 200,
      message: 'Bank verification initiated',
      data: result,
    })
  })

  getBankVerificationStatus = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id
    const { verificationId } = req.params

    const result = await merchantKYCService.getBankVerificationStatus(merchantId, verificationId)

    sendResponse(res, {
      statusCode: 200,
      message: 'Bank verification status retrieved',
      data: result,
    })
  })

  getKYCStatus = asyncHandler(async (req: Request, res: Response) => {
    const merchantId = req.merchant!.id

    const result = await merchantKYCService.getKYCStatus(merchantId)

    sendResponse(res, {
      statusCode: 200,
      message: 'KYC status retrieved',
      data: result,
    })
  })
}

export const merchantKYCController = new MerchantKYCController()
