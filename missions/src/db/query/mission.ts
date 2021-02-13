import mongoSanitize from "express-mongo-sanitize";

import MissionModel from "../../models/mission";

export const createOrUpdateMission = async (data: { key: any; value: any }) => {
  try {
    mongoSanitize.sanitize(data);

    const doc = await MissionModel.findOneAndUpdate(
      { key: data.key },
      { value: data.value },
      {
        new: true,
        upsert: true,
      }
    )
      .select("key value -_id")
      .lean();

    return doc;
  } catch (e) {
    throw Error(e);
  }
};

export const getAllMissions = async () => {
  try {
    const doc = await MissionModel.find().select("key value -_id").lean();

    return doc;
  } catch (e) {
    throw Error(e);
  }
};

export const deleteMission = async (data: { key: string }) => {
  try {
    mongoSanitize.sanitize(data);

    const doc = await MissionModel.deleteOne({ key: data.key });

    return doc;
  } catch (e) {
    throw Error(e);
  }
};
