import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/stripe-payment-intent", PaymentController.stripePayment);

export const PaymentRoutes = router;
