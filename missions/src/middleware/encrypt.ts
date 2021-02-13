import { Request, Response, NextFunction } from "express";

import { encrypt } from "../utils/aec";

export const encryptor = (req: any, res: Response, next: NextFunction) => {
  // encrypt data
  const encryptData = encrypt(req.data);

  res.send(encryptData);
};
