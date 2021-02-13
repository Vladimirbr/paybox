import { Router, Request, Response } from "express";

import auth from "../controllers/auth";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  auth.register(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  auth.login(req, res);
});

export default router;
