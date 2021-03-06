import mongoose from "mongoose";

import { MONGO_URI, MONGO_POOL_SIZE } from "../configs/env";

mongoose.Promise = global.Promise;

mongoose.set("useFindAndModify", false);

import logger from "../logger/logger";

// Create the database connection
export const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: +MONGO_POOL_SIZE,
    });
  } catch (err) {
    logger.log("error", "[DB coonector] - Mongoose create the database connection error %s", err);
    throw Error("Mongoose create the database connection error");
  }
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.log("info", "[DB coonector] - Mongoose default connection open to %s", MONGO_URI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.log("error", "[DB coonector] - Mongoose default connection error: %s", err);
});

//When mongoose reconnected
mongoose.connection.on("reconnected", () => {
  logger.log("warn", "[DB coonector] - Mongoose Connection Reestablished");
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.log("info", "[DB coonector] - Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.log("warn", "[DB coonector] - Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});
