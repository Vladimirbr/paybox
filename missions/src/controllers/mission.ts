import { createOrUpdateMission, getAllMissions, deleteMission } from "../db/query/mission";

import { save } from "../db/query/log";

class Mission {
  async createOrUpdate(data: any) {
    try {
      const doc = await createOrUpdateMission(data.data);

      data.action = "createOrUpdate";

      await save(data);

      return doc;
    } catch (e) {
      throw Error(e);
    }
  }

  async get(data: any) {
    try {
      const doc = await getAllMissions();

      return doc;
    } catch (e) {
      throw Error(e);
    }
  }

  async delete(data: any) {
    try {
      const doc = await deleteMission(data.data);

      data.action = "delete";

      await save(data);

      return doc;
    } catch (e) {
      throw Error(e);
    }
  }
}

const mission = new Mission();

export default mission;
