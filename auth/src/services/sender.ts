import axios from "axios";

import { MISSIONS_SERVICE_URL } from "../configs/env";

axios.defaults.baseURL = MISSIONS_SERVICE_URL;
axios.defaults.headers.post["Content-Type"] = "text/plain";

export const send = async (url: string, encryptedDataForSend: string) => {
  try {
    const response = await axios.post(url, encryptedDataForSend);

    return response.data;
  } catch (e) {
    throw Error(e);
  }
};
