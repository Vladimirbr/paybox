import { Document, ObjectId } from "mongoose";

export interface ILog extends Document {
  key: string;
  value?: object;
  _id: ObjectId;
  action: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}
