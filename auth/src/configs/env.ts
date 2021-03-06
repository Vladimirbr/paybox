import dotenv from "dotenv";

// ENV var config
dotenv.config();

export const PORT = process.env.PORT || "3000";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/paybox";
export const MONGO_POOL_SIZE = process.env.MONGO_POOL_SIZE || 3;

export const JWT_SECRET = process.env.JWT_SECRET || "ILoveMyAuthServer";
export const JWT_TOKEN_TIME = Number(process.env.JWT_TOKEN_TIME) || 60 * 60 * 24 * 30; // 30 days;

export const WINSTON_LOGGER_FOLDER = process.env.WINSTON_LOGGER_FOLDER || "C:/Code/playtests";

export const AEC_SECRET = process.env.AEC_SECRET || "my super secret secret key";

export const MISSIONS_SERVICE_URL = process.env.MISSIONS_SERVICE_URL || "http://localhost:3001/api/";
