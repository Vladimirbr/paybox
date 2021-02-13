import { Document, ObjectId } from "mongoose";

export interface IMission extends Document {
  key: string;
  value: object;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
