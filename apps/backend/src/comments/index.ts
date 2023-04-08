import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as db from 'libs/db/src';
import {
  GetMultipleEventCommentsRequestQuery,
  GetMultipleEventCommentsResponse,
  PostEventCommentRequestBody,
  PostEventCommentResponse,
} from 'libs/types/src';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res: Response<GetMultipleEventCommentsResponse>) => {
    const query = GetMultipleEventCommentsRequestQuery.parse(req.query);
    res.send(await db.getEventComments(query));
  })
);

router.post(
  '/',
  asyncHandler(async (req, res: Response<PostEventCommentResponse>) => {
    const addEventCommentReq = PostEventCommentRequestBody.parse(req.body);
    res.send(await db.addEventComment(addEventCommentReq));
  })
);

export default router;
