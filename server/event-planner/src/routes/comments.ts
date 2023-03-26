import { Router } from "express";

const router = Router();

router.get("/:eventId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

router.post("/:eventId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

export default router;
