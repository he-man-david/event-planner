import { Router } from "express";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/:userId",
  asyncHandler((req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

router.post(
  "/",
  asyncHandler((req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

router.put(
  "/:userId",
  asyncHandler((req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

export default router;
