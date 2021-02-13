import { Request, Response, NextFunction } from "express";

import { decrypt } from "../utils/aec";

export const decryptor = (req: any, res: Response, next: NextFunction) => {
  // decrypt data
  const decryptBody = decrypt(req.body);

  req.data = decryptBody;

  // call next middleware in the stack
  next();
};
