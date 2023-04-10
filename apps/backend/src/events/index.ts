import { Response, Router } from 'express';
import * as db from '@event-planner/db';
import {
  GetEventResponse,
  GetEventsRequestParser,
  GetEventsResponse,
  CreateEventRequestParser,
  EventResponse,
  UUID,
  UpdateEventRequestParser,
} from '@event-planner/types';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get(
  '/:eventId',
  asyncHandler(async (req, res: Response<GetEventResponse>) => {
    const eventId = UUID.parse(req.params.eventId);
    const result = await db.getEvent(eventId);
    res.send(result);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res: Response<GetEventsResponse>) => {
    const query = GetEventsRequestParser.parse(req.query);
    const result = await db.getEvents(query);
    res.send(result);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res: Response<EventResponse | null>) => {
    const createdEventRequest = CreateEventRequestParser.parse(req.body);
    const result = await db.createEvent(createdEventRequest);
    res.send(result);
  })
);

router.put(
  '/:eventId',
  asyncHandler(async (req, res: Response<EventResponse | null>) => {
    const id = UUID.parse(req.params.eventId);
    const data = UpdateEventRequestParser.parse(req.body);
    const updatedEvent = await db.updateEvent(id, data);
    res.send(updatedEvent);
  })
);

export default router;
