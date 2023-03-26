import { Router } from "express";

const router = Router();

router.get("/:userId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

router.post("/", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

router.put("/:userId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

export default router;
