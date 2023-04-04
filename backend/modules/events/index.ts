import { Response, Router } from "express";
import eventPlannerRepo from "../../db";
import {
  GetEventResponse,
  GetMultipleEventRequestQueryParser,
  GetMultipleEventsResponse,
  PostEventRequestBodyParser,
  PostEventResponse,
  UUID,
} from "../../types";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/:eventId",
  asyncHandler(async (req, res: Response<GetEventResponse>) => {
    const eventId = UUID.parse(req.params.eventId);
    const result = await eventPlannerRepo.getEvent(eventId);
    res.send(result);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res: Response<GetMultipleEventsResponse>) => {
    const query = GetMultipleEventRequestQueryParser.parse(req.query);
    const result = await eventPlannerRepo.getMultipleEvent(query);
    res.send(result);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res: Response<PostEventResponse>) => {
    const createdEventRequest = PostEventRequestBodyParser.parse(req.body);
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
