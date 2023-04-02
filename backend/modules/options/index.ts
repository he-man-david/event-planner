import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  CreateEventOptionRequest,
  DeleteEventOptionRequest,
  UUID,
} from "../../types";
import eventPlannerRepo from "../../db";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.eventId) {
      const eventId = UUID.parse(req.query.eventId);
      res.send(await eventPlannerRepo.getEventOptions(eventId));
    } else {
      res.send([]);
    }
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const createEventOptionReq = CreateEventOptionRequest.parse(req.body);
    const result = await eventPlannerRepo.createEventOptions(
      createEventOptionReq
    );
    res.send(result);
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const deleteEventOptionReq = DeleteEventOptionRequest.parse(req.body);
    const result = await eventPlannerRepo.deleteEventOption(
      deleteEventOptionReq
    );
    res.send(result);
  })
);

export default router;
