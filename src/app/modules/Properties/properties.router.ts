import express from "express";
import { PropertyController } from "./properties.controller";

const router = express.Router();

router.get("/:id", PropertyController.getPropertyById);

export const PropertyRoutes = router;
