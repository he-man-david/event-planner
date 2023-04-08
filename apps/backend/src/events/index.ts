import { Response, Router } from 'express';
import * as db from '@event-planner/db';
import {
  GetEventResponse,
  GetMultipleEventsRequestBody,
  GetMultipleEventsResponse,
  PostEventRequestBodyParser,
  EventResponse,
  UUID,
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
  asyncHandler(async (req, res: Response<GetMultipleEventsResponse>) => {
    const query = GetMultipleEventsRequestBody.parse(req.query);
    const result = await db.getMultipleEvent(query);
    res.send(result);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res: Response<EventResponse | null>) => {
    const createdEventRequest = PostEventRequestBodyParser.parse(req.body);
    const result = await db.createEvent(createdEventRequest);
    res.send(result);
  })
);

router.put(
  '/:eventId',
  asyncHandler((req, res) => {
    res.status(500);
    res.send('Not implemented yet!');
  })
);

export default router;
