import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  PostEventOptionRequestBody,
  DeleteEventOptionRequestBody,
  GetEventOptionsResponse,
  GetEventOptionsQueryParser,
} from 'libs/types/src';
import * as db from 'libs/db/src';

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
    const createEventOptionReq = PostEventOptionRequestBody.parse(req.body);
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
    const deleteEventOptionReq = DeleteEventOptionRequestBody.parse(req.body);
    const result = await db.deleteEventOption(deleteEventOptionReq);
    res.send(result);
  })
);

export default router;
