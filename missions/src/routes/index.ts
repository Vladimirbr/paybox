import { Router, Request, Response, NextFunction } from "express";

import { encryptor } from "../middleware/encrypt";
import { decryptor } from "../middleware/decrypt";

import mission from "../controllers/mission";

const router = Router();

/* GET index page. */
router.get("/", (req: Request, res: Response) => {
  res.json({
    title: "Express",
  });
});

/* Mission CRUD */
router.post(
  "/findMission",
  decryptor,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      req.data = await mission.get(req.data);
      next();
    } catch (e) {
      next(e);
    }
  },
  encryptor
);

router.post(
  "/deleteMission",
  decryptor,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      req.data = await mission.delete(req.data);
      next();
    } catch (e) {
      next(e);
    }
  },
  encryptor
);

router.post(
  "/createUpdateMission",
  decryptor,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      req.data = await mission.createOrUpdate(req.data);
      next();
    } catch (e) {
      next(e);
    }
  },
  encryptor
);

export default router;
