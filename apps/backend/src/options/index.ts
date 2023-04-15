import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  CreateEventOptionsRequestParser,
  DeleteEventOptionRequestParser,
  GetEventOptionsResponse,
  GetEventOptionsQueryParser,
} from '@event-planner/types';
import * as db from '@event-planner/db';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res: Response<any>) => {
    const query = GetEventOptionsQueryParser.parse(req.query);
    const result = await db.getEventOptions(query);
    res.send(result);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const createEventOptionReq = CreateEventOptionsRequestParser.parse(
      req.body
    );
    const result = await db.createEventOptions(createEventOptionReq);
    res.send(result);
  })
);

router.put(
  '/',
  asyncHandler(async (req, res) => {
    res.status(500);
    res.send('Not implemented yet!');
  })
);

router.delete(
  '/',
  asyncHandler(async (req, res) => {
    const deleteEventOptionReq = DeleteEventOptionRequestParser.parse(req.body);
    const result = await db.deleteEventOption(deleteEventOptionReq);
    res.send(result);
  })
);

export default router;
