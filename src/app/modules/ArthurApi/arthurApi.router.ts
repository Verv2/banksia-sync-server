import express from "express";
import { ArthurApiController } from "./arthurApi.controller";

const router = express.Router();

router.get("/arthur", ArthurApiController.getArthurOAuth);
router.get("/arthur-properties", ArthurApiController.syncArthurProperties);
router.get("/get-properties", ArthurApiController.getAllProperties);

// router.get("/arthur-properties", ArthurApiController.getArthurProperties);

router.post("/token", ArthurApiController.getAccessToken);

export const ArthurApiRoutes = router;
