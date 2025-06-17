import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ArthurApiRoutes } from "../modules/ArthurApi/arthurApi.router";
import { PropertyRoutes } from "../modules/Properties/properties.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: ArthurApiRoutes,
  },
  {
    path: "/properties",
    route: PropertyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
