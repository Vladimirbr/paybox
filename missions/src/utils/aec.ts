import CryptoJS from "crypto-js";

import { AEC_SECRET } from "../configs/env";

export const encrypt = (data: object) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), AEC_SECRET).toString();
};

export const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, AEC_SECRET);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
