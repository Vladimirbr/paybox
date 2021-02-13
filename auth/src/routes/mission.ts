import { Router, Request, Response, NextFunction } from "express";

const router = Router();

import missions from "../controllers/mission";

export interface IGetUserAuthInfoRequest extends Request {
  user?: any;
}

router.get("/", async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const result = await missions.getMission(req.params, req.user.id);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:key", async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const result = await missions.deleteMission(req.params, req.user.id);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const result = await missions.createUpdateMission(req.body, req.user.id);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

export default router;
