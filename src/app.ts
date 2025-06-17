/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { ArthurApiService } from "./app/modules/ArthurApi/arthurApi.service";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Banksia is running");
});

// runs every 4 hours (00:00, 04:00, 08:00, 12:00, 16:00, 20:00)
cron.schedule("0 */4 * * *", async (): Promise<void> => {
  try {
    await ArthurApiService.syncArthurProperties();
  } catch (error) {
    console.error(error);
  }
});

app.use(globalErrorHandler as any);

//Not Found
app.use(notFound as any);

export default app;

// ! see: 11-9, 11-10 and so on
