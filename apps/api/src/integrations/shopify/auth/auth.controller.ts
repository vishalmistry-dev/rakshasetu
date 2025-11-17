import { asyncHandler, sendResponse } from '@/common/utils'
import * as authService from './auth.service'

export const exchangeToken = asyncHandler(async (req, res) => {
  const { shop, token } = req.body

  const result = await authService.exchangeToken(shop, token)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Token exchanged successfully',
    data: result,
  })
})
