import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as db from '@event-planner/db';
import {
  GetEventCommentsRequestParser,
  GetEventCommentsResponse,
  CreateEventCommentRequestParser,
  CreateEventCommentResponse,
} from '@event-planner/types';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res: Response<GetEventCommentsResponse>) => {
    const query = GetEventCommentsRequestParser.parse(req.query);
    res.send(await db.getEventComments(query));
  })
);

router.post(
  '/',
  asyncHandler(async (req, res: Response<CreateEventCommentResponse>) => {
    const addEventCommentReq = CreateEventCommentRequestParser.parse(req.body);
    res.send(await db.addEventComment(addEventCommentReq));
  })
);

export default router;
