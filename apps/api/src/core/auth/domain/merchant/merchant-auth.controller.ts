import { asyncHandler, sendResponse } from "@/common/utils";
import { merchatnAuthService } from "./merchant-auth.service";
import { generateAccessToken } from "../../shared";
import { cookieOptions } from "@/config/constants";

export const registerMerchant = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const result = await merchatnAuthService.register(body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

export const loginMerchant = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const { record, message } = await merchatnAuthService.login(body);

    // ✅ Handle 2FA requirement
    if (record.twoFactorStatus) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: message,
        data: {
          requires2FA: true,
          userId: record.id,
        },
      });
    }

    // ✅ Generate JWT
    const accessToken = generateAccessToken({
      id: record.id,
      email: record.email,
      userName: record.userName,
      firstName: record.firstName,
      lastName: record.lastName,
    });

    // ✅ Set access token cookie
    res.cookie("merchantAccessToken", accessToken, cookieOptions);

    // ✅ Send response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: message,
      data: {},
    });
  } catch (err) {
    next(err);
  }
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const { record, message } = await merchatnAuthService.verifyEmail(body);

    // ✅ Generate JWT token
    const accessToken = generateAccessToken({
      id: record.id,
      userName: record.userName,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
    });

    // ✅ Set token cookie (controller handles it)
    res.cookie("merchantAccessToken", accessToken, cookieOptions);

    // ✅ Send final response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: message,
      data: {
        id: record.id,
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
        userName: record.userName,
        emailVerified: record.emailVerified,
      },
    });
  } catch (err) {
    next(err);
  }
});

export const resendOtp = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const result = await merchatnAuthService.resendOtp(body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const result = await merchatnAuthService.forgotPassword(body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("merchantAccessToken", {
      ...cookieOptions,
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    next(err);
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const token = req.params.token as string;
    const body = req.body;

    const result = await merchatnAuthService.resetPassword(token, body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

export const verifyTwoFAOtp = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const { record, message } = await merchatnAuthService.verify2FA(body);

    const accessToken = generateAccessToken({
      id: record.id,
      email: record.email,
      userName: record.userName,
      firstName: record.firstName,
      lastName: record.lastName,
    });

    res.cookie("merchantAccessToken", accessToken, cookieOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: message,
      data: { record },
    });
  } catch (err) {
    next(err);
  }
});
