/**
 * Module dependencies.
 */
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import StatusCodes from "http-status-codes";
import morgan from "morgan";

import logger from "./logger/logger";
import { getDurationInMilliseconds } from "./utils/utils";

const { BAD_REQUEST } = StatusCodes;

// ---> Module for catching all async erros!!!
import "express-async-errors";

// Imports routes
import indexRouter from "./routes/index";

// Create the Express application
const app: express.Application = express();

// Using the logger and its configured transports, to save the logs created by Morgan and combined with Winston logger
const myStream = {
  write: (text: string) => {
    logger.info(text);
  },
};
app.use(morgan("combined", { stream: myStream }));

//Calculate req res time
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.log("debug", `[App] - ${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
  });

  res.on("close", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.log("debug", `[App] - ${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`);
  });

  next();
});

// Allows our other application to make HTTP requests to Express application
app.use(cors());

// Allow express parse req url and text body
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

// Secure your Express apps by setting various HTTP headers
app.use(helmet());
// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Compress responses
app.use(compression());

/**
 * -------------- ROUTES ----------------
 */
app.use("/api", indexRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`[App] - Error Handler - ${err}`);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

export default app;
