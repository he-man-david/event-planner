import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send([]);
});

router.post("/", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

export default router;
