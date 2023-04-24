import { Response, Router } from 'express';
import * as db from '@event-planner/db';
import {
  EventResponse,
  GetEventsRequestParser,
  GetEventsResponse,
  CreateEventRequestParser,
  UUID,
  UpdateEventRequestParser,
} from '@event-planner/types';
import asyncHandler from 'express-async-handler';
import { User } from 'stytch/types/lib/b2c/shared_b2c';

const router = Router();

router.get(
  '/:eventId',
  asyncHandler(async (req, res: Response<EventResponse>) => {
    const eventId = UUID.parse(req.params.eventId);
    const result = await db.getEvent(eventId);
    res.send(result);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res: Response<GetEventsResponse>) => {
    const user = res.locals.user as User;
    const query = GetEventsRequestParser.parse(req.query);
    const result = await db.getEventsForUser(query, user.user_id);
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
