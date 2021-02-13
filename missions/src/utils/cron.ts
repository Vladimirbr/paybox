import { CronJob } from "cron";

import logger from "../logger/logger";
import { deleteLogs } from "../db/query/log";

import { CRON_RUN_EVERY, CRON_REMOVE_OLDER_THAN } from "../configs/env";

export const job = new CronJob(CRON_RUN_EVERY, async () => {
  try {
    const hoursOld = new Date();
    hoursOld.setHours(hoursOld.getHours() - +CRON_REMOVE_OLDER_THAN);

    const res = await deleteLogs(hoursOld);

    logger.log("info", "[Cron Job] - logs removed", res);
  } catch (e) {
    logger.log("error", "[Cron Job] - logs removed error", e);
  }
});
