import { bodySchema, validateRequest } from '@/common/utils/validateRequest.utils'
import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import { merchantKYCController } from './merchant-kyc.controller'
import {
  InitiateDigiLockerSchema,
  SearchGSTINSchema,
  VerifyBankAccountSchema,
  VerifyGSTINSchema,
  VerifyPANSchema,
} from './merchant-kyc.schema'

const router = Router()

// All routes require merchant authentication
router.use(authenticateMerchant)

// DigiLocker routes
router.post(
  '/digilocker/initiate',
  validateRequest(bodySchema(InitiateDigiLockerSchema)),
  merchantKYCController.initiateDigiLocker
)

router.get('/digilocker/:requestId/status', merchantKYCController.getDigiLockerStatus)

router.get('/digilocker/:requestId/documents', merchantKYCController.fetchDigiLockerDocuments)

// PAN verification
router.post(
  '/pan/verify',
  validateRequest(bodySchema(VerifyPANSchema)),
  merchantKYCController.verifyPAN
)

// GSTIN verification
router.post(
  '/gstin/search',
  validateRequest(bodySchema(SearchGSTINSchema)),
  merchantKYCController.searchGSTIN
)

router.post(
  '/gstin/verify',
  validateRequest(bodySchema(VerifyGSTINSchema)),
  merchantKYCController.verifyGSTIN
)

// Bank account verification
router.post(
  '/bank/verify',
  validateRequest(bodySchema(VerifyBankAccountSchema)),
  merchantKYCController.verifyBankAccount
)

router.get('/bank/:verificationId/status', merchantKYCController.getBankVerificationStatus)

// Overall KYC status
router.get('/status', merchantKYCController.getKYCStatus)

export default router
