import { Router } from "express";

const router = Router();

router.get("/:eventId", (req, res) => {
  res.send(req.params.eventId);
});

router.post("/", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

router.put("/:eventId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

export default router;
