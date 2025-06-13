import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { PaymentRoutes } from "../modules/Payment/payment.router";
import { ArthurApiRoutes } from "../modules/ArthurApi/arthurApi.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
  {
    path: "/auth",
    route: ArthurApiRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
