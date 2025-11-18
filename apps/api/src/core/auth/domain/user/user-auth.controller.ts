import { asyncHandler, sendResponse } from "@/common/utils";
import { userAuthService } from "./user-auth.service";
import { generateAccessToken } from "../../shared";
import { cookieOptions } from "@/config/constants";

export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const result = await userAuthService.register(body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const { record, message } = await userAuthService.verifyEmail(body);

    // ✅ Generate JWT token
    const accessToken = generateAccessToken({
      id: record.id,
      userName: record.userName,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      type: record.type,
    });

    // ✅ Set token cookie (controller handles it)
    res.cookie("accessToken", accessToken, cookieOptions);

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
        type: record.type,
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

    const result = await userAuthService.resendOtp(body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const { record, message } = await userAuthService.login(body);

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
      type: record.type,
    });

    // ✅ Set access token cookie
    res.cookie("accessToken", accessToken, cookieOptions);

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

export const forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const result = await userAuthService.forgotPassword(body);

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
    res.clearCookie("accessToken", {
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

    const result = await userAuthService.resetPassword(token, body);

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
    const { record, message } = await userAuthService.verify2FA(body);

    const accessToken = generateAccessToken({
      id: record.id,
      email: record.email,
      userName: record.userName,
      firstName: record.firstName,
      lastName: record.lastName,
      type: record.type,
    });

    res.cookie("accessToken", accessToken, cookieOptions);

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
