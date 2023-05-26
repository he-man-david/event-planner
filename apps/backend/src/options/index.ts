import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  CreateEventOptionRequestParser,
  GetEventOptionsResponse,
  GetEventOptionsQueryParser,
  UUID,
  UpdateEventOptionRequestParser,
} from '@event-planner/types';
import * as db from '@event-planner/db';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res: Response<GetEventOptionsResponse>) => {
    const query = GetEventOptionsQueryParser.parse(req.query);
    const result = await db.getEventOptions(query);
    res.send(result);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const createEventOptionReq = CreateEventOptionRequestParser.parse(req.body);
    const result = await db.createEventOption(createEventOptionReq);
    res.send(result);
  })
);

router.put(
  '/:eventOptionId',
  asyncHandler(async (req, res) => {
    const id = UUID.parse(req.params.eventOptionId);
    const data = UpdateEventOptionRequestParser.parse(req.body);
    const result = await db.updateEventOption(id, data);
    res.send(result);
  })
);

router.delete(
  '/:eventOptionId',
  asyncHandler(async (req, res) => {
    const id = UUID.parse(req.params.eventOptionId);
    const result = await db.deleteEventOption(id);
    res.send(result);
  })
);

export default router;
