import { Schema, model } from "mongoose";

import { IMission } from "../interfaces/mission";
/**
 * Mission Schema
 */
const missionSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true } //add createdAt and updatedAt fields
);

export default model<IMission>("Mission", missionSchema);
