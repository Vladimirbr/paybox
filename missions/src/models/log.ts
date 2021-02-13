import { Schema, model } from "mongoose";

import { ILog } from "../interfaces/log";
/**
 * Log Schema
 */
const logSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      index: true,
    },
    value: {
      type: Object,
    },
    action: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ILog>("Log", logSchema);
