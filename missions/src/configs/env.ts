import dotenv from "dotenv";

// ENV var config
dotenv.config();

export const PORT = process.env.PORT || "3001";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/paybox";
export const MONGO_POOL_SIZE = process.env.MONGO_POOL_SIZE || 3;

export const WINSTON_LOGGER_FOLDER = process.env.WINSTON_LOGGER_FOLDER || "C:/Code/playtests";

export const AEC_SECRET = process.env.AEC_SECRET || "my super secret secret key";

export const CRON_RUN_EVERY = process.env.CRON_RUN_EVERY || "0 0 * * * *"; // Run job every every 1 hour
export const CRON_REMOVE_OLDER_THAN = process.env.CRON_REMOVE_OLDER_THAN || 5; //Remove logs older than 5 hours
