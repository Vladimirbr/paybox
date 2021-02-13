/**
 * Module dependencies.
 */
import compression from "compression";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import passport from "passport";
import StatusCodes from "http-status-codes";

import logger from "./logger/logger";
import { getDurationInMilliseconds } from "./utils/utils";

const { BAD_REQUEST } = StatusCodes;

// ---> Module for catching all async erros!!!
import "express-async-errors";

// Imports routes
import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import missionRouter from "./routes/mission";

// Passport Config
require("./passport/passport")(passport);

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

// Secure your Express apps by setting various HTTP headers
app.use(helmet());
// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Compress responses
app.use(compression());

// Allow express parse req url and json body
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(mongoSanitize());

// This will initialize the passport object on every request
app.use(passport.initialize());

/**
 * -------------- ROUTES ----------------
 */
app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
// Every req to setting route must be authenticated by jwt
app.use("/api/v1/mission", passport.authenticate("jwt", { session: false }), missionRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`[App] - Error Handler - ${err}`);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

export default app;
