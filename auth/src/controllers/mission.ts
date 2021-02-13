import { senderFlow } from "../services/senderFlow";

class Missions {
  getMission = async (params: any, userId: string) => {
    try {
      const result = await senderFlow(params, "findMission", userId);

      return { data: result, message: "success" };
    } catch (e) {
      throw Error(e);
    }
  };

  deleteMission = async (params: any, userId: string) => {
    try {
      const result = await senderFlow(params, "deleteMission", userId);

      return { data: result, message: "success" };
    } catch (e) {
      throw Error(e);
    }
  };

  createUpdateMission = async (params: any, userId: string) => {
    try {
      const result = await senderFlow(params, "createUpdateMission", userId);

      return { data: result, message: "success" };
    } catch (e) {
      throw Error(e);
    }
  };
}

const missions = new Missions();

export default missions;
