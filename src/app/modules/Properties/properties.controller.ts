import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { PropertiesService } from "./properties.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const getPropertyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PropertiesService.getPropertiesById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property retrieval successfully",
    data: result,
  });
});

export const PropertyController = {
  getPropertyById,
};
