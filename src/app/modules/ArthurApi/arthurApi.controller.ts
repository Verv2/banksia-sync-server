import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { ArthurApiService } from "./arthurApi.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const getArthurOAuth = catchAsync(async (req: Request, res: Response) => {
  const result = await ArthurApiService.getArthurOAuthUrl();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Arthur Authentication url has been generated!",
    data: result,
  });
});

const getAccessToken = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Missing authorization code");
  }
  const result = await ArthurApiService.getAccessToken(code);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Arthur access token has been generated!",
    data: result,
  });
});

const syncArthurProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await ArthurApiService.syncArthurProperties();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All properties have been retrieved!",
    data: result,
  });
});

// const getArthurProperties = catchAsync(async (req: Request, res: Response) => {
//   const result = await ArthurApiService.getArthurProperties();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "All properties have been retrieved!",
//     data: result,
//   });
// });

export const ArthurApiController = {
  getArthurOAuth,
  getAccessToken,
  syncArthurProperties,
  // getArthurProperties,
};
