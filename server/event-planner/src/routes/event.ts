import { Router } from "express";
import { getEventDetails, saveNewEventDetails } from "../repositories/event_planner";

const router = Router();

router.get("/:eventId", async (req, res) => {
  console.log("Received event get request!");
  const result = await getEventDetails(req.params.eventId);
  console.log("Returning", result);
  res.send(result);
});

router.post("/", async (req, res) => {
  console.log(`req is ${req.body}`);
  const title = String(req.body.title || "");
  const description = String(req.body.description || "");
  const author = String(req.body.author || "");
  const result = await saveNewEventDetails({ title, description, author });
  res.send(result);
});

router.put("/:eventId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

router.get("/thread/", (req, res) => {
  res.send([]);
});

router.post("/thread/", (req, res) => {
  res.send(req.body);
});

export default router;
