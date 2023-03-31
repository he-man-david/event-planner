import { Router } from "express";
import eventPlannerRepo from "../repositories/event_planner";
import { CreateEventRequest, UUID } from "../types";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/:eventId",
  asyncHandler(async (req, res) => {
    const eventId = UUID.parse(req.params.eventId);
    const result = await eventPlannerRepo.getEvent(eventId);
    res.send(result);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const createdEventRequest = CreateEventRequest.parse(req.body);
    const result = await eventPlannerRepo.createEvent(createdEventRequest);
    res.send(result);
  })
);

router.put(
  "/:eventId",
  asyncHandler((req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

export default router;
