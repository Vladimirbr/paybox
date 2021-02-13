import { encrypt, decrypt } from "../utils/aec";

import { send } from "./sender";
export const senderFlow = async (data: object, url: string, userId: string) => {
  try {
    //Encrypt data for send
    const encryptedDataForSend = encrypt({ data, userId });

    //Send req to mission service
    const response = await send(url, encryptedDataForSend);

    //Decrypt data for return
    const decryptedDataForReturn = decrypt(response);

    return decryptedDataForReturn;
  } catch (e) {
    throw Error(e);
  }
};
