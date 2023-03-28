import { Router } from "express";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/:eventOptionId",
  asyncHandler((req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

router.post(
  "/:eventOptionId",
  asyncHandler((req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

export default router;
