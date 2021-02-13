import mongoSanitize from "express-mongo-sanitize";

import LogModel from "../../models/log";

export const deleteLogs = async (time: Date) => {
  try {
    const res = await LogModel.deleteMany({ createdAt: { $lte: time } });

    return res;
  } catch (e) {
    throw Error(e);
  }
};

export const save = async (data: any) => {
  try {
    mongoSanitize.sanitize(data);

    const log = new LogModel({
      key: data.data.key,
      value: data.data.value,
      action: data.action,
      userId: data.userId,
    });

    await log.save();
  } catch (e) {
    throw Error(e);
  }
};
