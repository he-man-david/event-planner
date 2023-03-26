import { Router } from "express";
import eventPlannerRepo from "../repositories/event_planner";
import { CreateEventRequest } from "../types/event_types";

const router = Router();

router.get("/:eventId", async (req, res) => {
  console.log("Received event get request!");
  const result = await eventPlannerRepo.getEventDetails(req.params.eventId);
  console.log("Returning", result);
  res.send(result);
});

router.post("/", async (req, res) => {
  console.log(`req is ${req.body}`);
  const createdEventRequest = CreateEventRequest.parse(req.body);
  const result = await eventPlannerRepo.saveNewEventDetails(
    createdEventRequest
  );
  res.send(result);
});

router.put("/:eventId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

export default router;
