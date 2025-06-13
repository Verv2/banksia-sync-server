import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../utils/sendResponse";

const stripePayment = catchAsync(async (req: Request, res: Response) => {
  const amount = req.body.amount;
  const result = await PaymentService.stripePayment(amount);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment",
    data: result,
  });
});

export const PaymentController = {
  stripePayment,
};
